# UniHive

> A university-specific services platform that connects students for tasks, tutoring, and item exchange.

UniHive is a comprehensive application that allows university students to post tasks, offer services, and trade items within their verified university community. Students can earn money by completing tasks for others or save time by outsourcing their tasks to fellow students.

## Features

- **University Email Verification** - Ensures a secure, campus-specific environment
- **Task Marketplace** - Post tasks you need help with or find tasks to complete
- **Item Exchange** - Buy, sell, or swap items with other students
- **Tutoring Services** - Find tutors or offer your expertise in various subjects
- **Errand Running** - Get help with deliveries, pickups, and daily tasks
- **Real-time Messaging** - Communicate directly with other users
- **Rating & Review System** - Build reputation through quality service
- **Search & Filtering** - Easily find what you need across categories
- **AI-Powered Recommendations** - Get personalized task and service suggestions

## Tech Stack

### Frontend
- React.js
- Tailwind CSS (styling)
- Socket.io (real-time features)
- React Router (navigation)

### Backend
- Node.js
- Express.js
- PostgreSQL (database)
- Sequelize ORM
- JWT (authentication)
- Nodemailer (email verification)

### DevOps & Tools
- Git & GitHub (version control)
- Postman (API documentation & testing)
- ESLint & Prettier (code quality)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AWESOME04/unihive.git
   cd UniHive
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the server directory using the `.env.example` template
   - Add your PostgreSQL connection string, JWT secret, and other required variables

5. Set up the database:
   ```bash
   npm run db:setup
   ```

6. Start the development servers:
   ```bash
   # In the server directory
   npm run dev
   
   # In a new terminal, navigate to the client directory
   npm start
   ```

7. Access the application at `http://localhost:3000`

## Project Structure

```
unihive/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service calls
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
│
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   ├── app.js              # Express application
│   └── package.json        # Backend dependencies
│
├── docs/                   # Documentation
└── README.md               # Project readme
```

## API Documentation

Coming soon...


## Acknowledgements

- This project was created as part of a 5-day hackathon
- Special thanks to all contributors and mentors

## 👥 Team

### Core Developers

<table>
  <tr>
    <td align="center"><a href="https://github.com/AWESOME04"><img src="https://github.com/AWESOME04.png" width="100px;" alt="Evans Acheampong"/><br /><sub><b>Evans Acheampong</b></sub></a><br />Frontend & Hardware</td>
    <td align="center"><a href="https://github.com/Mintahandrews"><img src="https://github.com/mikkayadu.png" width="100px;" alt="Andrews Mintah"/><br /><sub><b>Michael Adu-Gyamfi</b></sub></a><br />Backend & ML</td>
  </tr>
</table>

---
