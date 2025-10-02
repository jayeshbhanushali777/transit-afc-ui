import apiClient from '../client';
import { ApiResponse } from '../../types/api.types';
import { Station } from '../../types/station.types';

export const stationService = {
  getAllStations: async (): Promise<ApiResponse<Station[]>> => {
    return apiClient.get<Station[]>('/stations');
  },

  getStation: async (id: string): Promise<ApiResponse<Station>> => {
    return apiClient.get<Station>(`/stations/${id}`);
  },

  getStationByCode: async (code: string): Promise<ApiResponse<Station>> => {
    return apiClient.get<Station>(`/stations/code/${code}`);
  },

  searchStations: async (query: string): Promise<ApiResponse<Station[]>> => {
    return apiClient.get<Station[]>(`/stations/search?query=${query}`);
  },
};