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
