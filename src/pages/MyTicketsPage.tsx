import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../api/services/ticketService';
import { TicketResponse, TicketStatus } from '../types/ticket.types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { toast } from 'react-toastify';

export const MyTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const response = await ticketService.getMyTickets();
      if (response.isSuccess && response.data) {
        setTickets(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to load tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Active:
        return { bg: 'from-green-500 to-green-700', badge: 'bg-green-100 text-green-700' };
      case TicketStatus.Used:
        return { bg: 'from-gray-500 to-gray-700', badge: 'bg-gray-100 text-gray-700' };
      case TicketStatus.Expired:
        return { bg: 'from-red-500 to-red-700', badge: 'bg-red-100 text-red-700' };
      case TicketStatus.Cancelled:
        return { bg: 'from-orange-500 to-orange-700', badge: 'bg-orange-100 text-orange-700' };
      default:
        return { bg: 'from-gray-500 to-gray-700', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  const getStatusLabel = (status: TicketStatus) => {
    const labels: Record<TicketStatus, string> = {
      [TicketStatus.Active]: 'Active',
      [TicketStatus.Used]: 'Used',
      [TicketStatus.Expired]: 'Expired',
      [TicketStatus.Cancelled]: 'Cancelled',
      [TicketStatus.Refunded]: 'Refunded',
      [TicketStatus.Suspended]: 'Suspended',
      [TicketStatus.Lost]: 'Lost',
      [TicketStatus.Transferred]: 'Transferred',
      [TicketStatus.PartiallyUsed]: 'Partially Used',
    };
    return labels[status];
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    if (filter === 'active') return ticket.status === TicketStatus.Active;
    if (filter === 'used') return ticket.status === TicketStatus.Used;
    if (filter === 'expired') return ticket.status === TicketStatus.Expired;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <Loading text="Loading tickets..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            My Tickets 🎫
          </h1>
          <p className="text-gray-600 text-lg">
            View and manage all your travel tickets
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-up">
          {[
            { value: 'all', label: 'All Tickets', count: tickets.length },
            { value: 'active', label: 'Active', count: tickets.filter(t => t.status === TicketStatus.Active).length },
            { value: 'used', label: 'Used', count: tickets.filter(t => t.status === TicketStatus.Used).length },
            { value: 'expired', label: 'Expired', count: tickets.filter(t => t.status === TicketStatus.Expired).length },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value as any)}
              className={`
                px-5 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105
                ${filter === btn.value
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                }
              `}
            >
              {btn.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === btn.value ? 'bg-white bg-opacity-20' : 'bg-gray-100'}`}>
                {btn.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <Card className="text-center py-16 animate-scale-in">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">No Tickets Found</h3>
            <p className="text-gray-600 text-lg mb-6">
              You don't have any {filter !== 'all' ? filter : ''} tickets yet
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/search')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Book Your First Ticket
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTickets.map((ticket, index) => {
              const colors = getStatusColor(ticket.status);
              return (
                <Card
                  key={ticket.id}
                  hoverable
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  className="cursor-pointer relative overflow-hidden group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Status Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${colors.bg}`}></div>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 pt-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                          {getStatusLabel(ticket.status)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          #{ticket.ticketNumber}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {ticket.sourceStationName} → {ticket.destinationStationName}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {ticket.sourceStationCode}
                          </div>
                          <div className="text-xs text-gray-500">Origin</div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-red-500"></div>
                        <svg className="w-5 h-5 text-primary-600 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-red-500"></div>
                      </div>

                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {ticket.destinationStationCode}
                          </div>
                          <div className="text-xs text-gray-500">Destination</div>
                        </div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Passenger</div>
                      <div className="font-semibold text-gray-900 text-sm truncate">
                        {ticket.passengerName}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Valid Until</div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {new Date(ticket.validUntil).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Fare</div>
                      <div className="font-bold text-primary-600 text-sm">
                        ₹{ticket.finalPrice.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* View Details Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};