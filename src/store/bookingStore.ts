import { create } from 'zustand';
import { RouteOption } from '../types/route.types';
import { BookingResponse, CreatePassengerRequest } from '../types/booking.types';

interface BookingState {
  selectedRoute: RouteOption | null;
  currentBooking: BookingResponse | null;
  passengers: CreatePassengerRequest[];
  contactEmail: string;
  contactPhone: string;
  specialRequests: string;
  discountCode: string;
  
  // Actions
  setSelectedRoute: (route: RouteOption | null) => void;
  setCurrentBooking: (booking: BookingResponse | null) => void;
  setPassengers: (passengers: CreatePassengerRequest[]) => void;
  addPassenger: (passenger: CreatePassengerRequest) => void;
  removePassenger: (index: number) => void;
  setContactInfo: (email: string, phone: string) => void;
  setSpecialRequests: (requests: string) => void;
  setDiscountCode: (code: string) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: null,
  selectedRoute: null,
  passengers: [],
  contactEmail: '',
  contactPhone: '',
  specialRequests: '',
  discountCode: '',

  setSelectedRoute: (route) => set({ selectedRoute: route }),
  
  setPassengers: (passengers) => set({ passengers }),

  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  
  addPassenger: (passenger) =>
    set((state) => ({ passengers: [...state.passengers, passenger] })),
  
  removePassenger: (index) =>
    set((state) => ({
      passengers: state.passengers.filter((_, i) => i !== index),
    })),
  
  setContactInfo: (email, phone) =>
    set({ contactEmail: email, contactPhone: phone }),
  
  setSpecialRequests: (requests) => set({ specialRequests: requests }),
  
  setDiscountCode: (code) => set({ discountCode: code }),
  
  clearBooking: () =>
    set({
      selectedRoute: null,
      passengers: [],
      contactEmail: '',
      contactPhone: '',
      specialRequests: '',
      discountCode: '',
    }),
}));