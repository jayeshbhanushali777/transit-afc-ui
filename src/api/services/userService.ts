import apiClient from '../client';
import {
  RegisterUserRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
  UpdateUserRequest,
} from '../../types/user.types';
import { ApiResponse } from '../../types/api.types';

type LoginResponseApi = ApiResponse<LoginResponse>;
type UserResponseApi = ApiResponse<UserResponse>;

export const userService = {
  register: async (data: RegisterUserRequest): Promise<LoginResponseApi> => {
    const response = await apiClient.post<LoginResponse>('/api/Users/register', data);
    return response;
  },

  login: async (data: LoginRequest): Promise<LoginResponseApi> => {
    const response = await apiClient.post<LoginResponse>('/api/Users/login', data);
    return response;
  },

  getProfile: async (): Promise<UserResponseApi> => {
    const response = await apiClient.get<UserResponse>('/api/Users/profile');
    return response;
  },

  updateProfile: async (data: UpdateUserRequest): Promise<UserResponseApi> => {
    const response = await apiClient.put<UserResponse>('/api/Users/profile', data);
    return response;
  },

  deleteAccount: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<void>('/api/Users/profile');
    return response;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<void>('/api/Users/change-password', {
      currentPassword,
      newPassword,
    });
    return response;
  },
};