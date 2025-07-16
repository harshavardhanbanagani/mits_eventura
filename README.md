# MITS Festival Management System 2.0

A comprehensive, modern React-based festival management system with advanced features for educational institutions. Built with Redux, real-time capabilities, analytics, and enterprise-grade functionality.

## 🌟 Features

### Core Functionality
- **Event Management** - Create, edit, and manage festival events
- **Registration System** - Student registration with team support
- **Payment Gateway** - Multiple payment methods (Card, UPI, Net Banking, Wallets)
- **Admin Dashboard** - Comprehensive management interface
- **Analytics** - Real-time analytics and reporting

### Advanced Features
- **Real-time Notifications** - WebSocket-based live updates
- **Export System** - CSV, Excel, PDF, and JSON exports
- **Advanced Search** - Smart search with filters and suggestions
- **Data Visualization** - Interactive charts and graphs
- **Responsive Design** - Mobile-first, responsive UI
- **State Management** - Redux Toolkit for scalable state management

### Technical Highlights
- **React 18** - Latest React with concurrent features
- **Redux Toolkit** - Modern Redux with RTK Query
- **Framer Motion** - Smooth animations and transitions
- **TailwindCSS** - Utility-first styling with custom components
- **Recharts** - Beautiful, responsive charts
- **Vite** - Lightning-fast build tool

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/mits-fest-manager.git
   cd mits-fest-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
mits-fest-manager/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Advanced UI components
│   │   └── ...
│   ├── pages/             # Page components
│   ├── store/             # Redux store and slices
│   │   ├── slices/        # Redux slices
│   │   └── index.js       # Store configuration
│   ├── services/          # API service layer
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main application component
│   ├── Routes.jsx         # Application routes
│   └── index.jsx          # Application entry point
├── .env.example           # Environment variables template
├── package.json           # Project configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001/ws

# Feature Flags
REACT_APP_ENABLE_REAL_TIME=true
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_EXPORT=true
REACT_APP_ENABLE_PAYMENT_GATEWAY=true

# Payment Gateway
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key
```

### Default Admin Credentials (Development)
- **Email**: admin@mits.edu
- **Password**: admin123

## 📊 Features Overview

### 1. Enhanced Admin Dashboard
- Real-time statistics and metrics
- Interactive charts and graphs
- Event performance tracking
- Revenue analytics
- Department-wise breakdowns

### 2. Advanced Registration System
- Multi-step registration process
- Team registration support
- Custom field validation
- Payment integration
- Email confirmations

### 3. Real-time Notifications
- Live registration updates
- Payment confirmations
- System alerts
- Event reminders
- Admin notifications

### 4. Comprehensive Export System
- Multiple format support (CSV, Excel, PDF, JSON)
- Filtered exports
- Bulk operations
- Progress tracking
- Download management

### 5. Smart Search & Filtering
- Auto-complete suggestions
- Advanced filters
- Search history
- Real-time results
- Saved searches

### 6. Payment Gateway Integration
- Multiple payment methods
- Secure transaction processing
- Payment verification
- Refund management
- Transaction history

## 🎨 UI Components

### Core Components
```jsx
// Advanced Data Table
<DataTable
  data={data}
  columns={columns}
  loading={loading}
  pagination={pagination}
  selectable={true}
  actions={actions}
/>

// Toast Notifications
const { success, error } = useToast();
success('Operation completed successfully!');

// Export Functionality
<ExportButton
  onExport={handleExport}
  formats={['csv', 'excel', 'pdf']}
  filters={filters}
/>

// Payment Gateway
<PaymentGateway
  amount={amount}
  onSuccess={handleSuccess}
  onFailure={handleFailure}
/>
```

## 🔄 State Management

### Redux Store Structure
```javascript
store: {
  auth: {
    user: Object,
    isAuthenticated: Boolean,
    token: String,
    loading: Boolean
  },
  events: {
    events: Array,
    currentEvent: Object,
    loading: Boolean,
    filters: Object
  },
  registrations: {
    registrations: Array,
    stats: Object,
    loading: Boolean
  },
  ui: {
    theme: String,
    modals: Object,
    toasts: Array,
    loading: Object
  },
  notifications: {
    notifications: Array,
    unreadCount: Number,
    realTimeConnected: Boolean
  }
}
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run dev:https      # Start with HTTPS

# Building
npm run build          # Production build
npm run preview        # Preview production build

# Testing
npm test               # Run tests
npm run test:coverage  # Test coverage
npm run test:ui        # Test UI

# Code Quality
npm run lint           # Lint code
npm run lint:fix       # Fix linting issues
npm run format         # Format code

# Analysis
npm run analyze        # Bundle analysis
npm run type-check     # TypeScript check
```

### Development Guidelines

1. **Component Development**
   - Use functional components with hooks
   - Implement proper prop types
   - Add comprehensive error boundaries
   - Follow accessibility guidelines

2. **State Management**
   - Use Redux for global state
   - Implement proper async handling
   - Add loading and error states
   - Use selectors for derived state

3. **Styling**
   - Use Tailwind CSS utility classes
   - Implement responsive design
   - Follow design system guidelines
   - Use CSS-in-JS for complex styling

4. **Performance**
   - Implement code splitting
   - Use React.memo for optimization
   - Optimize bundle size
   - Implement lazy loading

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Configure production API endpoints
2. Set up payment gateway credentials
3. Configure analytics tracking
4. Set up error monitoring

### Server Configuration
- Enable Gzip compression
- Set up proper caching headers
- Configure HTTPS/SSL
- Set up CDN for static assets

## 🔒 Security

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control
- Session timeout handling
- Secure route protection

### Data Security
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure API communication

### Payment Security
- PCI DSS compliance
- Encrypted data transmission
- No sensitive data storage
- Secure payment processing

## 📈 Performance

### Optimization Features
- Code splitting and lazy loading
- Bundle size optimization
- Image optimization
- Caching strategies

### Monitoring
- Performance metrics tracking
- Error monitoring with Sentry
- User analytics
- Real-time monitoring

## 🧪 Testing

### Testing Strategy
- Unit tests for components
- Integration tests for features
- End-to-end testing
- Performance testing

### Testing Tools
- Vitest for unit testing
- React Testing Library
- Playwright for E2E testing
- Coverage reporting

## 📚 Documentation

- [Enhancement Guide](ENHANCEMENT_GUIDE.md) - Detailed feature documentation
- [API Documentation](docs/API.md) - Backend API reference
- [Component Library](docs/COMPONENTS.md) - UI component documentation
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Development Setup
```bash
git clone https://github.com/your-org/mits-fest-manager.git
cd mits-fest-manager
npm install
npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts with [Recharts](https://recharts.org/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide React](https://lucide.dev/)

## 📞 Support

For support and questions:
- 📧 Email: support@mits.edu
- 📞 Phone: +91 8571-255-555
- 🌐 Website: https://mits-fest.your-domain.com
- 📋 Issues: [GitHub Issues](https://github.com/your-org/mits-fest-manager/issues)

---

**Built with ❤️ by the MITS Development Team**
