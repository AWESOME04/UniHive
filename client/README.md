# UniHive - Ghana University Job Platform

*Connecting Ghana University students with job opportunities*

## UniHive Documentation

### Overview
UniHive is a specialized job platform designed exclusively for Ghana University students. The platform enables students to discover, apply for, and save job opportunities across various campuses in Ghana. All job listings display compensation in Ghanaian cedis (GH₵), making it easy for students to understand the financial benefits of each opportunity. The application uses React for the front end and features a modern, WeWire-inspired UI design.

### Core Functionality

#### User Authentication
- Email verification system using Ghana University email domains
- Registration and login processes
- Password recovery system
- JWT token-based session management

#### Job Management
- Browsing available jobs with filtering and search capabilities
- Job application tracking (applied, saved, in review, accepted)
- Campus-specific job listings
- Salary information in Ghanaian cedis (GH₵)

#### User Profiles
- Profile customization (skills, experience, photo)
- Job application history
- Resume and CV management
- Ghana University campus affiliation

#### Notifications
- Email notifications for job updates
- In-app notification center
- Optional SMS notifications for interview invitations

### Tech Stack

#### Frontend
- React: Main frontend framework
- Redux: State management
- React Router: Navigation
- Axios: API communication
- Tailwind CSS: Utility-first CSS framework
- Formik & Yup: Form handling and validation
- Socket.io-client: Real-time notifications

#### Backend
- Node.js: Runtime environment
- Express: Web server framework
- MongoDB: Database for storing user and job information
- Mongoose: MongoDB object modeling
- JWT: Authentication tokens
- Nodemailer: Email notifications
- Socket.io: Real-time communication
- Multer: File upload handling

#### Ghana-Specific Features
- Integration with Ghana University campus directories
- Ghanaian cedis (GH₵) currency formatting
- Location-based job filtering for Ghana campuses
- Support for Ghana-specific payment methods
- Mobile money integration options

#### DevOps
- Git: Version control
- GitHub Actions: CI/CD pipeline
- Netlify: Deployment platform
- MongoDB Atlas: Cloud database hosting

### Getting Started
To run the development server:
```
npm install
npm run dev
```
