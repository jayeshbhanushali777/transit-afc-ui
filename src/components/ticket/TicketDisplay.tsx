import React from 'react';
import { TicketResponse, TicketStatus } from '../../types/ticket.types';
import { Card } from '../common/Card';
import { QRCodeDisplay } from './QRCodeDisplay';

interface TicketDisplayProps {
  ticket: TicketResponse;
}

export const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket }) => {
  const getStatusBadge = (status: TicketStatus) => {
    const styles: Record<TicketStatus, string> = {
      [TicketStatus.Active]: 'bg-green-100 text-green-800',
      [TicketStatus.Used]: 'bg-gray-100 text-gray-800',
      [TicketStatus.Expired]: 'bg-red-100 text-red-800',
      [TicketStatus.Cancelled]: 'bg-red-100 text-red-800',
      [TicketStatus.Refunded]: 'bg-yellow-100 text-yellow-800',
      [TicketStatus.Suspended]: 'bg-orange-100 text-orange-800',
      [TicketStatus.Draft]: 'bg-gray-100 text-gray-800',
      [TicketStatus.Invalid]: 'bg-red-100 text-red-800',
      [TicketStatus.Generated]: 'bg-green-100 text-green-800',
    };

    const labels: Record<TicketStatus, string> = {
      [TicketStatus.Active]: 'Active',
      [TicketStatus.Used]: 'Used',
      [TicketStatus.Expired]: 'Expired',
      [TicketStatus.Cancelled]: 'Cancelled',
      [TicketStatus.Refunded]: 'Refunded',
      [TicketStatus.Suspended]: 'Suspended',
      [TicketStatus.Draft]: 'Draft',
      [TicketStatus.Generated]: 'Generated',
      [TicketStatus.Invalid]: 'Invalid',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Details */}
        <Card>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Ticket Details</h2>
              <p className="text-gray-600">#{ticket.ticketNumber}</p>
            </div>
            {getStatusBadge(ticket.status)}
          </div>

          <div className="space-y-4">
            {/* Journey Details */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">Journey</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{ticket.sourceStationName}</p>
                    <p className="text-sm text-gray-600">{ticket.sourceStationCode}</p>
                  </div>
                </div>
                
                <div className="ml-1.5 border-l-2 border-gray-300 h-8"></div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{ticket.destinationStationName}</p>
                    <p className="text-sm text-gray-600">{ticket.destinationStationCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Info */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Route</h3>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">
                    {ticket.routeName} ({ticket.routeCode})
                  </span>
                </p>
                {ticket.seatNumber && (
                  <p className="flex justify-between">
                    <span className="text-gray-600">Seat:</span>
                    <span className="font-medium">{ticket.seatNumber}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Passenger Info */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Passenger</h3>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{ticket.passengerName}</span>
                </p>
                {ticket.passengerType && (
                  <p className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{ticket.passengerType}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Validity */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Validity</h3>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Valid From:</span>
                  <span className="font-medium">
                    {new Date(ticket.validFrom).toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="font-medium">
                    {new Date(ticket.validUntil).toLocaleString()}
                  </span>
                </p>
                {ticket.maxUsageCount > 1 && (
                  <p className="flex justify-between">
                    <span className="text-gray-600">Usage:</span>
                    <span className="font-medium">
                      {ticket.usageCount} / {ticket.maxUsageCount}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Fare */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Fare</h3>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Base Fare:</span>
                  <span>₹{ticket.basePrice.toFixed(2)}</span>
                </p>
                {ticket.discountAmount && ticket.discountAmount > 0 && (
                  <p className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{ticket.discountAmount.toFixed(2)}</span>
                  </p>
                )}
                {ticket.taxAmount && ticket.taxAmount > 0 && (
                  <p className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span>₹{ticket.taxAmount.toFixed(2)}</span>
                  </p>
                )}
                <p className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-blue-600">₹{ticket.finalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* QR Code */}
        <div>
          {ticket.qrCodeData && (
            <QRCodeDisplay
              value={ticket.qrCodeData}
              ticketNumber={ticket.ticketNumber}
              passengerName={ticket.passengerName}
              validUntil={ticket.validUntil}
            />
          )}
        </div>
      </div>
    </div>
  );
};