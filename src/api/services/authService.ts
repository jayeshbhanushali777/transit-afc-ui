import apiClient from '../client';
import { ApiResponse } from '../../types/api.types';
import { 
  LoginRequest, 
  RegisterUserRequest, 
  LoginResponse 
} from '../../types/user.types';

export const authService = {
  login: async (request: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<LoginResponse>('/Users/login', request);
  },

  register: async (request: RegisterUserRequest): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/Users/register', request);
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/Users/logout', {});
  },

  refreshToken: async (): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<LoginResponse>('/Users/refresh', {});
  },

  verifyEmail: async (token: string): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/Users/verify-email', { token });
  },

  verifyPhone: async (code: string): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/Users/verify-phone', { code });
  },
};