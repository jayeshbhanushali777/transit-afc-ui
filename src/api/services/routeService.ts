import apiClient from '../client';
import { ApiResponse } from '../../types/api.types';
import { 
  RouteOption, 
  RouteSearchParams, 
  RouteSearchResponse 
} from '../../types/route.types';

export const routeService = {
  // Search routes using GET with query parameters
  searchRoutes: async (params: RouteSearchParams): Promise<ApiResponse<RouteSearchResponse>> => {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    queryParams.append('Source', params.Source);
    queryParams.append('Destination', params.Destination);
    
    if (params.DepartureTime) {
      queryParams.append('DepartureTime', params.DepartureTime);
    }
    if (params.TransportMode) {
      queryParams.append('TransportMode', params.TransportMode);
    }
    if (params.IncludeAccessibility !== undefined) {
      queryParams.append('IncludeAccessibility', params.IncludeAccessibility.toString());
    }
    if (params.PreferFastest !== undefined) {
      queryParams.append('PreferFastest', params.PreferFastest.toString());
    }
    if (params.MaxTransfers !== undefined) {
      queryParams.append('MaxTransfers', params.MaxTransfers.toString());
    }
    if (params.Language) {
      queryParams.append('Language', params.Language);
    }

    const response = await apiClient.get<RouteSearchResponse>(
      `/Routes/search?${queryParams.toString()}`
    );
    return response;
  },

  // Get route by ID
  getRoute: async (routeId: string): Promise<ApiResponse<RouteOption>> => {
    return apiClient.get<RouteOption>(`/Routes/${routeId}`);
  },

  // Get routes by station
  getRoutesByStation: async (stationId: string): Promise<ApiResponse<RouteOption[]>> => {
    return apiClient.get<RouteOption[]>(`/Routes/station/${stationId}`);
  },
};

// Re-export types for convenience
export type { RouteSearchParams, RouteSearchResponse, RouteOption };