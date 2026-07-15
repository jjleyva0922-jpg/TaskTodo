const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      console.log(`[auth] No token provided for request ${req.method} ${req.originalUrl}`);
      return res.status(401).json({ error: 'No token provided' });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.log('[auth] token verification failed:', err.message || err);
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Ensure the session exists in DB
    const session = await prisma.session.findUnique({ where: { token } });
    if (!session) {
      console.log('[auth] session not found for token (first 20 chars):', token.slice(0, 20));
      return res.status(401).json({ error: 'Session not found or expired' });
    }

    // Check expiry if set
    if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
      // Invalidate expired session
      try { await prisma.session.deleteMany({ where: { token } }); } catch (e) { /* ignore */ }
      console.log('[auth] session expired for token (first 20 chars):', token.slice(0, 20));
      return res.status(401).json({ error: 'Session expired' });
    }

    // Attach user info to request
    req.user = { id: decoded.userId, email: decoded.email };
    req.session = session;
    console.log(`[auth] authenticated request ${req.method} ${req.originalUrl} userId=${req.user.id}`);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
