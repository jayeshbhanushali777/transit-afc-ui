// Common API Response wrapper
export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string | null;
    data: T | null;
    errors: string[] | null;
    timestamp: string;
  }
  
  // Pagination
  export interface PaginationParams {
    skip?: number;
    take?: number;
  }
  
  // Transport Modes
  export enum TransportMode {
    Bus = 0,
    Metro = 1,
    Train = 2,
    Tram = 3,
    Ferry = 4,
    All = 5
  }
  
  // Generic Error
  export interface ApiError {
    message: string;
    errors?: string[];
  }