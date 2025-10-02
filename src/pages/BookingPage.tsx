import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useBookingStore } from '../store/bookingStore';
import { useAuthStore } from '../store/authStore';
import { PassengerForm } from '../components/booking/PassengerForm';
import { BookingSummary } from '../components/booking/BookingSummary';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { CreatePassengerRequest } from '../types/booking.types';
import { bookingService } from '../api/services/bookingService';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const {
    selectedRoute,
    passengers,
    addPassenger,
    removePassenger,
    contactEmail,
    contactPhone,
    setContactInfo,
    discountCode,
    setDiscountCode,
  } = useBookingStore();

  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [localEmail, setLocalEmail] = useState(user?.email || contactEmail || '');
  const [localPhone, setLocalPhone] = useState(user?.phoneNumber || contactPhone || '');
  const [promoCode, setPromoCode] = useState(discountCode || '');

  React.useEffect(() => {
    if (localEmail && localPhone) {
      setContactInfo(localEmail, localPhone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localEmail, localPhone]);

  if (!selectedRoute) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <Card className="text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Route Selected</h2>
          <p className="text-gray-600 mb-6 text-lg">Please search and select a route first to continue booking</p>
          <Button
            size="lg"
            onClick={() => navigate('/search')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          >
            Search Routes
          </Button>
        </Card>
      </div>
    );
  }

  const handleAddPassenger = (passenger: CreatePassengerRequest) => {
    addPassenger(passenger);
    setShowPassengerForm(false);
    toast.success('✅ Passenger added successfully');
  };

  const handleCreateBooking = async () => {
    if (passengers.length === 0) {
      toast.error('Please add at least one passenger');
      return;
    }

    if (!localEmail || !localPhone) {
      toast.error('Please provide contact information');
      return;
    }

    setIsCreating(true);
    try {
      const firstSegment = selectedRoute.segments[0];
      const lastSegment = selectedRoute.segments[selectedRoute.segments.length - 1];

      const response = await bookingService.createBooking({
        routeId: selectedRoute.routeId,
        sourceStationId: firstSegment.startStation.id,
        destinationStationId: lastSegment.endStation.id,
        departureTime: selectedRoute.departureTime,
        contactEmail: localEmail,
        contactPhone: localPhone,
        passengers,
        discountCode: promoCode || undefined,
        bookingSource: 'web',
      });

      if (response.isSuccess && response.data) {
        toast.success('🎉 Booking created successfully!');
        navigate(`/payment/${response.data.id}`);
      } else {
        toast.error(response.message || 'Booking creation failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Booking creation failed');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600 text-lg">
            Just a few more details and you're ready to go!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { num: '1', label: 'Contact Info', active: true, completed: localEmail && localPhone },
                { num: '2', label: 'Passengers', active: true, completed: passengers.length > 0 },
                { num: '3', label: 'Payment', active: false, completed: false },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                    ${step.completed 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : step.active 
                        ? 'bg-primary-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {step.completed ? '✓' : step.num}
                  </div>
                  <span className={`text-sm font-medium hidden md:block ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <Card className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                  <p className="text-gray-600">We'll send booking details here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="your@email.com"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  placeholder="+1234567890"
                  value={localPhone}
                  onChange={(e) => setLocalPhone(e.target.value)}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />
              </div>
            </Card>

            {/* Passengers */}
            <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Passengers ({passengers.length})
                    </h2>
                    <p className="text-gray-600">Add traveler details</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPassengerForm(!showPassengerForm)}
                  variant={showPassengerForm ? "secondary" : "primary"}
                  icon={
                    showPassengerForm ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )
                  }
                >
                  {showPassengerForm ? 'Cancel' : 'Add Passenger'}
                </Button>
              </div>

              {/* Passenger List */}
              {passengers.length > 0 && (
                <div className="space-y-3 mb-6">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {passenger.firstName} {passenger.lastName}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
                              {passenger.passengerType === 0 ? 'Adult' : 
                               passenger.passengerType === 1 ? 'Child' :
                               passenger.passengerType === 2 ? 'Senior' :
                               passenger.passengerType === 3 ? 'Student' : 'Disabled'}
                            </span>
                            {passenger.age && (
                              <span className="text-sm text-gray-600">
                                {passenger.age} years
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => removePassenger(index)}
                        variant="danger"
                        size="sm"
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Passenger Form */}
              {showPassengerForm && (
                <div className="animate-scale-in">
                  <PassengerForm
                    onAdd={handleAddPassenger}
                    passengerNumber={passengers.length + 1}
                  />
                </div>
              )}

              {/* Empty State */}
              {passengers.length === 0 && !showPassengerForm && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium mb-4">No passengers added yet</p>
                  <Button onClick={() => setShowPassengerForm(true)}>
                    Add Your First Passenger
                  </Button>
                </div>
              )}
            </Card>

            {/* Promo Code */}
            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Promo Code</h2>
                  <p className="text-gray-600">Apply discount code</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button
                  variant="secondary"
                  onClick={() => setDiscountCode(promoCode)}
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
              {discountCode && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Code "{discountCode}" applied!</span>
                  </div>
                  <button
                    onClick={() => {
                      setDiscountCode('');
                      setPromoCode('');
                    }}
                    className="text-green-700 hover:text-green-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </Card>

            {/* Proceed Button */}
            <div className="sticky bottom-4 z-10 lg:hidden">
              <Button
                fullWidth
                size="xl"
                onClick={handleCreateBooking}
                isLoading={isCreating}
                disabled={passengers.length === 0 || !localEmail || !localPhone}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              >
                Proceed to Payment
              </Button>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSummary
                route={selectedRoute}
                passengers={passengers}
                discountCode={discountCode}
              />
              
              <div className="hidden lg:block mt-6">
                <Button
                  fullWidth
                  size="xl"
                  onClick={handleCreateBooking}
                  isLoading={isCreating}
                  disabled={passengers.length === 0 || !localEmail || !localPhone}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};