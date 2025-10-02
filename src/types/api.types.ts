export interface ApiResponse<T = any> {
    isSuccess: boolean;
    message: string;
    data?: T;
    errors?: string[];
    statusCode?: number;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  
  export interface ApiError {
    message: string;
    errors?: ValidationError[];
    statusCode: number;
  }