import { Station } from './station.types';

export enum RouteType {
  Direct = 'Direct',
  Transfer = 'Transfer',
  Multiple = 'Multiple',
}

export interface RouteSegment {
  routeId: string;
  routeName: string;
  routeCode: string;
  startStation: Station;
  endStation: Station;
  departureTime: string;
  arrivalTime: string;
  distance: number;
  duration: string;                    // Format: "00:25:00"
  transportMode: string;               // Bus, Metro, Train, etc.
  fare: number;
  isWalkingSegment: boolean;
  color?: string;                      // Route line color
  vehicleNumber?: string;
  intermediateStations: Station[];
}

export interface RouteOption {
  routeId: string;
  routeType: RouteType;                // Direct, Transfer, Multiple
  segments: RouteSegment[];
  departureTime: string;
  arrivalTime: string;
  totalDistance: number;
  totalDuration: string;               // Format: "00:25:00"
  totalFare: number;
  transferCount: number;
  isAccessible: boolean;
  comfortScore?: number;               // 1-5 rating
  polyline?: string | null;            // Map polyline data
}

export interface RouteSearchParams {
  Source: string;
  Destination: string;
  DepartureTime?: string;
  TransportMode?: string;
  IncludeAccessibility?: boolean;
  PreferFastest?: boolean;
  MaxTransfers?: number;
  Language?: string;
}

export interface RouteSearchResponse {
  routes: RouteOption[];
  totalCount: number;
}