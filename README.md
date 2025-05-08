# UniHive

<div align="center">
  <img src="https://github.com/user-attachments/assets/bad9df85-ceb6-4876-aaa6-3e635158ac86" alt="UniHive Logo" width="200" />
  <br />
  <h3>Connect, Collaborate, and Earn Within Your Campus Community</h3>
  
  [![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0+-336791.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
</div>

> A university-specific services marketplace that connects students for tasks, tutoring, and item exchange.

UniHive creates a secure and verified platform where university students can exchange services, skills, and items within their campus community. Whether you need academic help, want to sell used textbooks, or are looking to earn extra income by helping others, UniHive provides the perfect platform to connect.

## ✨ Key Features

- **🎓 University Email Verification** - Ensures a secure, campus-specific environment
- **💼 Specialized Marketplaces** - Six dedicated "Hives" for different needs:
  - **Essentials** - Buy/sell used items like textbooks, electronics, and furniture
  - **Academia** - Find tutors or offer tutoring in your strong subjects
  - **Logistics** - Get help with deliveries, pickups, and errand running
  - **Buzz** - Discover campus events and activities
  - **Archive** - Access shared academic resources and study materials
  - **SideHustle** - Find short-term gigs and part-time work opportunities
- **⭐ Trust & Reputation System** - Build credibility through ratings and reviews
- **🔎 Advanced Search & Filtering** - Find exactly what you need quickly
- **📱 Mobile-Responsive Design** - Use on any device, anywhere on campus
- **🔒 Secure Messaging** - Communicate directly with other users
- **📁 File Uploads** - Share images and documents for listings and resources

## 🛠️ Tech Stack

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td><strong>Backend</strong></td>
    <td><strong>Database & Storage</strong></td>
    <td><strong>DevOps</strong></td>
  </tr>
  <tr>
    <td>
      • React.js<br/>
      • Tailwind CSS<br/>
      • React Router<br/>
      • Socket.io (client)
    </td>
    <td>
      • Node.js<br/>
      • Express.js<br/>
      • TypeScript<br/>
      • JWT Authentication
    </td>
    <td>
      • PostgreSQL<br/>
      • Sequelize ORM<br/>
      • Cloudinary (media)<br/>
      • Redis (caching)
    </td>
    <td>
      • Git/GitHub<br/>
      • Postman<br/>
      • Nodemailer<br/>
      • ESLint/Prettier
    </td>
  </tr>
</table>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AWESOME04/unihive.git
   cd UniHive
   ```

2. **Set up environment variables**
   ```bash
   # In the server directory
   cp .env.example .env
   # Edit .env with your database credentials and other config
   ```

3. **Install dependencies and start servers**
   ```bash
   # Backend setup
   cd server
   npm install
   npm run db:setup
   npm run dev
   
   # Frontend setup (in another terminal)
   cd client
   npm install
   npm start
   ```

4. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Project Structure

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

## 📚 API Documentation

For detailed API documentation, please visit our Postman collection:
[UniHive API Documentation](https://documenter.getpostman.com/view/28591712/2sB2j7epgT)

### Main Endpoints

#### Authentication

| **Method** | **Endpoint**                   | **Description**                      |
|------------|--------------------------------|--------------------------------------|
| POST       | `/api/auth/register`           | Register a new user account          |
| POST       | `/api/auth/verify-otp`         | Verify email with OTP                |
| POST       | `/api/auth/login`              | Authenticate user with credentials   |
| POST       | `/api/auth/resend-otp`         | Resend verification OTP              |
| GET        | `/api/auth/me`                 | Get current user information         |

#### User Profile

| **Method** | **Endpoint**                   | **Description**                      |
|------------|--------------------------------|--------------------------------------|
| GET        | `/api/users/:id`               | Get user profile by ID               |
| PUT        | `/api/users/profile`           | Update user profile                  |
| PUT        | `/api/users/password`          | Change user password                 |

#### Hives (General)

| **Method** | **Endpoint**                   | **Description**                      |
|------------|--------------------------------|--------------------------------------|
| GET        | `/api/hives/types`             | Get all hive types                   |
| GET        | `/api/hives`                   | Get all hives with filtering         |
| GET        | `/api/hives/:id`               | Get hive by ID                       |
| GET        | `/api/hives/my/posted`         | Get hives posted by current user     |
| GET        | `/api/hives/my/assigned`       | Get hives assigned to current user   |
| DELETE     | `/api/hives/:id`               | Delete a hive                        |
| PUT        | `/api/hives/:id/status`        | Update hive status                   |
| PUT        | `/api/hives/:id/assign`        | Assign hive to a user                |

#### Specialized Hives

| **Method** | **Endpoint**                   | **Description**                      |
|------------|--------------------------------|--------------------------------------|
| GET        | `/api/essentials`              | Get all essentials listings          |
| POST       | `/api/essentials`              | Create essentials listing            |
| PUT        | `/api/essentials/:id`          | Update essentials listing            |
| GET        | `/api/academia`                | Get all academia posts               |
| POST       | `/api/academia`                | Create academia post                 |
| PUT        | `/api/academia/:id`            | Update academia post                 |
| GET        | `/api/logistics`               | Get all logistics posts              |
| POST       | `/api/logistics`               | Create logistics post                |
| PUT        | `/api/logistics/:id`           | Update logistics post                |
| GET        | `/api/buzz`                    | Get all buzz posts                   |
| POST       | `/api/buzz`                    | Create buzz post                     |
| PUT        | `/api/buzz/:id`                | Update buzz post                     |
| GET        | `/api/archive`                 | Get all archive resources            |
| POST       | `/api/archive`                 | Create archive resource              |
| PUT        | `/api/archive/:id`             | Update archive resource              |
| GET        | `/api/sidehustle`              | Get all side hustle listings         |
| POST       | `/api/sidehustle`              | Create side hustle listing           |
| PUT        | `/api/sidehustle/:id`          | Update side hustle listing           |

#### Applications & Reviews

| **Method** | **Endpoint**                             | **Description**                      |
|------------|------------------------------------------|--------------------------------------|
| POST       | `/api/hives/:hiveId/applications`        | Apply to a hive                      |
| GET        | `/api/hives/:hiveId/applications`        | Get applications for a hive          |
| PUT        | `/api/hives/:hiveId/applications/:appId` | Update application status            |
| GET        | `/api/hives/applications/me`             | Get current user's applications      |
| POST       | `/api/hives/:hiveId/reviews`             | Create a review for a hive           |
| GET        | `/api/hives/:hiveId/reviews`             | Get reviews for a specific hive      |
| GET        | `/api/users/:userId/reviews`             | Get reviews for a specific user      |

#### Payments

| **Method** | **Endpoint**                   | **Description**                      |
|------------|--------------------------------|--------------------------------------|
| POST       | `/api/payments/initialize/:hiveId` | Initialize payment for a hive        |
| GET        | `/api/payments/verify`         | Verify a payment transaction         |
| GET        | `/api/payments/history`        | Get user's payment history           |
| POST       | `/api/payments/webhook`        | Paystack webhook handler (internal)  |

## 📱 Screenshots

Coming soon...

## 👥 Team

### Core Developers

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Mintahandrews">
        <img src="https://github.com/Mintahandrews.png" width="100px;" alt="Andrews Mintah"/>
        <br /><sub><b>Andrews Mintah</b></sub>
      </a>
      <br />Frontend Lead
    </td>
    <td align="center">
      <a href="https://github.com/AWESOME04">
        <img src="https://github.com/AWESOME04.png" width="100px;" alt="Evans Acheampong"/>
        <br /><sub><b>Evans Acheampong</b></sub>
      </a>
      <br />Backend Lead
    </td>
  </tr>
</table>

## 🙏 Acknowledgments

- The [WeWire Team](https://www.wewire.com) for their support and feedback
- All the open source libraries that made this project possible
- Our mentors and advisors for their guidance

---

<div align="center">
  Made with ❤️ by the UniHive Team
</div>
