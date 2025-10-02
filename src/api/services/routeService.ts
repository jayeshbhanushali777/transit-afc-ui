import apiClient from '../client';
import { ApiResponse } from '../../types/api.types';
import { 
  RouteOption, 
  RouteSearchParams, 
  RouteSearchResponse 
} from '../../types/route.types';

export const routeService = {
  searchRoutes: async (params: RouteSearchParams): Promise<ApiResponse<RouteSearchResponse>> => {
    return apiClient.post<RouteSearchResponse>('/routes/search', params);
  },

  getRoute: async (routeId: string): Promise<ApiResponse<RouteOption>> => {
    return apiClient.get<RouteOption>(`/routes/${routeId}`);
  },

  getRoutesByStation: async (stationId: string): Promise<ApiResponse<RouteOption[]>> => {
    return apiClient.get<RouteOption[]>(`/routes/station/${stationId}`);
  },
};

// Re-export types for convenience
export type { RouteSearchParams, RouteSearchResponse, RouteOption };