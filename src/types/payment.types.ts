import { ApiResponse } from './common.types';

export enum PaymentMethod {
  UPI = 0,
  CreditCard = 1,
  DebitCard = 2,
  NetBanking = 3,
  Wallet = 4,
  Cash = 5,
  BankTransfer = 6,
  EMI = 7,
  PayLater = 8
}

export interface PaymentVerificationRequest {
  paymentId: string;
  gatewayPaymentId: string;
  gatewayOrderId?: string;
  gatewaySignature?: string;
}

export enum PaymentGateway {
  Razorpay = 0,
  Stripe = 1,
  PayU = 2,
  CCAvenue = 3,
  Paytm = 4,
  PhonePe = 5,
  GooglePay = 6,
  BHIM = 7,
  AmazonPay = 8,
  Internal = 9
}

export enum PaymentStatus {
    Pending = 0,
    Processing = 1,
    Completed = 2,
    Failed = 3,
    Cancelled = 4,
    Refunded = 5,
    PartiallyRefunded = 6,
    Expired = 7,
    OnHold = 8,
    Disputed = 9,
}

export enum PaymentMode {
  Online = 0,
  Offline = 1,
  PointOfSale = 2,
  Recurring = 3,
  Installment = 4,
}

export interface CreatePaymentRequest {
  bookingId: string; // UUID
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
  isRecurring?: boolean;
  totalInstallments?: number;
  successUrl?: string;
  failureUrl?: string;
  cancelUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceFingerprint?: string;
}

export interface PaymentGatewayInfo {
  checkoutUrl?: string;
  paymentToken?: string;
  orderId?: string;
  additionalData?: Record<string, any>;
}

export interface PaymentResponse {
  id: string; // UUID
  paymentId?: string;
  userId: string;
  bookingId: string;
  bookingNumber?: string;
  status: PaymentStatus;
  method: PaymentMethod;
  gateway: PaymentGateway;
  mode: PaymentMode;
  amount: number;
  currency?: string;
  taxAmount?: number;
  serviceFee?: number;
  gatewayFee?: number;
  discountAmount?: number;
  totalAmount: number;
  gatewayPaymentId?: string;
  transactionId?: string;
  upiId?: string;
  cardLast4Digits?: string;
  cardType?: string;
  walletType?: string;
  paymentInitiatedAt?: string;
  paymentCompletedAt?: string;
  expiresAt?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  failureCode?: string;
  failureReason?: string;
  isRefundable: boolean;
  refundedAmount: number;
  refundCount: number;
  createdAt: string;
  transactions?: PaymentTransactionResponse[];
  refunds?: any[];
  gatewayInfo?: PaymentGatewayInfo;
}

export interface PaymentTransactionResponse {
  id: string;
  transactionId?: string;
  type: number; // TransactionType enum
  amount: number;
  currency?: string;
  status: PaymentStatus;
  gatewayTransactionId?: string;
  responseCode?: string;
  responseMessage?: string;
  processedAt: string;
  isReconciled: boolean;
  settledAt?: string;
}

export interface ProcessPaymentRequest {
  paymentId: string; // String, not UUID in path
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  transactionId?: string;
  gatewayResponse?: Record<string, any>;
}

export interface PaymentGatewayInfo {
  checkoutUrl?: string;
  paymentToken?: string;
  orderId?: string;
  additionalData?: Record<string, any>;
}

export type PaymentResponseApi = ApiResponse<PaymentResponse>;
export type PaymentMethodListApi = ApiResponse<PaymentMethod[]>;