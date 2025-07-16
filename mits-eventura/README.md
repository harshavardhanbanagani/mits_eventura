# MITS Eventura - Complete Fest Management System

![MITS Eventura Banner](https://via.placeholder.com/800x200/4f46e5/ffffff?text=MITS+Eventura)

A comprehensive web-based festival management system built for MITS (Madanapalle Institute of Technology & Science) to streamline event organization, student registration, and certificate generation.

## 🌟 Features

### For Students
- **Easy Registration**: Simple and intuitive event registration process
- **Event Discovery**: Browse and filter available events by category, date, and type
- **Registration Status**: Track registration status and payment confirmations
- **Digital Certificates**: Automatic certificate generation and download
- **Profile Management**: Manage personal information and view event history

### For Organizers
- **Event Management**: Create, edit, and manage events with detailed information
- **Registration Tracking**: Monitor registrations and participant lists
- **Real-time Analytics**: View registration statistics and event metrics
- **Bulk Operations**: Mass email sending and certificate generation
- **Excel Reports**: Export participant data and analytics

### For Admins
- **User Management**: Manage student and organizer accounts
- **Event Approval**: Review and approve event submissions
- **System Analytics**: Comprehensive dashboard with system-wide metrics
- **Certificate Templates**: Manage and customize certificate designs
- **System Configuration**: Configure system settings and permissions

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│  Express API    │◄──►│   MongoDB       │
│   (Frontend)    │    │   (Backend)     │    │  (Database)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       
         ▼                       ▼                       
┌─────────────────┐    ┌─────────────────┐               
│   Tailwind CSS  │    │   JWT Auth      │               
│   Redux Toolkit │    │   File Upload   │               
│   Vite Build    │    │   PDF Generation│               
└─────────────────┘    └─────────────────┘               
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **Multer** - File upload handling
- **Puppeteer** - PDF certificate generation
- **Nodemailer** - Email sending

## 📦 Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (v6+ recommended)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mits-eventura.git
   cd mits-eventura
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB service**
   ```bash
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On macOS with Homebrew
   brew services start mongodb/brew/mongodb-community
   ```

5. **Run the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend server at http://localhost:5173
   - Backend API at http://localhost:5000

### Manual Installation

#### Backend Setup
```bash
cd server
npm install
cp ../.env.example .env
# Configure your .env file
npm run dev
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🚀 Deployment

### Production Build
```bash
# Build the client
npm run client:build

# Start production server
npm start
```

### Docker Deployment (Optional)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Event Endpoints
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get single event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Registration Endpoints
- `POST /api/registrations` - Register for event
- `GET /api/registrations/user/:userId` - Get user registrations
- `GET /api/registrations/event/:eventId` - Get event registrations

### Certificate Endpoints
- `GET /api/certificates/:registrationId` - Generate certificate
- `POST /api/certificates/bulk` - Bulk certificate generation

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on all device sizes
- **Dark/Light Mode**: Toggle between themes
- **Modern UI Components**: Beautiful, accessible components
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time form validation

## 🔧 Configuration

### Database Schema
- **Users**: Student and admin profiles
- **Events**: Event details and metadata
- **Registrations**: Event registration records
- **Certificates**: Certificate generation tracking

### Security Features
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Password hashing with bcrypt

## 📈 Analytics & Reporting

- Real-time registration metrics
- Event popularity analytics
- User engagement tracking
- Excel/CSV export functionality
- Admin dashboard with charts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Team**: React developers and UI/UX designers
- **Backend Team**: Node.js developers and database architects
- **DevOps Team**: Deployment and infrastructure management

## 📞 Support

For support and queries:
- Email: support@mitseventura.com
- GitHub Issues: [Create an issue](https://github.com/your-username/mits-eventura/issues)
- Documentation: [Wiki](https://github.com/your-username/mits-eventura/wiki)

---

**Built with ❤️ for MITS Community**