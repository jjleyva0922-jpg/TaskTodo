const prisma = require('../src/lib/prisma');

async function main() {
  console.log('Sessions:');
  const sessions = await prisma.session.findMany({ include: { user: true } });
  console.dir(sessions, { depth: null });

  console.log('\nTodos (latest 20):');
  const todos = await prisma.todo.findMany({ take: 20, orderBy: { createdAt: 'desc' } });
  console.dir(todos, { depth: null });

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
