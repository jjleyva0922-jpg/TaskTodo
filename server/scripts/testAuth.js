const axios = require('axios');

const API = 'http://localhost:5000';

async function run() {
  try {
    // Load a session token from DB via prisma
    const prisma = require('../src/lib/prisma');
    const session = await prisma.session.findFirst();
    if (!session) {
      console.log('No session found in DB.');
      process.exit(1);
    }
    const token = session.token;
    console.log('Using token for userId=', session.userId);

    const me = await axios.get(API + '/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    console.log('/auth/me response status:', me.status, 'body:', me.data);

    const todos = await axios.get(API + '/todos', { headers: { Authorization: `Bearer ${token}` } });
    console.log('/todos response status:', todos.status, 'count:', todos.data.length);

    // Try creating a todo (should auto-assign userId)
    const newTodo = await axios.post(API + '/todos', { title: 'scripted todo', description: 'from test script' }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Created todo:', newTodo.data);

    // Now simulate logout: delete only this session
    const del = await axios.post(API + '/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('/auth/logout response:', del.status, del.data);

    // After logout, /auth/me should fail
    try {
      await axios.get(API + '/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      console.log('ERROR: /auth/me still succeeded after logout');
    } catch (e) {
      console.log('/auth/me after logout failed as expected:', e.response ? e.response.status : e.message);
    }

    process.exit(0);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    process.exit(1);
  }
}

run();
