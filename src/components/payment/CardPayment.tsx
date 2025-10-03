import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface CardPaymentProps {
  amount: number;
  onProceed: () => void;
  isLoading?: boolean;
}

export const CardPayment: React.FC<CardPaymentProps> = ({
  amount,
  onProceed,
  isLoading = false,
}) => {
  const handlePayment = () => {
    // For demo, directly trigger success
    const transactionId = `CARD_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    console.log('Card payment initiated:', transactionId);
    onProceed();
  };

  return (
    <Card>
      <div className="text-center p-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Card Payment
        </h3>
        
        <p className="text-gray-600 mb-4">
          You will be redirected to secure payment gateway
        </p>

        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 mb-6">
          <div className="text-sm text-gray-600 mb-2">Amount to Pay</div>
          <div className="text-4xl font-extrabold text-gradient">
            ₹{amount.toFixed(2)}
          </div>
        </div>

        <div className="space-y-3 mb-6 text-sm text-gray-600 text-left bg-blue-50 p-4 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Secure 256-bit SSL encryption</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Accepts Visa, MasterCard, RuPay</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>3D Secure authentication</span>
          </div>
        </div>

        <Button
          fullWidth
          size="xl"
          onClick={handlePayment}
          isLoading={isLoading}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          Pay ₹{amount.toFixed(2)} Securely
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          Demo mode: Payment will be simulated
        </p>
      </div>
    </Card>
  );
};