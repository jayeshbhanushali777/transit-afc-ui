import { CreateTicketRequest, TicketType, TransportMode, FareType } from '../types/ticket.types';
import { BookingResponse, PassengerType } from '../types/booking.types';
import { RouteOption } from '../types/route.types';

/**
 * Generate ticket creation requests for all passengers in a booking
 */
export const generateTicketRequests = (
  booking: BookingResponse,
  paymentId: string,
  route: RouteOption
): CreateTicketRequest[] => {
  const tickets: CreateTicketRequest[] = [];

  // Determine ticket type based on booking
  const ticketType = TicketType.SingleJourney; // Default

  // Determine transport mode from route
  const transportMode = getTransportModeFromRoute(route);

  // Calculate validity period (24 hours from now for single journey)
  const validFrom = new Date().toISOString();
  const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  // Get source and destination from route
  const sourceStation = route.segments[0].startStation;
  const destinationStation = route.segments[route.segments.length - 1].endStation;

  // Create ticket for each passenger
  booking.passengers.forEach((passenger) => {
    const fareType = getFareTypeFromPassenger(passenger.passengerType);
    const passengerFare = passenger.finalFare; // You might want to calculate individual fares

    const ticketRequest: CreateTicketRequest = {
      bookingId: booking.id,
      paymentId: paymentId,
      bookingNumber: booking.bookingNumber,
      type: ticketType,
      transportMode: transportMode,
      fareType: fareType,
      sourceStationId: sourceStation.id,
      sourceStationName: sourceStation.name,
      sourceStationCode: sourceStation.code,
      destinationStationId: destinationStation.id,
      destinationStationName: destinationStation.name,
      destinationStationCode: destinationStation.code,
      routeId: route.routeId,
      routeName: route.segments[0]?.routeName,
      routeCode: route.segments[0]?.routeCode,
      basePrice: passengerFare,
      discountAmount: 0,
      taxAmount: 0,
      finalPrice: passengerFare,
      currency: 'INR',
      validFrom: validFrom,
      validUntil: validUntil,
      maxUsageCount: 1,
      passengerName: `${passenger.firstName} ${passenger.lastName}`,
      passengerAge: passenger.age?.toString(),
      passengerType: passenger.passengerType.toString(),
      passengerPhone: booking.contactPhone,
      passengerEmail: booking.contactEmail,
      allowsTransfer: route.transferCount > 0,
      maxTransfers: route.transferCount,
      transferTimeLimit: 120, // 2 hours in minutes
    };

    tickets.push(ticketRequest);
  });

  return tickets;
};

/**
 * Get transport mode from route segments
 */
const getTransportModeFromRoute = (route: RouteOption): TransportMode => {
  const firstSegment = route.segments[0];
  if (!firstSegment) return TransportMode.Bus;

  const modeMap: Record<string, TransportMode> = {
    'Bus': TransportMode.Bus,
    'Metro': TransportMode.Metro,
    'Train': TransportMode.Train,
    'Tram': TransportMode.Tram,
    'Ferry': TransportMode.Ferry,
  };

  return modeMap[firstSegment.transportMode] || TransportMode.Bus;
};

/**
 * Get fare type from passenger type
 */
const getFareTypeFromPassenger = (passenger: PassengerType): FareType => {
  const typeMap: Record<string, FareType> = {
    'Adult': FareType.Regular,
    'Child': FareType.Concession,
    'Senior': FareType.SeniorCitizen,
    'Student': FareType.Student,
    'Disabled': FareType.Disabled,
  };

  return typeMap[passenger] || FareType.Regular;
};