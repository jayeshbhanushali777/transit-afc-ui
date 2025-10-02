export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7000';

export const PASSENGER_TYPES = {
  ADULT: 0,
  CHILD: 1,
  SENIOR: 2,
  STUDENT: 3,
  DISABLED: 4,
} as const;

export const PAYMENT_METHODS = {
  UPI: 0,
  CARD: 1,
  NET_BANKING: 2,
  WALLET: 3,
} as const;

export const TICKET_STATUS = {
  ACTIVE: 0,
  USED: 1,
  EXPIRED: 2,
  CANCELLED: 3,
} as const;