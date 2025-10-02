import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { toast } from 'react-toastify';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('👋 Logged out successfully');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-4xl font-bold shadow-xl">
            {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {user.fullName}
          </h1>
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🎫', label: 'Total Tickets', value: '0', color: 'from-blue-500 to-blue-700' },
            { icon: '📋', label: 'Bookings', value: '0', color: 'from-purple-500 to-purple-700' },
            { icon: '💰', label: 'Total Spent', value: '₹0', color: 'from-green-500 to-green-700' },
          ].map((stat, idx) => (
            <Card key={idx} className="text-center animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Profile Information */}
        <Card className="mb-6 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">First Name</p>
                <p className="font-semibold text-gray-900">{user.firstName}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Last Name</p>
                <p className="font-semibold text-gray-900">{user.lastName}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
                {user.isEmailVerified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-900">{user.phoneNumber}</p>
                </div>
                {user.isPhoneVerified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>

            {user.city && user.state && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">City</p>
                  <p className="font-semibold text-gray-900">{user.city}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">State</p>
                  <p className="font-semibold text-gray-900">{user.state}</p>
                </div>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Member Since</p>
              <p className="font-semibold text-gray-900">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button fullWidth size="lg" variant="secondary">
            Edit Profile
          </Button>
          <Button fullWidth size="lg" variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};