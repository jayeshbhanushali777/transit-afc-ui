import React from 'react';
import { RouteOption, RouteType } from '../../types/route.types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatDuration, formatTime } from '../../utils/time.utils';

interface RouteCardProps {
  route: RouteOption;
  onSelect: (route: RouteOption) => void;
  isRecommended?: boolean;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect, isRecommended = false }) => {
  const getRouteTypeBadge = (type: RouteType) => {
    const styles = {
      [RouteType.Direct]: 'bg-green-100 text-green-700 border-green-300',
      [RouteType.Transfer]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      [RouteType.Multiple]: 'bg-orange-100 text-orange-700 border-orange-300',
    };

    const icons = {
      [RouteType.Direct]: '➡️',
      [RouteType.Transfer]: '🔄',
      [RouteType.Multiple]: '↗️',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${styles[type]} inline-flex items-center gap-1`}>
        <span>{icons[type]}</span>
        {type}
      </span>
    );
  };

  const getTransportModeIcon = (mode: string) => {
    const icons: Record<string, string> = {
      Bus: '🚌',
      Metro: '🚇',
      Train: '🚆',
      Tram: '🚋',
      Ferry: '⛴️',
      Walk: '🚶',
    };
    return icons[mode] || '🚌';
  };

  const getComfortStars = (score?: number) => {
    if (!score) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < score ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card hoverable className="group relative overflow-hidden">
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -right-10 top-0 rotate-15 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold py-1 px-12 shadow-lg z-10">
          BEST VALUE
        </div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {getRouteTypeBadge(route.routeType)}
              {route.transferCount > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {route.transferCount} Transfer{route.transferCount > 1 ? 's' : ''}
                </span>
              )}
              {route.isAccessible && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                  ♿ Accessible
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {route.segments.length} segment{route.segments.length > 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">
              ₹{route.totalFare.toFixed(0)}
            </div>
            <div className="text-xs text-gray-500">per person</div>
            {route.comfortScore && (
              <div className="mt-1">
                {getComfortStars(route.comfortScore)}
              </div>
            )}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="bg-gradient-to-r from-green-50 via-blue-50 to-red-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            {/* Departure */}
            <div className="text-center flex-shrink-0">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2 shadow-md"></div>
              <div className="font-bold text-lg text-gray-900">
                {route.segments[0].startStation.code}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {formatTime(route.departureTime)}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">
                {route.segments[0].startStation.name}
              </div>
            </div>

            {/* Journey Line */}
            <div className="flex-1 mx-4 relative">
              <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-red-500 rounded-full"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border-2 border-blue-200">
                <div className="text-xs font-bold text-gray-700">
                  {formatDuration(route.totalDuration)}
                </div>
              </div>
              {route.transferCount > 0 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-100 px-2 py-0.5 rounded-full text-xs font-semibold text-yellow-700">
                  {route.transferCount} stop{route.transferCount > 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Arrival */}
            <div className="text-center flex-shrink-0">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2 shadow-md"></div>
              <div className="font-bold text-lg text-gray-900">
                {route.segments[route.segments.length - 1].endStation.code}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {formatTime(route.arrivalTime)}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">
                {route.segments[route.segments.length - 1].endStation.name}
              </div>
            </div>
          </div>
        </div>

        {/* Segments */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Route Details
          </div>
          {route.segments.map((segment, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Transport Mode Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold shadow-md"
                style={{ backgroundColor: segment.color || '#3B82F6' }}
              >
                {getTransportModeIcon(segment.transportMode)}
              </div>

              {/* Segment Info */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <span>{segment.routeName}</span>
                  <span className="px-2 py-0.5 bg-white rounded text-xs font-bold text-gray-600">
                    {segment.routeCode}
                  </span>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(segment.duration)}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {segment.distance.toFixed(1)} km
                  </span>
                  <span className="flex items-center gap-1">
                    💰 ₹{segment.fare.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Transport Mode Badge */}
              <div className="text-xs font-semibold px-2 py-1 bg-primary-100 text-primary-700 rounded">
                {segment.transportMode}
              </div>
            </div>
          ))}
        </div>

        {/* Route Summary */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg text-center">
          <div>
            <div className="text-xs text-gray-600 mb-1">Distance</div>
            <div className="font-bold text-gray-900">
              {route.totalDistance.toFixed(1)} km
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Duration</div>
            <div className="font-bold text-gray-900">
              {formatDuration(route.totalDuration)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Transfers</div>
            <div className="font-bold text-gray-900">
              {route.transferCount}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            ✅ Instant confirmation
          </span>
          <span className="flex items-center gap-1">
            📱 Digital QR ticket
          </span>
          <span className="flex items-center gap-1">
            🔒 Secure payment
          </span>
          {route.isAccessible && (
            <span className="flex items-center gap-1">
              ♿ Wheelchair accessible
            </span>
          )}
        </div>

        {/* Book Button */}
        <Button
          fullWidth
          size="lg"
          onClick={() => onSelect(route)}
          className="group-hover:shadow-lg transition-all"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          }
        >
          Book This Route
        </Button>
      </div>
    </Card>
  );
};