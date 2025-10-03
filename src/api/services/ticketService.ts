import apiClient from '../client';
import {
  TicketResponse,
  TicketValidationResult,
} from '../../types/ticket.types';
import { ApiResponse } from '../../types/api.types';

type TicketResponseApi = ApiResponse<TicketResponse>;
type TicketListResponseApi = ApiResponse<TicketResponse[]>;
type TicketValidationResultApi = ApiResponse<TicketValidationResult>;

export const ticketService = {
  getTicket: async (ticketId: string): Promise<TicketResponseApi> => {
    const response = await apiClient.get<TicketResponse>(`/Tickets/${ticketId}`);
    return response;
  },

  getTicketByNumber: async (ticketNumber: string): Promise<TicketResponseApi> => {
    const response = await apiClient.get<TicketResponse>(`/Tickets/number/${ticketNumber}`);
    return response;
  },

  getTicketByBooking: async (bookingId: string): Promise<TicketResponseApi> => {
    const response = await apiClient.get<TicketResponse>(`/Tickets/booking/${bookingId}`);
    return response;
  },

  getMyTickets: async (skip: number = 0, take: number = 10): Promise<TicketListResponseApi> => {
    const response = await apiClient.get<TicketResponse[]>('/Tickets/my-tickets', {
      params: { skip, take },
    });
    return response;
  },

  // validateTicket: async (
  //   data: TicketValidationRequest
  // ): Promise<TicketValidationResultApi> => {
  //   const response = await apiClient.post<TicketValidationResult>(
  //     '/api/Tickets/validate',
  //     data
  //   );
  //   return response;
  // },

  activateTicket: async (ticketId: string): Promise<TicketResponseApi> => {
    const response = await apiClient.post<TicketResponse>(`/Tickets/${ticketId}/activate`);
    return response;
  },

  cancelTicket: async (ticketId: string, reason?: string): Promise<TicketResponseApi> => {
    const response = await apiClient.post<TicketResponse>(`/Tickets/${ticketId}/cancel`, {
      reason,
    });
    return response;
  },
};