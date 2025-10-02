import { ApiResponse } from './common.types';

export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  PaymentPending = 2,
  PaymentFailed = 3,
  Cancelled = 4,
  Completed = 5,
  Expired = 6,
  Refunded = 7,
}

export enum PassengerType {
  Adult = 0,
  Child = 1,
  Senior = 2,
  Student = 3,
  Disabled = 4,
}

export enum SeatType {
  Standard = 0,
  Window = 1,
  Aisle = 2,
  WheelchairAccessible = 3,
  Reserved = 4,
}

export interface CreatePassengerRequest {
  firstName: string;
  lastName: string;
  passengerType: PassengerType;
  age?: number;
  gender?: string;
  preferredSeatType?: SeatType;
  identityType?: string;
  identityNumber?: string;
  contactPhone?: string;
  contactEmail?: string;
  specialRequests?: string;
  hasWheelchairAccess?: boolean;
  isPrimaryPassenger?: boolean;
}

export interface CreateBookingRequest {
  routeId: string;
  sourceStationId: string;
  destinationStationId: string;
  departureTime: string;
  contactEmail: string;
  contactPhone: string;
  passengers: CreatePassengerRequest[];
  specialRequests?: string;
  discountCode?: string;
  isRoundTrip?: boolean;
  returnDepartureTime?: string;
  preferredSeats?: string[];
  bookingSource?: string;
}

export interface PassengerResponse {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  passengerType: PassengerType;
  age?: number;
  gender?: string;
  seatNumber?: string;
  seatType?: SeatType;
  fare: number;
  discountAmount?: number;
  finalFare: number;
  ticketNumber?: string;
}

export interface RouteInfo {
  id: string;
  code: string;
  name: string;
  transportMode: string;
  distance: number;
  estimatedDuration: string;
  baseFare: number;
}

export interface StationInfo {
  id: string;
  code: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
}

export interface PaymentInfo {
  paymentId: string;
  paymentMethod: string;
  status: string;
  paidAt?: string;
  transactionId?: string;
}

export interface TicketInfo {
  ticketId: string;
  ticketNumber: string;
  qrCode?: string;
  generatedAt?: string;
  isUsed: boolean;
}

export interface BookingResponse {
  id: string;
  bookingNumber: string;
  userId: string;
  route: RouteInfo;
  sourceStation: StationInfo;
  destinationStation: StationInfo;
  departureTime: string;
  arrivalTime?: string;
  status: BookingStatus;
  passengerCount: number;
  totalFare: number;
  discountAmount?: number;
  taxAmount?: number;
  finalAmount: number;
  discountCode?: string;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
  confirmedAt?: string;
  cancelledAt?: string;
  bookingExpiresAt?: string;
  passengers: PassengerResponse[];
  payment?: PaymentInfo;
  ticket?: TicketInfo;
  createdAt: string;
}

export interface FareCalculationRequest {
  routeId: string;
  sourceStationId: string;
  destinationStationId: string;
  passengerTypes: PassengerType[];
  discountCode?: string;
  travelDate?: string;
}

export interface PassengerFare {
  passengerType: PassengerType;
  baseFare: number;
  discountAmount?: number;
  finalFare: number;
  discountReason?: string;
}

export interface FareBreakdown {
  distance: number;
  ratePerKm: number;
  baseFare: number;
  serviceTax: number;
  platformFee: number;
  convenienceFee: number;
  totalTax: number;
  grandTotal: number;
}

export interface FareCalculationResponse {
  baseFare: number;
  passengerFares: PassengerFare[];
  totalFare: number;
  discountAmount?: number;
  taxAmount?: number;
  finalAmount: number;
  currency: string;
  appliedDiscounts?: string[];
  breakdown: FareBreakdown;
}

export type BookingResponseApi = ApiResponse<BookingResponse>;
export type BookingListResponseApi = ApiResponse<BookingResponse[]>;
export type FareCalculationResponseApi = ApiResponse<FareCalculationResponse>;