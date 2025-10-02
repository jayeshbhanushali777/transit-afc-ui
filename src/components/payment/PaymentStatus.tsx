import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentStatus as Status } from '../../types/payment.types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface PaymentStatusProps {
  status: Status;
  transactionId?: string;
  amount?: number;
  bookingNumber?: string;
  message?: string;
}

export const PaymentStatusDisplay: React.FC<PaymentStatusProps> = ({
  status,
  transactionId,
  amount,
  bookingNumber,
  message,
}) => {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (status) {
      case Status.Success:
        return {
          icon: '✅',
          title: 'Payment Successful!',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      case Status.Failed:
        return {
          icon: '❌',
          title: 'Payment Failed',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      case Status.Pending:
      case Status.Processing:
        return {
          icon: '⏳',
          title: 'Payment Processing',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      default:
        return {
          icon: 'ℹ️',
          title: 'Payment Status',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className={`border-2 ${config.borderColor}`}>
        <div className={`${config.bgColor} -m-6 mb-6 p-6 rounded-t-lg`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{config.icon}</div>
            <h2 className={`text-2xl font-bold ${config.color}`}>{config.title}</h2>
          </div>
        </div>

        <div className="space-y-4">
          {amount && (
            <div className="text-center pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="text-3xl font-bold text-gray-800">₹{amount.toFixed(2)}</p>
            </div>
          )}

          {bookingNumber && (
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Booking Number:</span>
              <span className="font-semibold">{bookingNumber}</span>
            </div>
          )}

          {transactionId && (
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm">{transactionId}</span>
            </div>
          )}

          {message && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">{message}</p>
            </div>
          )}

          <div className="pt-4 space-y-2">
            {status === Status.Success && (
              <>
                <Button
                  fullWidth
                  onClick={() => navigate(`/my-tickets`)}
                  variant="primary"
                >
                  View Ticket
                </Button>
                <Button
                  fullWidth
                  onClick={() => navigate('/')}
                  variant="secondary"
                >
                  Book Another Trip
                </Button>
              </>
            )}

            {status === Status.Failed && (
              <>
                <Button
                  fullWidth
                  onClick={() => window.location.reload()}
                  variant="primary"
                >
                  Try Again
                </Button>
                <Button
                  fullWidth
                  onClick={() => navigate('/')}
                  variant="secondary"
                >
                  Go to Home
                </Button>
              </>
            )}

            {(status === Status.Pending || status === Status.Processing) && (
              <Button
                fullWidth
                onClick={() => window.location.reload()}
                variant="secondary"
              >
                Refresh Status
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};