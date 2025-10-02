import apiClient from '../client';
import {
  CreateBookingRequest,
  BookingResponse,
  FareCalculationRequest,
  FareCalculationResponse,
} from '../../types/booking.types';
import { ApiResponse } from '../../types/api.types';

type BookingResponseApi = ApiResponse<BookingResponse>;
type BookingListResponseApi = ApiResponse<BookingResponse[]>;
type FareCalculationResponseApi = ApiResponse<FareCalculationResponse>;

export const bookingService = {
  createBooking: async (data: CreateBookingRequest): Promise<BookingResponseApi> => {
    const response = await apiClient.post<BookingResponse>('/Bookings', data);
    return response;
  },

  getBooking: async (bookingId: string): Promise<BookingResponseApi> => {
    const response = await apiClient.get<BookingResponse>(`/Bookings/${bookingId}`);
    return response;
  },

  getMyBookings: async (skip: number = 0, take: number = 10): Promise<BookingListResponseApi> => {
    const response = await apiClient.get<BookingResponse[]>('/Bookings/my', {
      params: { skip, take },
    });
    return response;
  },

  calculateFare: async (
    data: FareCalculationRequest
  ): Promise<FareCalculationResponseApi> => {
    const response = await apiClient.post<FareCalculationResponse>(
      '/Bookings/calculate-fare',
      data
    );
    return response;
  },

  confirmBooking: async (
    bookingId: string,
    paymentId: string
  ): Promise<BookingResponseApi> => {
    const response = await apiClient.post<BookingResponse>(
      `/Bookings/${bookingId}/confirm`,
      { paymentId }
    );
    return response;
  },

  cancelBooking: async (bookingId: string, reason?: string): Promise<BookingResponseApi> => {
    const response = await apiClient.post<BookingResponse>(
      `/Bookings/${bookingId}/cancel`,
      { reason }
    );
    return response;
  },
};