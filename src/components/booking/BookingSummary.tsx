import React, { useEffect, useState } from 'react';
import { CreatePassengerRequest, FareCalculationResponse } from '../../types/booking.types';
import { RouteOption } from '../../types/route.types';
import { Card } from '../common/Card';
import { Loading } from '../common/Loading';
import { bookingService } from '../../api/services/bookingService';
import { formatDuration } from '../../utils/time.utils';

interface BookingSummaryProps {
  route: RouteOption;
  passengers: CreatePassengerRequest[];
  discountCode?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  route,
  passengers,
  discountCode,
}) => {
  const [fareDetails, setFareDetails] = useState<FareCalculationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (passengers.length > 0 && route.segments.length > 0) {
      calculateFare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengers, discountCode]);

  const calculateFare = async () => {
    setIsLoading(true);
    try {
      const firstSegment = route.segments[0];
      const lastSegment = route.segments[route.segments.length - 1];

      const response = await bookingService.calculateFare({
        routeId: route.routeId,
        sourceStationId: firstSegment.startStation.id,
        destinationStationId: lastSegment.endStation.id,
        passengerTypes: passengers.map((p) => p.passengerType),
        discountCode: discountCode,
      });

      if (response.isSuccess && response.data) {
        setFareDetails(response.data);
      }
    } catch (error) {
      console.error('Fare calculation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <Loading text="Calculating fare..." size="sm" />
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Booking Summary</h3>
          <p className="text-sm text-gray-500">Review your details</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Route Info */}
        <div>
          <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Journey Details
          </h4>
          <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-md"></div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">
                  {route.segments[0].startStation.name}
                </div>
                <div className="text-xs text-gray-500">
                  {route.segments[0].startStation.code}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-1.5">
              <div className="w-0.5 h-6 bg-gradient-to-b from-green-500 to-red-500"></div>
              <div className="text-sm text-gray-600">
              {route.totalDistance.toFixed(1)} km • {formatDuration(route.totalDuration)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-md"></div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">
                  {route.segments[route.segments.length - 1].endStation.name}
                </div>
                <div className="text-xs text-gray-500">
                  {route.segments[route.segments.length - 1].endStation.code}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passengers */}
        {passengers.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Passengers ({passengers.length})
            </h4>
            <div className="space-y-2">
              {passengers.map((passenger, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {passenger.firstName} {passenger.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {passenger.passengerType === 0 ? 'Adult' : 
                         passenger.passengerType === 1 ? 'Child' :
                         passenger.passengerType === 2 ? 'Senior' :
                         passenger.passengerType === 3 ? 'Student' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-primary-600">
                    {fareDetails?.passengerFares[idx]?.finalFare
                      ? `₹${fareDetails.passengerFares[idx].finalFare.toFixed(0)}`
                      : '-'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fare Breakdown */}
        {fareDetails && (
          <div>
            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Fare Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-medium">₹{fareDetails.baseFare.toFixed(2)}</span>
              </div>
              {fareDetails.discountAmount && fareDetails.discountAmount > 0 && (
                <div className="flex justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Discount Applied</span>
                  <span className="text-green-700 font-bold">-₹{fareDetails.discountAmount.toFixed(2)}</span>
                </div>
              )}
              {fareDetails.taxAmount && fareDetails.taxAmount > 0 && (
                <div className="flex justify-between p-2">
                  <span className="text-gray-600">Tax & Fees</span>
                  <span className="font-medium">₹{fareDetails.taxAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t-2 border-gray-200">
          <div className="bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Amount</div>
                <div className="text-4xl font-extrabold">
                  ₹{fareDetails?.finalAmount.toFixed(0) || route.totalFare.toFixed(0)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">{passengers.length} passenger(s)</div>
                <div className="text-xs opacity-75 mt-1">Including all taxes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {[
            { icon: '✅', text: 'Instant confirmation' },
            { icon: '📱', text: 'Digital QR ticket' },
            { icon: '🔒', text: 'Secure payment' },
            { icon: '💰', text: 'Best price guarantee' },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <span>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};