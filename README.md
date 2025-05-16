# UniHive

<div align="center">
  <img src="https://github.com/user-attachments/assets/bad9df85-ceb6-4876-aaa6-3e635158ac86" alt="UniHive Logo" width="200" />
  <br />
  <h3>Connect, Collaborate, and Earn Within Your Campus Community</h3>
  
  [![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
  [![Sequelize](https://img.shields.io/badge/Sequelize-6.0+-336791.svg)](https://sequelize.org/)
</div>

## 🎯 Overview

UniHive is a specialized marketplace platform exclusively for Ghanaian university students. Born during the Hachive Hackathon 1.0 by WeWire, it enables students to:

- Buy and sell essential items (books, electronics, etc.)
- Find and offer academic help
- Request and provide logistics services
- Share campus events and activities
- Access academic resources
- Find side hustle opportunities

## 📸 Screenshots

### Overview
![Home](/docs/images/home.PNG)
*platform overview*

### Authentication
![Registration](/docs/images/register.PNG)
*Student registration with university email verification*

![Login](/docs/images/login.PNG)
*Secure login with university credentials*

### Core Features
![Dashboard](/docs/images/dashboard.PNG)
*Student dashboard showing recent activities and stats*

![Hives Overview](/docs/images/hives.PNG)
*Different hive categories for various student needs*

### Marketplace Features
![Essentials](/docs/images/essentials.PNG)
*Buy and sell university essentials*

![Services](/docs/images/services.PNG)
*Find and offer student services*

### Communication
![Messages](/docs/images/messages.PNG)
*Real-time messaging between students*

![Profile](/docs/images/profile.PNG)
*Detailed student profiles with verification status*

## ✨ Features

### 🔐 User Management
- University email verification system
- OTP-based email verification
- JWT authentication
- Profile customization

### 🎓 Hive Categories
1. **Essentials Hive**
   - Buy/sell university essentials
   - Item condition tracking
   - Price comparisons

2. **Academia Hive**
   - Tutoring services
   - Study groups
   - Assignment help

3. **Logistics Hive**
   - Campus delivery services
   - Errand running
   - Package pickups

4. **Buzz Hive**
   - Campus events
   - Activities
   - Announcements

5. **Archive Hive**
   - Study materials
   - Past questions
   - Course resources

6. **SideHustle Hive**
   - Part-time jobs
   - Freelance opportunities
   - Campus gigs

### 💬 Communication
- Real-time messaging
- Notifications system
- File sharing

### 💰 Payments
- Integration with local payment methods
- Transaction tracking
- Secure payment processing

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
      • Typescript<br/>
      • Tailwind CSS<br/>
      • Framer Motion<br/>
      • Formik & Yup
    </td>
    <td>
      • Node.js<br/>
      • Express.js<br/>
      • TypeScript<br/>
      • Nodemailer<br/>
      • JWT Authentication
    </td>
    <td>
      • PostgreSQL<br/>
      • Sequelize ORM<br/>
      • Cloudinary (media)<br/>
    </td>
    <td>
      • Git/GitHub<br/>
      • Postman<br/>
      • Vercel (client)<br/>
      • Render (server)<br/>
      • ESLint/Prettier
    </td>
  </tr>
</table>

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/AWESOME04/UniHive.git
cd UniHive
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd client
npm install
```

4. Set up environment variables
```bash
# In server directory
cp .env.example .env
# Edit .env with your database credentials
```

5. Start development servers
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## 📚 Documentation

- [API Documentation](https://documenter.getpostman.com/view/28591712/2sB2j7epgT)

## 👥 Team

<table>
<tr>
<td align="center">
<a href="https://github.com/AWESOME04">
<img src="https://github.com/AWESOME04.png" width="100px;" alt="Evans Acheampong"/>
<br />
<sub><b>Evans Acheampong</b></sub>
</a>
<br />
Fullstack Developer
</td>
<td align="center">
<a href="https://github.com/Mintahandrews">
<img src="https://github.com/Mintahandrews.png" width="100px;" alt="Andrews Mintah"/>
<br />
<sub><b>Andrews Mintah</b></sub>
</a>
<br />
Frontend Developer
</td>
</tr>
</table>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The WeWire team for organizing Hachive Hackathon 1.0
- All participating universities for their support
- Our mentors and advisors

---

<div align="center">
Made with ❤️ for Ghanaian University Students
</div>
