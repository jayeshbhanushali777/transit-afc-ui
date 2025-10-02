import { ApiResponse } from './common.types';

// Register Request
export interface RegisterUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// User Response
export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// Login Response
export interface LoginResponse {
  token: string;
  user: UserResponse;
  expiresAt: string;
}

// Update User Request
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

// API Response types
export type UserResponseApi = ApiResponse<UserResponse>;
export type LoginResponseApi = ApiResponse<LoginResponse>;