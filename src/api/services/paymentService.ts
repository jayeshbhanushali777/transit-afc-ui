import apiClient from '../client';
import {
  CreatePaymentRequest,
  PaymentResponse,
  ProcessPaymentRequest,
  PaymentVerificationRequest,
  PaymentMethod,
} from '../../types/payment.types';
import { ApiResponse } from '../../types/api.types';

type PaymentResponseApi = ApiResponse<PaymentResponse>;
type PaymentMethodListApi = ApiResponse<PaymentMethod[]>;

export const paymentService = {
  createPayment: async (data: CreatePaymentRequest): Promise<PaymentResponseApi> => {
    const response = await apiClient.post<PaymentResponse>('/api/Payments', data);
    return response;
  },

  getPayment: async (paymentId: string): Promise<PaymentResponseApi> => {
    const response = await apiClient.get<PaymentResponse>(`/api/Payments/${paymentId}`);
    return response;
  },

  getPaymentByBooking: async (bookingId: string): Promise<PaymentResponseApi> => {
    const response = await apiClient.get<PaymentResponse>(`/api/Payments/booking/${bookingId}`);
    return response;
  },

  processPayment: async (data: ProcessPaymentRequest): Promise<PaymentResponseApi> => {
    const response = await apiClient.post<PaymentResponse>('/api/Payments/process', data);
    return response;
  },

  verifyPayment: async (data: PaymentVerificationRequest): Promise<PaymentResponseApi> => {
    const response = await apiClient.post<PaymentResponse>('/api/Payments/verify', data);
    return response;
  },

  getPaymentMethods: async (): Promise<PaymentMethodListApi> => {
    const response = await apiClient.get<PaymentMethod[]>('/api/Payments/methods');
    return response;
  },
};