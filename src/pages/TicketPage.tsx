import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ticketService } from '../api/services/ticketService';
import { TicketResponse } from '../types/ticket.types';
import { TicketDisplay } from '../components/ticket/TicketDisplay';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { toast } from 'react-toastify';

export const TicketPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ticketId) {
      loadTicket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const loadTicket = async () => {
    if (!ticketId) return;

    setIsLoading(true);
    try {
      const response = await ticketService.getTicket(ticketId);
      if (response.isSuccess && response.data) {
        setTicket(response.data);
      } else {
        toast.error('Ticket not found');
        navigate('/my-tickets');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to load ticket');
      navigate('/my-tickets');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <Loading text="Loading ticket..." />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <Card className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to find the ticket details</p>
          <Button onClick={() => navigate('/my-tickets')}>View My Tickets</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/my-tickets')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Tickets
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Travel Ticket 🎫
          </h1>
          <p className="text-gray-600 text-lg">
            Ticket #{ticket.ticketNumber}
          </p>
        </div>

        <TicketDisplay ticket={ticket} />
      </div>
    </div>
  );
};