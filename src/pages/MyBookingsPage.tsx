import React, { useEffect, useState } from 'react';
import { bookingService } from '../api/services/bookingService';
import { BookingResponse } from '../types/booking.types';
import { Card } from '../components/common/Card';
import { Loading } from '../components/common/Loading';
import { toast } from 'react-toastify';

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const response = await bookingService.getMyBookings();
      if (response.isSuccess && response.data) {
        setBookings(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: number) => {
    const styles: Record<number, string> = {
      0: 'bg-yellow-100 text-yellow-800',
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-red-100 text-red-800',
      4: 'bg-gray-100 text-gray-800',
    };

    const labels: Record<number, string> = {
      0: 'Pending',
      1: 'Confirmed',
      2: 'Payment Pending',
      3: 'Failed',
      4: 'Cancelled',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles[0]}`}>
        {labels[status] || 'Unknown'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text="Loading bookings..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">No bookings found</p>
            <p className="text-gray-500 text-sm mt-2">Start booking to see your trips here</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} hoverable>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        {booking.sourceStation.name} → {booking.destinationStation.name}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Booking Number</p>
                        <p className="font-medium font-mono">{booking.bookingNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Departure</p>
                        <p className="font-medium">
                          {new Date(booking.departureTime).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Passengers</p>
                        <p className="font-medium">{booking.passengerCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Amount</p>
                        <p className="font-medium text-blue-600">₹{booking.finalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};