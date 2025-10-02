import { useState } from 'react';
import { ticketService } from '../api/services/ticketService';
import { TicketResponse } from '../types/ticket.types';

export const useTicket = (ticketId?: string) => {
  const [ticket, setTicket] = useState<TicketResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTicket = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await ticketService.getTicket(id);
      if (response.isSuccess && response.data) {
        setTicket(response.data);
      }
    } catch (error) {
      console.error('Failed to load ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { ticket, isLoading, loadTicket };
};