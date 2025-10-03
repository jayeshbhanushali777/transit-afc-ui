import apiClient from '../client';
import {
  CreateTicketRequest,
  TicketResponse,
  TicketValidationRequest,
  TicketValidationResult,
} from '../../types/ticket.types';
import { ApiResponse } from '../../types/api.types';

type TicketResponseApi = ApiResponse<TicketResponse>;
type TicketListResponseApi = ApiResponse<TicketResponse[]>;
type TicketValidationResultApi = ApiResponse<TicketValidationResult>;

export const ticketService = {
  // Create a new ticket
  createTicket: async (data: CreateTicketRequest): Promise<TicketResponseApi> => {
    const response = await apiClient.post<TicketResponse>('/Tickets', data);
    return response;
  },

  // Get ticket by ID
  getTicket: async (ticketId: string): Promise<TicketResponseApi> => {
    const response = await apiClient.get<TicketResponse>(`/Tickets/${ticketId}`);
    return response;
  },

  // Get ticket by number
  getTicketByNumber: async (ticketNumber: string): Promise<TicketResponseApi> => {
    const response = await apiClient.get<TicketResponse>(`/Tickets/number/${ticketNumber}`);
    return response;
  },

  // Get ticket by booking ID
  getTicketByBooking: async (bookingId: string): Promise<TicketResponseApi> => {
    const response = await apiClient.get<TicketResponse>(`/Tickets/booking/${bookingId}`);
    return response;
  },

  // Get my tickets
  getMyTickets: async (skip: number = 0, take: number = 100): Promise<TicketListResponseApi> => {
    const response = await apiClient.get<TicketResponse[]>('/Tickets/my-tickets', {
      params: { skip, take },
    });
    return response;
  },

  // Validate ticket
  validateTicket: async (
    data: TicketValidationRequest
  ): Promise<TicketValidationResultApi> => {
    const response = await apiClient.post<TicketValidationResult>(
      '/Validation/validate',
      data
    );
    return response;
  },

  // Activate ticket
  activateTicket: async (ticketId: string): Promise<TicketResponseApi> => {
    const response = await apiClient.post<TicketResponse>(`/Tickets/${ticketId}/activate`);
    return response;
  },

  // Cancel ticket
  cancelTicket: async (ticketId: string, reason?: string): Promise<TicketResponseApi> => {
    const response = await apiClient.post<TicketResponse>(`/Tickets/${ticketId}/cancel`, {
      reason: reason || 'User requested cancellation',
      requestRefund: true,
    });
    return response;
  },

  // Get QR code image
  getTicketQRCode: async (ticketId: string): Promise<Blob> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:7000'}/api/Tickets/${ticketId}/qr-code`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.blob();
  },
};