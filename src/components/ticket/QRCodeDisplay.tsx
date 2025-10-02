import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '../common/Button';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  ticketNumber?: string;
  passengerName?: string;
  validUntil?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 256,
  ticketNumber,
  passengerName,
  validUntil,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${ticketNumber || 'qr'}.png`;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Your Travel Ticket</h3>
        {passengerName && (
          <p className="text-gray-600">Passenger: {passengerName}</p>
        )}
      </div>

      <div ref={qrRef} className="flex justify-center mb-4 p-4 bg-gray-50 rounded-lg">
        <QRCodeCanvas
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>

      {ticketNumber && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">Ticket Number</p>
          <p className="font-mono font-bold text-lg">{ticketNumber}</p>
        </div>
      )}

      {validUntil && (
        <div className="text-center mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Valid until: {new Date(validUntil).toLocaleString()}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Button fullWidth onClick={handleDownload} variant="primary">
          Download QR Code
        </Button>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800 text-center">
            📱 Show this QR code at entry and exit gates
          </p>
        </div>
      </div>
    </div>
  );
};