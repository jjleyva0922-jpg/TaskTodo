# TaskTodo - Full Stack Todo Application

A complete todo application with session-based JWT authentication, soft-delete functionality, and search/filter capabilities.

## Tech Stack

**Frontend:**
- Next.js 14
- React Query v5
- TypeScript
- Tailwind CSS
- Axios

**Backend:**
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Features

- ✅ User authentication (login/register)
- ✅ Session-based JWT auth with 7-day expiry
- ✅ Per-user todo management
- ✅ Soft-delete with recovery tracking
- ✅ Real-time search and filtering
- ✅ Todo status management (pending/completed)
- ✅ Responsive UI with Tailwind CSS
- ✅ React Query for efficient caching and data synchronization

## Project Structure

```
frontend/         - Next.js application
├── app/          - App router pages
├── components/   - React components
├── hooks/        - Custom React hooks
├── lib/          - Utilities and configurations
├── services/     - API services
└── types/        - TypeScript types

server/           - Express backend
├── src/
│   ├── controllers/  - Route controllers
│   ├── middleware/   - Auth middleware
│   ├── models/       - Data models
│   ├── routes/       - API routes
│   ├── services/     - Business logic
│   ├── schema/       - Prisma schema
│   └── validators/   - Input validation
```

## Setup Instructions

### Backend Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```
Update DATABASE_URL and JWT_SECRET with your values.

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:3001`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```
Update NEXT_PUBLIC_API_BASE_URL to match your backend URL.

3. Run development server:
```bash
npm run dev
```

App runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Todos
- `GET /todos` - Get user's active todos
- `GET /todos/deleted` - Get user's soft-deleted todos
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Soft-delete todo
- `PATCH /todos/:id/restore` - Restore deleted todo

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL
4. Deploy automatically on push

### Backend (Railway/Render)
1. Create account on Railway or Render
2. Connect GitHub repo
3. Set environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Secret key for JWT
   - `NODE_ENV` - Set to production
4. Deploy

## Error Handling

The application includes comprehensive error handling:
- Invalid credentials on login/register
- Duplicate email detection
- API error normalization
- User-friendly error messages

## Caching Strategy

React Query is configured with:
- `refetchOnMount: false` - Prevents unnecessary refetches
- `staleTime: 5 minutes` - Data considered fresh for 5 min
- `cacheTime: 30 minutes` - Data cached for 30 min

User-scoped cache keys ensure per-user data isolation:
- `['todos', userId]` - Active todos
- `['todos', 'deleted', userId]` - Deleted todos
- `['auth', 'me']` - Current user

## Development

### Scripts

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm run dev      # Start dev server with nodemon
npm run build    # Build project
npm start        # Start production server
```

## Environment Variables

See `.env.example` files in respective directories for required variables.

## License

MIT
