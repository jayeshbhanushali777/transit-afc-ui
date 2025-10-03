import { ApiResponse } from './common.types';

export enum TicketStatus {
  Draft = 0,
  Generated = 1,
  Active = 2,
  Used = 3,
  Expired = 4,
  Cancelled = 5,
  Refunded = 6,
  Suspended = 7,
  Invalid = 8
}

export enum TicketType {
  SingleJourney = 0,
  Return = 1,
  DayPass = 2,
  WeeklyPass = 3,
  MonthlyPass = 4,
  Annual = 5,
  Student = 6,
  Senior = 7,
  Disabled = 8,
  Group = 9,
  Tourist = 10
}

export enum TransportMode {
  Bus = 0,
  Metro = 1,
  Train = 2,
  Tram = 3,
  Ferry = 4,
  Other = 5,
}

export enum FareType {
  Regular = 0,
  Concession = 1,
  Premium = 2,
  Group = 3,
  Tourist = 4,
  Corporate = 5,
  Student = 6,
  SeniorCitizen = 7,
  Disabled = 8,
}

export interface CreateTicketRequest {
  bookingId: string; // UUID
  paymentId: string; // UUID
  bookingNumber: string;
  type: TicketType;
  transportMode: TransportMode;
  fareType?: FareType;
  sourceStationId: string; // UUID
  sourceStationName: string;
  sourceStationCode: string;
  destinationStationId: string; // UUID
  destinationStationName: string;
  destinationStationCode: string;
  routeId: string; // UUID
  routeName?: string;
  routeCode?: string;
  basePrice: number;
  discountAmount?: number;
  taxAmount?: number;
  finalPrice: number;
  currency?: string;
  validFrom: string; // ISO datetime
  validUntil: string; // ISO datetime
  maxUsageCount?: number;
  passengerName: string;
  passengerAge?: string;
  passengerType?: string;
  passengerPhone?: string;
  passengerEmail?: string;
  allowsTransfer?: boolean;
  maxTransfers?: number;
  transferTimeLimit?: number;
  serviceClass?: string;
  seatNumber?: string;
  coachNumber?: string;
  specialInstructions?: string;
  metadata?: Record<string, any>;
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
  qrCodeId?: string;
  qrCodeImage?: string; // Base64 byte array
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
  validationId?: string;
  validationType: number;
  validationResult: number;
  validationTime: string;
  stationId: string;
  stationName?: string;
  stationCode?: string;
  deviceId: string;
  deviceName?: string;
  deviceType?: string;
  operatorId?: string;
  operatorName?: string;
  validationMethod?: string;
  validationError?: string;
  isSuccessful: boolean;
  fareDeducted?: number;
  vehicleNumber?: string;
  routeNumber?: string;
}

export interface TicketResponse {
  id: string; // UUID
  ticketNumber?: string;
  userId: string;
  bookingId: string;
  paymentId: string;
  bookingNumber?: string;
  status: TicketStatus;
  type: TicketType;
  transportMode: TransportMode;
  fareType: FareType;
  sourceStationId: string;
  sourceStationName?: string;
  sourceStationCode?: string;
  destinationStationId: string;
  destinationStationName?: string;
  destinationStationCode?: string;
  routeId: string;
  routeName?: string;
  routeCode?: string;
  basePrice: number;
  discountAmount?: number;
  taxAmount?: number;
  finalPrice: number;
  currency?: string;
  validFrom: string;
  validUntil: string;
  firstUsedAt?: string;
  lastUsedAt?: string;
  maxUsageCount: number;
  usageCount: number;
  estimatedDuration: number;
  estimatedDistance: number;
  passengerName?: string;
  passengerAge?: string;
  passengerType?: string;
  passengerPhone?: string;
  passengerEmail?: string;
  qrCodeData?: string;
  qrCodeImage?: string; // Base64
  allowsTransfer: boolean;
  maxTransfers: number;
  transferCount: number;
  transferTimeLimit?: number;
  serviceClass?: string;
  seatNumber?: string;
  coachNumber?: string;
  specialInstructions?: string;
  isRefundable: boolean;
  createdAt: string;
  updatedAt?: string;
  validations?: TicketValidationResponse[];
  qrCodes?: TicketQRCodeResponse[];
  transfers?: any[];
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

export interface TicketValidationRequest {
  qrCodeData: string;
  stationId: string;
  stationName: string;
  stationCode: string;
  deviceId: string;
  deviceName: string;
  deviceType?: string;
  operatorId?: string;
  operatorName?: string;
  validationType: number;
  validationMethod?: string;
  latitude?: number;
  longitude?: number;
  direction?: string;
  platform?: string;
  gate?: string;
  tripId?: string;
  vehicleNumber?: string;
  routeNumber?: string;
}

export interface TicketValidationResult {
  isValid: boolean;
  result: number;
  message?: string;
  ticketId?: string;
  ticketNumber?: string;
  ticketStatus: TicketStatus;
  ticketType: TicketType;
  passengerName?: string;
  validUntil?: string;
  remainingUsage?: number;
  fareDeducted?: number;
  balanceAfter?: number;
  allowsTransfer: boolean;
  transfersRemaining?: number;
  additionalInfo?: string;
  validationTime: string;
  validationId: string;
}

export type TicketResponseApi = ApiResponse<TicketResponse>;
export type TicketListResponseApi = ApiResponse<TicketResponse[]>;
export type TicketValidationResultApi = ApiResponse<TicketValidationResult>;