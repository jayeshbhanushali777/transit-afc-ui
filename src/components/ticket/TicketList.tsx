import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketResponse, TicketStatus } from '../../types/ticket.types';
import { Card } from '../common/Card';

interface TicketListProps {
  tickets: TicketResponse[];
}

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Active:
        return 'bg-green-500';
      case TicketStatus.Used:
        return 'bg-gray-500';
      case TicketStatus.Expired:
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (tickets.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600 text-lg">No tickets found</p>
        <p className="text-gray-500 text-sm mt-2">Book a trip to see your tickets here</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          hoverable
          onClick={() => navigate(`/ticket/${ticket.id}`)}
          className="cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 ${getStatusColor(ticket.status)} rounded-full`}></div>
                <h3 className="text-lg font-bold text-gray-800">
                  {ticket.sourceStationName} → {ticket.destinationStationName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Ticket Number</p>
                  <p className="font-medium font-mono">{ticket.ticketNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Passenger</p>
                  <p className="font-medium">{ticket.passengerName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Valid Until</p>
                  <p className="font-medium">
                    {new Date(ticket.validUntil).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Fare</p>
                  <p className="font-medium text-blue-600">₹{ticket.finalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="ml-4">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};