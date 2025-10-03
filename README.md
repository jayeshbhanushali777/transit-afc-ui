# Transit AFC - Automatic Fare Collection System (Frontend)

<div align="center">

![Transit AFC](https://img.shields.io/badge/Transit-AFC-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Modern, Responsive Web Application for Public Transit Fare Collection**

[Features](#features) • [Installation](#installation) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Styling](#styling)
- [Components](#components)
- [Routing](#routing)
- [Authentication](#authentication)
- [Payment Flow](#payment-flow)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

Transit AFC Frontend is a comprehensive web application designed for managing public transportation fare collection. Built with modern React and TypeScript, it provides an intuitive interface for users to search routes, book tickets, make payments, and manage their travel tickets.

### Key Highlights

- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 🔐 **Secure Authentication** - JWT-based authentication with protected routes
- 💳 **Multiple Payment Methods** - UPI, Cards, Net Banking, and Wallets
- 🎫 **Digital Tickets** - QR code-based tickets with real-time validation
- 📱 **Mobile Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Optimized bundle size and lazy loading
- 🌐 **Multi-language Ready** - Internationalization support structure

---

## ✨ Features

### 🔍 Route Search & Booking
- **Smart Route Search** - Search routes between any two stations
- **Multiple Route Options** - View different route alternatives with pricing
- **Advanced Filters** - Filter by transport mode, transfers, accessibility
- **Real-time Availability** - Check seat availability and schedules
- **Route Comparison** - Compare routes by duration, price, and comfort

### 👤 User Management
- **User Registration** - Easy sign-up with email verification
- **Secure Login** - Password-based authentication with remember me
- **Profile Management** - Update personal information and preferences
- **Booking History** - View all past and upcoming bookings
- **Ticket Library** - Access all purchased tickets in one place

### 💰 Payment Processing
- **UPI Payments** - PhonePe, Google Pay, Paytm integration
- **Card Payments** - Credit/Debit card support via secure gateway
- **Net Banking** - All major banks supported
- **Wallet Integration** - Digital wallet payments
- **Payment Simulation** - Demo UPI transaction flow for testing
- **Payment History** - Track all transactions with receipts

### 🎫 Ticket Management
- **Digital Tickets** - QR code-based e-tickets
- **Multiple Passengers** - Book tickets for groups
- **Ticket Activation** - Activate tickets before travel
- **Ticket Cancellation** - Cancel with refund processing
- **Ticket Transfer** - Transfer between routes (where allowed)
- **Offline Access** - Download tickets for offline use

### 📊 Analytics & Reporting
- **Booking Analytics** - View spending and travel patterns
- **Travel Statistics** - Track journey history
- **Fare Breakdown** - Detailed pricing information
- **Discount Tracking** - Monitor savings and offers

---

## 🛠 Tech Stack

### Core Technologies
- **React 18.2.0** - UI library with concurrent features
- **TypeScript 5.0** - Type-safe development
- **React Router DOM 6.x** - Client-side routing
- **Zustand** - Lightweight state management

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **@tailwindcss/forms** - Beautiful form styling
- **React Toastify** - Toast notifications
- **Lucide React** - Modern icon library

### Form Handling & Validation
- **React Hook Form 7.x** - Performant form management
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Zod integration

### HTTP & API
- **Axios** - Promise-based HTTP client
- **React Query** (planned) - Server state management

### Development Tools
- **ESLint** - Code linting
- **Prettier** (recommended) - Code formatting
- **TypeScript ESLint** - TypeScript linting rules

### Additional Libraries
- **date-fns** - Date manipulation
- **clsx** - Conditional classNames
- **QRCode.react** - QR code generation

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn** >= 1.22.x
- **Git** for version control

### Recommended Tools
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/transit-afc-frontend.git
cd transit-afc-frontend

2. Install Dependencies
Using npm:

bash
Copy code
npm install
Using yarn:

bash
Copy code
yarn install
3. Environment Setup
Create a .env file in the root directory:

env
Copy code
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_AUTH_API_URL=http://localhost:5001
REACT_APP_ROUTE_API_URL=http://localhost:5002
REACT_APP_BOOKING_API_URL=http://localhost:5003
REACT_APP_PAYMENT_API_URL=http://localhost:5004
REACT_APP_TICKET_API_URL=http://localhost:5005

# Application Configuration
REACT_APP_NAME=Transit AFC
REACT_APP_VERSION=1.0.0
REACT_APP_ENV=development

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_PWA=false

# Payment Gateway (Demo)
REACT_APP_RAZORPAY_KEY=rzp_test_xxxxxxxxxx
REACT_APP_STRIPE_KEY=pk_test_xxxxxxxxxx
4. Start Development Server
bash
Copy code
npm start
The application will open at http://localhost:3000

⚙️ Configuration
API Base URLs
The application connects to multiple microservices:

Service	Default URL	Environment Variable
Authentication	http://localhost:5001	REACT_APP_AUTH_API_URL
Routes	http://localhost:5002	REACT_APP_ROUTE_API_URL
Bookings	http://localhost:5003	REACT_APP_BOOKING_API_URL
Payments	http://localhost:5004	REACT_APP_PAYMENT_API_URL
Tickets	http://localhost:5005	REACT_APP_TICKET_API_URL
Tailwind Configuration
Custom Tailwind configuration is in tailwind.config.js:

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { /* Custom primary colors */ },
        secondary: { /* Custom secondary colors */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

📁 Project Structure

transit-afc-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── api/                    # API integration layer
│   │   ├── client.ts          # Axios instance & interceptors
│   │   └── services/          # Service modules
│   │       ├── authService.ts
│   │       ├── routeService.ts
│   │       ├── bookingService.ts
│   │       ├── paymentService.ts
│   │       └── ticketService.ts
│   ├── components/            # Reusable components
│   │   ├── common/           # Generic components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── auth/             # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── routes/           # Route components
│   │   │   ├── RouteSearch.tsx
│   │   │   ├── RouteCard.tsx
│   │   │   └── StationSelector.tsx
│   │   ├── booking/          # Booking components
│   │   │   ├── BookingSummary.tsx
│   │   │   ├── PassengerForm.tsx
│   │   │   └── PromoCode.tsx
│   │   ├── payment/          # Payment components
│   │   │   ├── UpiPayment.tsx
│   │   │   ├── CardPayment.tsx
│   │   │   ├── NetBankingPayment.tsx
│   │   │   └── UpiTransactionSimulator.tsx
│   │   └── ticket/           # Ticket components
│   │       ├── TicketCard.tsx
│   │       ├── TicketDetails.tsx
│   │       └── QRCodeDisplay.tsx
│   ├── pages/                # Page components
│   │   ├── HomePage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── PaymentPage.tsx
│   │   ├── PaymentSuccessPage.tsx
│   │   ├── MyTicketsPage.tsx
│   │   ├── MyBookingsPage.tsx
│   │   ├── TicketPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── store/                # State management
│   │   ├── authStore.ts
│   │   ├── bookingStore.ts
│   │   └── ticketStore.ts
│   ├── types/                # TypeScript types
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   ├── route.types.ts
│   │   ├── booking.types.ts
│   │   ├── payment.types.ts
│   │   └── ticket.types.ts
│   ├── utils/                # Utility functions
│   │   ├── time.utils.ts
│   │   ├── route.utils.ts
│   │   ├── ticket.utils.ts
│   │   └── validation.utils.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── routes/               # Route configuration
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── styles/               # Global styles
│   │   └── index.css
│   ├── App.tsx              # Root component
│   └── index.tsx            # Entry point
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md

🔌 API Integration
API Client Configuration
The application uses Axios with interceptors for centralized error handling:

// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Team
Frontend Team - Trailblazers
Backend Team - Trailblazers
UI/UX Design - Trailblazers
📞 Support
For support, email support@transitafc.com or join our Slack channel.

🙏 Acknowledgments
React Team for the amazing framework
Tailwind Labs for Tailwind CSS
All open-source contributors
<div align="center">
Made with ❤️ by Trailblazers

⬆ Back to Top

</div> ```
