import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const features = [
    {
      icon: '🔍',
      title: 'Search Routes',
      description: 'Find the best routes between stations with real-time updates',
      color: 'from-blue-500 to-cyan-500',
      action: () => navigate('/search'),
    },
    {
      icon: '🎫',
      title: 'My Tickets',
      description: 'View and manage all your active travel tickets',
      color: 'from-purple-500 to-pink-500',
      action: () => navigate('/my-tickets'),
    },
    {
      icon: '📋',
      title: 'My Bookings',
      description: 'Track booking history and upcoming journeys',
      color: 'from-orange-500 to-red-500',
      action: () => navigate('/my-bookings'),
    },
    {
      icon: '👤',
      title: 'Profile',
      description: 'Manage your account and preferences',
      color: 'from-green-500 to-teal-500',
      action: () => navigate('/profile'),
    },
  ];

  const stats = [
    { label: 'Active Routes', value: '50+', icon: '🚆' },
    { label: 'Daily Passengers', value: '10K+', icon: '👥' },
    { label: 'Cities Connected', value: '25+', icon: '🏙️' },
    { label: 'Customer Rating', value: '4.8★', icon: '⭐' },
  ];

  const benefits = [
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Book tickets in seconds with our streamlined process',
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-grade security',
    },
    {
      icon: '📱',
      title: 'Digital Tickets',
      description: 'QR code based tickets, no paper hassle',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Transparent pricing with exclusive discounts',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white rounded-full text-primary-600 font-semibold text-sm shadow-md">
                🎉 Welcome to the Future of Transit
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your Journey Starts
              <span className="block text-gradient mt-2">Here & Now</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience seamless travel with our smart transit system. 
              Book tickets, track journeys, and travel hassle-free.
            </p>

            {isAuthenticated ? (
              <div className="mb-8 animate-slide-up">
                <div className="inline-block bg-white rounded-2xl shadow-strong p-6 mb-6">
                  <p className="text-lg text-gray-700 mb-2">
                    👋 Welcome back,
                  </p>
                  <p className="text-3xl font-bold text-gradient">
                    {user?.fullName}!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="xl"
                    onClick={() => navigate('/search')}
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  >
                    Search Routes Now
                  </Button>
                  <Button
                    size="xl"
                    variant="secondary"
                    onClick={() => navigate('/my-tickets')}
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    }
                  >
                    View My Tickets
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up">
                <Button
                  size="xl"
                  onClick={() => navigate('/register')}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  }
                >
                  Get Started Free
                </Button>
                <Button
                  size="xl"
                  variant="secondary"
                  onClick={() => navigate('/login')}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  }
                >
                  Sign In
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-soft p-6 transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {isAuthenticated && (
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quick Access
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  hoverable
                  onClick={feature.action}
                  className="text-center cursor-pointer group"
                >
                  <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and secure booking process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 transform -translate-y-1/2 z-0"></div>

            {[
              { step: '1', icon: '🔍', title: 'Search Route', desc: 'Enter source and destination' },
              { step: '2', icon: '🎫', title: 'Book Ticket', desc: 'Select route and add passengers' },
              { step: '3', icon: '💳', title: 'Make Payment', desc: 'Pay securely via UPI or Card' },
              { step: '4', icon: '🚆', title: 'Travel', desc: 'Scan QR code at gates' },
            ].map((item, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl shadow-strong flex items-center justify-center border-4 border-primary-100 relative">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {item.step}
                  </div>
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-4 gradient-primary">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white opacity-90 mb-8">
              Join thousands of happy travelers using our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="secondary"
                onClick={() => navigate('/register')}
              >
                Create Free Account
              </Button>
              <Button
                size="xl"
                variant="ghost"
                onClick={() => navigate('/search')}
                className="!text-white hover:!bg-white hover:!bg-opacity-20"
              >
                Explore Routes
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};