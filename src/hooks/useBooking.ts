import { useBookingStore } from '../store/bookingStore';

export const useBooking = () => {
  const store = useBookingStore();
  return store;
};