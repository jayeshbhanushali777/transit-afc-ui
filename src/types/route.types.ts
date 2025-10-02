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
  fromStationId: string;
  toStationId: string;
  departureDate: string;
  passengerCount: number;
  preferredMode?: string;
}

export interface RouteSearchResponse {
  routes: RouteOption[];
  totalCount: number;
}