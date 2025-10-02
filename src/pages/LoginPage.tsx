import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-strong">
            <span className="text-4xl">🚆</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary-600 font-semibold hover:text-primary-700 hover:underline"
            >
              Sign up free
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: '⚡', text: 'Fast Booking' },
            { icon: '🔒', text: 'Secure' },
            { icon: '📱', text: 'Easy to Use' },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-xs font-medium text-gray-700">
                {feature.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};