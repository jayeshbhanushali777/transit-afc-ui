import { ApiResponse } from './common.types';

export enum TicketStatus {
  Active = 0,
  Used = 1,
  Expired = 2,
  Cancelled = 3,
  Refunded = 4,
  Suspended = 5,
  Lost = 6,
  Transferred = 7,
  PartiallyUsed = 8,
}

export enum TicketType {
  SingleJourney = 0,
  Return = 1,
  DayPass = 2,
  WeeklyPass = 3,
  MonthlyPass = 4,
  QuarterlyPass = 5,
  AnnualPass = 6,
  GroupTicket = 7,
  StudentPass = 8,
  SeniorPass = 9,
  Tourist = 10,
}

export enum TicketValidationType {
  Entry = 0,
  Exit = 1,
  Transfer = 2,
  Inspection = 3,
}

export enum ValidationResult {
  Valid = 0,
  Invalid = 1,
  Expired = 2,
  AlreadyUsed = 3,
  NotYetValid = 4,
  Cancelled = 5,
  WrongStation = 6,
  WrongRoute = 7,
  InsufficientBalance = 8,
  Fraudulent = 9,
}

export interface TicketQRCodeResponse {
  id: string;
  qrCodeId: string;
  qrCodeImage: string; // Base64 image
  status: number;
  generatedAt: string;
  expiresAt: string;
  usedAt?: string;
  scanCount: number;
  lastScannedAt?: string;
  displayText?: string;
  instructions?: string;
}

export interface TicketValidationResponse {
  id: string;
  validationId: string;
  validationType: TicketValidationType;
  validationResult: ValidationResult;
  validationTime: string;
  stationId: string;
  stationName: string;
  stationCode: string;
  deviceId: string;
  deviceName: string;
  isSuccessful: boolean;
  fareDeducted?: number;
  validationError?: string;
}

export interface TicketResponse {
  id: string;
  ticketNumber: string;
  userId: string;
  bookingId: string;
  paymentId: string;
  bookingNumber: string;
  status: TicketStatus;
  type: TicketType;
  transportMode: number;
  sourceStationId: string;
  sourceStationName: string;
  sourceStationCode: string;
  destinationStationId: string;
  destinationStationName: string;
  destinationStationCode: string;
  routeId: string;
  routeName: string;
  routeCode: string;
  basePrice: number;
  discountAmount?: number;
  taxAmount?: number;
  finalPrice: number;
  currency: string;
  validFrom: string;
  validUntil: string;
  firstUsedAt?: string;
  lastUsedAt?: string;
  maxUsageCount: number;
  usageCount: number;
  passengerName: string;
  passengerAge?: string;
  passengerType?: string;
  passengerPhone?: string;
  passengerEmail?: string;
  qrCodeData?: string;
  qrCodeImage?: string; // Base64
  allowsTransfer: boolean;
  maxTransfers: number;
  transferCount: number;
  seatNumber?: string;
  coachNumber?: string;
  specialInstructions?: string;
  isRefundable: boolean;
  createdAt: string;
  updatedAt?: string;
  validations?: TicketValidationResponse[];
  qrCodes?: TicketQRCodeResponse[];
}

export interface ValidateTicketRequest {
  qrCodeData: string;
  stationId: string;
  stationName: string;
  stationCode: string;
  deviceId: string;
  deviceName: string;
  deviceType?: string;
  operatorId?: string;
  operatorName?: string;
  validationType: TicketValidationType;
  validationMethod?: string;
  latitude?: number;
  longitude?: number;
}

export interface TicketValidationResult {
  isValid: boolean;
  result: ValidationResult;
  message: string;
  ticketId?: string;
  ticketNumber?: string;
  ticketStatus?: TicketStatus;
  ticketType?: TicketType;
  passengerName?: string;
  validUntil?: string;
  remainingUsage?: number;
  fareDeducted?: number;
  allowsTransfer: boolean;
  transfersRemaining?: number;
  validationTime: string;
  validationId: string;
}

export type TicketResponseApi = ApiResponse<TicketResponse>;
export type TicketListResponseApi = ApiResponse<TicketResponse[]>;
export type TicketValidationResultApi = ApiResponse<TicketValidationResult>;