import { Station } from './station.types';

export interface RouteSegment {
  segmentId: string;
  startStation: Station;
  endStation: Station;
  departureTime: string;
  arrivalTime: string;
  distance: number;
  duration: number;
  transportMode: string;
  routeNumber: string;
  routeName: string;
  routeCode: string;
}

export interface RouteOption {
  routeId: string;
  routeName: string;
  routeCode: string;
  segments: RouteSegment[];
  totalDistance: number;
  totalDuration: number;
  totalFare: number;
  departureTime: string;
  arrivalTime: string;
  transferCount: number;
  isAccessible?: boolean;
}

export interface RouteSearchParams {
  Source: string;                    // Source station ID or code
  Destination: string;                // Destination station ID or code
  DepartureTime?: string;            // ISO datetime string
  TransportMode?: string;            // Optional transport mode filter
  IncludeAccessibility?: boolean;    // Include accessibility info
  PreferFastest?: boolean;           // Prefer fastest routes
  MaxTransfers?: number;             // Maximum number of transfers
  Language?: string;                 // Language for responses
}

export interface RouteSearchResponse {
  routes: RouteOption[];
  totalCount: number;
}