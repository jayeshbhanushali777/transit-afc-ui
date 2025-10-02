export interface Station {
    id: string;
    name: string;
    code: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    facilities: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface StationSearchParams {
    query?: string;
    city?: string;
    state?: string;
    isActive?: boolean;
  }