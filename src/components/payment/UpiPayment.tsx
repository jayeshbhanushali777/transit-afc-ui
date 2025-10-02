import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

const upiSchema = z.object({
  upiId: z
    .string()
    .regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format (e.g., user@paytm)'),
});

type UpiFormData = z.infer<typeof upiSchema>;

interface UpiPaymentProps {
  amount: number;
  onProceed: (upiId: string) => void;
  isLoading?: boolean;
}

export const UpiPayment: React.FC<UpiPaymentProps> = ({
  amount,
  onProceed,
  isLoading = false,
}) => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpiFormData>({
    resolver: zodResolver(upiSchema),
  });

  const upiApps = [
    { name: 'PhonePe', icon: '📱', suffix: '@ybl', color: 'from-purple-500 to-purple-700' },
    { name: 'Google Pay', icon: '🔵', suffix: '@okhdfcbank', color: 'from-blue-500 to-blue-700' },
    { name: 'Paytm', icon: '🔷', suffix: '@paytm', color: 'from-cyan-500 to-cyan-700' },
    { name: 'Amazon Pay', icon: '🟠', suffix: '@apl', color: 'from-orange-500 to-orange-700' },
  ];

  const handleAppSelect = (app: typeof upiApps[0]) => {
    setSelectedApp(app.name);
  };

  const onSubmit = (data: UpiFormData) => {
    onProceed(data.upiId);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">UPI Payment</h3>
          <p className="text-gray-600">Fast & secure UPI payments</p>
        </div>
      </div>
      
      {/* Amount Display */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
          <p className="text-5xl font-extrabold text-gradient mb-2">
            ₹{amount.toFixed(2)}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secured by UPI
          </div>
        </div>
      </div>

      {/* UPI Apps Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-700 mb-3">Quick Select UPI App</h4>
        <div className="grid grid-cols-2 gap-3">
          {upiApps.map((app) => (
            <button
              key={app.name}
              type="button"
              onClick={() => handleAppSelect(app)}
              className={`
                p-4 border-2 rounded-2xl transition-all transform hover:scale-105
                ${selectedApp === app.name
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-gray-200 hover:border-primary-300'
                }
              `}
            >
              <div className={`w-14 h-14 mx-auto mb-2 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                {app.icon}
              </div>
              <div className="text-sm font-bold text-gray-900">{app.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* UPI ID Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Enter UPI ID"
          placeholder="username@paytm"
          error={errors.upiId?.message}
          {...register('upiId')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />

        <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Payment Flow:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>You'll be redirected to your UPI app</li>
                <li>Approve the payment request</li>
                <li>Return to complete booking</li>
              </ol>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          size="xl"
          isLoading={isLoading}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          Proceed to Pay ₹{amount.toFixed(2)}
        </Button>
      </form>
    </Card>
  );
};