import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routeService } from '../api/services/routeService';
import { stationService } from '../api/services/stationService';
import { RouteOption, RouteSearchResponse } from '../types/route.types';
import { Station } from '../types/station.types';
import { useBookingStore } from '../store/bookingStore';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Loading } from '../components/common/Loading';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRoute } = useBookingStore();

  const [stations, setStations] = useState<Station[]>([]);
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [sourceStation, setSourceStation] = useState<Station | null>(null);
  const [destinationStation, setDestinationStation] = useState<Station | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Load stations on mount
  React.useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      const response = await stationService.getAllStations();
      if (response.isSuccess && response.data) {
        setStations(response.data);
      }
    } catch (error: any) {
      toast.error('Failed to load stations');
    }
  };

  const handleSearch = async () => {
    if (!sourceStation || !destinationStation) {
      toast.error('Please select both source and destination stations');
      return;
    }
  
    if (sourceStation.id === destinationStation.id) {
      toast.error('Source and destination cannot be the same');
      return;
    }
  
    setIsSearching(true);
    try {
      const response = await routeService.searchRoutes({
        fromStationId: sourceStation.id,
        toStationId: destinationStation.id,
        departureDate: new Date().toISOString(),
        passengerCount: 1,
      });
  
      if (response.isSuccess && response.data) {
        const routeData = response.data as RouteSearchResponse;
        setRoutes(routeData.routes || []);
        if (routeData.routes.length === 0) {
          toast.info('No routes found for this journey');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectRoute = (route: RouteOption) => {
    setSelectedRoute(route);
    navigate('/booking');
  };

  const swapStations = () => {
    const temp = sourceStation;
    setSourceStation(destinationStation);
    setDestinationStation(temp);
  };

  const filteredStations = (exclude?: string) => {
    return stations.filter(
      (station) =>
        station.id !== exclude &&
        (station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.code.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white rounded-full text-primary-600 font-semibold text-sm shadow-md">
              🔍 Route Search
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Find Your Perfect Route
          </h1>
          <p className="text-xl text-gray-600">
            Search and book tickets for your next journey
          </p>
        </div>

        {/* Search Card */}
        <Card className="mb-8 animate-slide-up">
          <div className="space-y-6">
            {/* Station Selection */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
              {/* Source Station */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      A
                    </span>
                    From
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select source station"
                    value={sourceStation?.name || ''}
                    onFocus={() => {
                      setShowSourceDropdown(true);
                      setSearchQuery('');
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 text-lg font-medium transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                {/* Source Dropdown */}
                {showSourceDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSourceDropdown(false)}
                    ></div>
                    <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-strong max-h-80 overflow-y-auto">
                      {filteredStations(destinationStation?.id).map((station) => (
                        <button
                          key={station.id}
                          onClick={() => {
                            setSourceStation(station);
                            setShowSourceDropdown(false);
                          }}
                          className="w-full px-6 py-4 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div className="font-semibold text-gray-900">
                            {station.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">
                              {station.code}
                            </span>
                            {station.city}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex justify-center mb-2">
                <button
                  onClick={swapStations}
                  className="w-12 h-12 bg-white border-2 border-primary-300 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-50 hover:border-primary-500 transition-all transform hover:rotate-180 duration-300 shadow-md"
                  title="Swap stations"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              {/* Destination Station */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      B
                    </span>
                    To
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select destination station"
                    value={destinationStation?.name || ''}
                    onFocus={() => {
                      setShowDestDropdown(true);
                      setSearchQuery('');
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg font-medium transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                {/* Destination Dropdown */}
                {showDestDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDestDropdown(false)}
                    ></div>
                    <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-strong max-h-80 overflow-y-auto">
                      {filteredStations(sourceStation?.id).map((station) => (
                        <button
                          key={station.id}
                          onClick={() => {
                            setDestinationStation(station);
                            setShowDestDropdown(false);
                          }}
                          className="w-full px-6 py-4 text-left hover:bg-red-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div className="font-semibold text-gray-900">
                            {station.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">
                              {station.code}
                            </span>
                            {station.city}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Selected Journey Preview */}
            {sourceStation && destinationStation && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-2xl border-2 border-dashed border-primary-300 animate-scale-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {sourceStation.code}
                      </div>
                      <div className="text-xs text-gray-500">
                        {sourceStation.city}
                      </div>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-red-500 rounded-full"></div>
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {destinationStation.code}
                      </div>
                      <div className="text-xs text-gray-500">
                        {destinationStation.city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Button */}
            <Button
              fullWidth
              size="xl"
              onClick={handleSearch}
              isLoading={isSearching}
              disabled={!sourceStation || !destinationStation}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            >
              Search Routes
            </Button>
          </div>
        </Card>

        {/* Loading State */}
        {isSearching && <Loading text="Searching for routes..." />}

        {/* Routes List */}
        {!isSearching && routes.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Routes ({routes.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sorted by fastest route
              </div>
            </div>

            {routes.map((route, index) => (
              <Card
                key={index}
                hoverable
                className="relative overflow-hidden group"
              >
                {/* Best Value Badge */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Best Value
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6">
                  {/* Route Info */}
                  <div>
                    {/* Route Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {route.routeName}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
                            {route.routeCode}
                          </span>
                          <span className="text-sm">
                            {route.segments.length} segment{route.segments.length > 1 ? 's' : ''}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Journey Details */}
                    <div className="space-y-4">
                      {route.segments.map((segment, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-green-500' : idx === route.segments.length - 1 ? 'bg-red-500' : 'bg-blue-500'} shadow-md`}></div>
                            {idx < route.segments.length - 1 && (
                              <div className="w-0.5 h-12 bg-gradient-to-b from-blue-300 to-blue-500"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">
                                  {segment.startStation.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {segment.startStation.code} • {new Date(segment.departureTime).toLocaleTimeString()}
                                </p>
                              </div>
                              {idx < route.segments.length - 1 && (
                                <div className="text-right">
                                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                    {segment.transportMode}
                                  </span>
                                </div>
                              )}
                            </div>
                            {idx === route.segments.length - 1 && (
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">
                                  {segment.endStation.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {segment.endStation.code} • {new Date(segment.arrivalTime).toLocaleTimeString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Route Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {Math.floor(route.totalDuration / 60)}h {route.totalDuration % 60}m
                        </div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {route.totalDistance.toFixed(1)} km
                        </div>
                        <div className="text-sm text-gray-500">Distance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {route.segments.length}
                        </div>
                        <div className="text-sm text-gray-500">Stops</div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Section */}
                  <div className="lg:w-64 flex flex-col justify-between">
                    <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl p-6 mb-4">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-600 mb-1">Starting from</div>
                        <div className="text-4xl font-extrabold text-gradient">
                          ₹{route.totalFare.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">per person</div>
                      </div>

                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Instant confirmation
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Digital QR ticket
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Free cancellation
                        </div>
                      </div>
                    </div>

                    <Button
                      fullWidth
                      size="lg"
                      onClick={() => handleSelectRoute(route)}
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      }
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isSearching && routes.length === 0 && sourceStation && destinationStation && (
          <Card className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No routes found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any routes for this journey. Try different stations.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSourceStation(null);
                setDestinationStation(null);
                setRoutes([]);
              }}
            >
              Clear Search
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};