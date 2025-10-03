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
  // Create new payment
  createPayment: async (data: CreatePaymentRequest): Promise<PaymentResponseApi> => {
    const response = await apiClient.post<PaymentResponse>('/Payments', data);
    return response;
  },

  // Get payment by ID (UUID)
  getPayment: async (paymentId: string): Promise<PaymentResponseApi> => {
    const response = await apiClient.get<PaymentResponse>(`/Payments/${paymentId}`);
    return response;
  },

  // Get payment by payment ID string
  getPaymentByPaymentId: async (paymentId: string): Promise<PaymentResponseApi> => {
    const response = await apiClient.get<PaymentResponse>(`/Payments/payment-id/${paymentId}`);
    return response;
  },

  // Get payment by booking ID
  getPaymentByBooking: async (bookingId: string): Promise<PaymentResponseApi> => {
    const response = await apiClient.get<PaymentResponse>(`/Payments/booking/${bookingId}`);
    return response;
  },

  // Get my payments
  getMyPayments: async (skip: number = 0, take: number = 100): Promise<ApiResponse<PaymentResponse[]>> => {
    const response = await apiClient.get<PaymentResponse[]>('/Payments/my-payments', {
      params: { skip, take },
    });
    return response;
  },

  // Process payment (mark as completed)
  processPayment: async (data: ProcessPaymentRequest): Promise<PaymentResponseApi> => {
    const response = await apiClient.post<PaymentResponse>('/Payments/process', data);
    return response;
  },

  // Verify payment
  verifyPayment: async (data: PaymentVerificationRequest): Promise<PaymentResponseApi> => {
    const response = await apiClient.post<PaymentResponse>('/Payments/verify', data);
    return response;
  },

  // Get available payment methods
  getPaymentMethods: async (): Promise<PaymentMethodListApi> => {
    const response = await apiClient.get<PaymentMethod[]>('/Payments/methods');
    return response;
  },

  // Calculate payment fee
  calculateFee: async (amount: number, method: PaymentMethod, gateway: number): Promise<ApiResponse<number>> => {
    const response = await apiClient.post<number>('/Payments/calculate-fee', {
      amount,
      method,
      gateway,
    });
    return response;
  },
};