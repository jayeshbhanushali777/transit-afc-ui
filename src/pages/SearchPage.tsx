import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routeService } from '../api/services/routeService';
import { stationService } from '../api/services/stationService';
import { RouteOption, RouteSearchParams, RouteSearchResponse } from '../types/route.types';
import { Station } from '../types/station.types';
import { useBookingStore } from '../store/bookingStore';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Loading } from '../components/common/Loading';
import { RouteCard } from '../components/routes/RouteCard';

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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preferFastest, setPreferFastest] = useState(true);
  const [maxTransfers, setMaxTransfers] = useState(3);
  const [includeAccessibility, setIncludeAccessibility] = useState(true);
  const [transportMode, setTransportMode] = useState<string>('');

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
      const searchParams: RouteSearchParams = {
        Source: sourceStation.name,
        Destination: destinationStation.name,
        DepartureTime: new Date().toISOString(),
        IncludeAccessibility: includeAccessibility,
        PreferFastest: preferFastest,
        MaxTransfers: maxTransfers,
        TransportMode: transportMode || undefined,
        Language: 'en',
      };
  
      const response = await routeService.searchRoutes(searchParams);
  
      if (response.isSuccess && response.data) {
        console.log(response.data.routes)
        setRoutes(response.data.routes || []);
        if ((response.data.routes || []).length === 0) {
          toast.info('No routes found for this journey');
        } else {
          toast.success(`Found ${response.data.routes.length} route(s)!`);
        }
      } else {
        toast.error(response.message || 'Search failed');
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

            {/* Advanced Search Options */}
            {sourceStation && destinationStation && (
              <div className="animate-scale-in">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors mb-3"
                >
                  <svg 
                    className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Advanced Search Options
                </button>

                {showAdvanced && (
                  <div className="p-4 bg-gray-50 rounded-xl space-y-4 mb-4">
                    {/* Prefer Fastest */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferFastest}
                        onChange={(e) => setPreferFastest(e.target.checked)}
                        className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Prefer Fastest Route</div>
                        <div className="text-sm text-gray-600">Prioritize travel time over cost</div>
                      </div>
                    </label>

                    {/* Include Accessibility */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeAccessibility}
                        onChange={(e) => setIncludeAccessibility(e.target.checked)}
                        className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Wheelchair Accessible</div>
                        <div className="text-sm text-gray-600">Show only accessible routes</div>
                      </div>
                    </label>

                    {/* Max Transfers */}
                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">
                        Maximum Transfers: {maxTransfers}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={maxTransfers}
                        onChange={(e) => setMaxTransfers(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Direct</span>
                        <span>Up to 5</span>
                      </div>
                    </div>

                    {/* Transport Mode */}
                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">
                        Transport Mode (Optional)
                      </label>
                      <select
                        value={transportMode}
                        onChange={(e) => setTransportMode(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Any Mode</option>
                        <option value="Metro">Metro</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Tram">Tram</option>
                      </select>
                    </div>
                  </div>
                )}
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
        {routes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Routes ({routes.length})
              </h2>
              <div className="text-sm text-gray-600">
                Sorted by best value
              </div>
            </div>

            <div className="space-y-4">
              {routes.map((route, index) => (
                <RouteCard
                  key={route.routeId}
                  route={route}
                  onSelect={handleSelectRoute}
                  isRecommended={index === 0} // Mark first route as recommended
                />
              ))}
            </div>
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