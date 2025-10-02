import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-strong">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Get Started
          </h1>
          <p className="text-gray-600 text-lg">
            Create your account in seconds
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-600 font-semibold hover:text-primary-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-gray-900 mb-4">Why join us?</h3>
          {[
            { icon: '✅', text: 'Instant ticket booking' },
            { icon: '💰', text: 'Exclusive discounts' },
            { icon: '📱', text: 'Digital QR tickets' },
            { icon: '🎯', text: 'Track all bookings' },
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xl">{benefit.icon}</span>
              <span className="text-gray-700 font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};