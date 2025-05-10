# UniHive Server

Backend implementation for UniHive platform using Node.js, Express, and PostgreSQL.

## 🛠️ Tech Stack

- Node.js & Express
- TypeScript
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- Nodemailer

## 📁 Project Structure

```bash
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/         # Utility functions
│   └── server.ts      # Server entry point
├── tests/            # Test files
└── .env.example      # Environment variables template
```

## 🔧 Setup & Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials & other settings
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Start development server:
```bash
npm run dev
```

## 🔑 API Authentication

Secured using JWT tokens. Protected routes require `Authorization: Bearer <token>` header.

## 📚 API Documentation

Full API documentation available in [Postman Collection](https://documenter.getpostman.com/view/28591712/2sB2j7epgT)

### Key Endpoints:

- Auth: `/api/auth/*`
- Users: `/api/users/*`
- Hives: `/api/hives/*`
- Reviews: `/api/reviews/*`
- Messages: `/api/messages/*`
