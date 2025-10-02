import { ApiResponse } from './common.types';

export enum PaymentMethod {
  UPI = 0,
  Card = 1,
  NetBanking = 2,
  Wallet = 3,
  Cash = 4,
  EMI = 5,
  PayLater = 6,
  BankTransfer = 7,
  Other = 8,
}

export enum PaymentGateway {
  None = 0,
  Razorpay = 1,
  Stripe = 2,
  PayTM = 3,
  PhonePe = 4,
  GooglePay = 5,
  PayU = 6,
  CCAvenue = 7,
  Instamojo = 8,
  Custom = 9,
}

export enum PaymentStatus {
  Pending = 0,
  Initiated = 1,
  Processing = 2,
  Success = 3,
  Failed = 4,
  Cancelled = 5,
  Refunded = 6,
  PartiallyRefunded = 7,
  Expired = 8,
  OnHold = 9,
}

export interface CreatePaymentRequest {
  bookingId: string;
  bookingNumber: string;
  amount: number;
  method: PaymentMethod;
  preferredGateway?: PaymentGateway;
  customerEmail: string;
  customerPhone: string;
  customerName?: string;
  upiId?: string;
  currency?: string;
  notes?: string;
  metadata?: Record<string, any>;
  successUrl?: string;
  failureUrl?: string;
  cancelUrl?: string;
}

export interface PaymentGatewayInfo {
  checkoutUrl?: string;
  paymentToken?: string;
  orderId?: string;
  additionalData?: Record<string, any>;
}

export interface PaymentResponse {
  id: string;
  paymentId: string;
  userId: string;
  bookingId: string;
  bookingNumber: string;
  status: PaymentStatus;
  method: PaymentMethod;
  gateway: PaymentGateway;
  amount: number;
  currency: string;
  taxAmount?: number;
  serviceFee?: number;
  gatewayFee?: number;
  discountAmount?: number;
  totalAmount: number;
  gatewayPaymentId?: string;
  transactionId?: string;
  upiId?: string;
  customerEmail: string;
  customerPhone: string;
  customerName?: string;
  paymentInitiatedAt?: string;
  paymentCompletedAt?: string;
  expiresAt?: string;
  failureCode?: string;
  failureReason?: string;
  isRefundable: boolean;
  createdAt: string;
  gatewayInfo?: PaymentGatewayInfo;
}

export interface ProcessPaymentRequest {
  paymentId: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  transactionId?: string;
  gatewayResponse?: Record<string, any>;
}

export interface PaymentVerificationRequest {
  paymentId: string;
  gatewayPaymentId: string;
  gatewayOrderId?: string;
  gatewaySignature?: string;
}

export type PaymentResponseApi = ApiResponse<PaymentResponse>;
export type PaymentMethodListApi = ApiResponse<PaymentMethod[]>;