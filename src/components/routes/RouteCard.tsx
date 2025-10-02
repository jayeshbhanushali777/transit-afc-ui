import React from 'react';
import { RouteOption } from '../../types/route.types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface RouteCardProps {
  route: RouteOption;
  onSelect: (route: RouteOption) => void;
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect }) => {
  return (
    <Card hoverable className="group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {route.routeName}
            </h3>
            <p className="text-sm text-gray-500">Route Code: {route.routeCode}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              ₹{route.totalFare.toFixed(0)}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="text-center flex-1">
              <div className="font-bold text-lg">{route.segments[0].startStation.code}</div>
              <div className="text-xs text-gray-500">
                {new Date(route.departureTime).toLocaleTimeString()}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="h-1 bg-gradient-to-r from-green-500 to-red-500 rounded-full"></div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2">
                <p className="text-xs text-gray-600">
                  {formatDuration(route.totalDuration)}
                </p>
              </div>
            </div>

            <div className="text-center flex-1">
              <div className="font-bold text-lg">
                {route.segments[route.segments.length - 1].endStation.code}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(route.arrivalTime).toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Segments */}
          <div className="space-y-2 mt-4">
            {route.segments.map((segment, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
                  {segment.transportMode}
                </span>
                <span className="text-gray-600">
                  {segment.routeNumber} - {formatDuration(segment.duration)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Route Details */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span>📏 {route.totalDistance.toFixed(1)} km</span>
          <span>🔄 {route.transferCount} transfer(s)</span>
          {route.isAccessible && <span>♿ Wheelchair accessible</span>}
        </div>

        {/* Book Button */}
        <Button
          fullWidth
          onClick={() => onSelect(route)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          }
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};