import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface UpiTransactionSimulatorProps {
  amount: number;
  upiId: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (error: string) => void;
  onCancel: () => void;
}

type TransactionStep = 'requesting' | 'approval' | 'processing' | 'success' | 'failed';

export const UpiTransactionSimulator: React.FC<UpiTransactionSimulatorProps> = ({
  amount,
  upiId,
  onSuccess,
  onFailure,
  onCancel,
}) => {
  const [step, setStep] = useState<TransactionStep>('requesting');
  const [countdown, setCountdown] = useState(10);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    // Generate transaction ID
    const txnId = `UPI${Date.now()}${Math.floor(Math.random() * 10000)}`;
    setTransactionId(txnId);

    // Simulate UPI app opening
    const requestTimer = setTimeout(() => {
      setStep('approval');
      // Auto approve after 3 seconds for demo
      setTimeout(() => {
        handleApprove();
      }, 3000);
    }, 2000);

    return () => clearTimeout(requestTimer);
  }, []);

  useEffect(() => {
    if (step === 'approval' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      handleDecline();
    }
  }, [step, countdown]);

  const handleApprove = () => {
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      // 95% success rate for demo
      const isSuccess = Math.random() > 0.05;
      if (isSuccess) {
        setStep('success');
        // Wait 1.5 seconds to show success, then redirect
        setTimeout(() => {
          onSuccess(transactionId);
        }, 1500);
      } else {
        setStep('failed');
      }
    }, 2000);
  };

  const handleDecline = () => {
    setStep('failed');
    setTimeout(() => {
      onFailure('Payment declined by user');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="max-w-md w-full animate-scale-in">
        {/* Requesting Step */}
        {step === 'requesting' && (
          <Card className="text-center">
            <div className="w-20 h-20 mx-auto mb-4">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-blue-600 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Requesting Payment
            </h3>
            <p className="text-gray-600 mb-4">
              Opening UPI app...
            </p>
            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Sending request to</div>
              <div className="font-mono font-bold text-blue-600">{upiId}</div>
            </div>
          </Card>
        )}

        {/* Approval Step */}
        {step === 'approval' && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* UPI App Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 p-4 rounded-t-2xl mb-6">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <div className="font-bold">UPI Payment</div>
                    <div className="text-xs opacity-90">Secure Transaction</div>
                  </div>
                </div>
                <button
                  onClick={onCancel}
                  className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Payment Request */}
            <div className="text-center mb-6">
              <div className="text-sm text-gray-600 mb-2">Payment Request</div>
              <div className="text-5xl font-extrabold text-gradient mb-2">
                ₹{amount.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Transit AFC Booking Payment
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 text-sm">To UPI ID</span>
                <span className="font-mono font-semibold text-gray-900 text-sm">{upiId}</span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 text-sm">Transaction ID</span>
                <span className="font-mono text-xs text-gray-700">{transactionId}</span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 text-sm">Merchant</span>
                <span className="font-semibold text-gray-900 text-sm">Transit AFC System</span>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Auto-approving in {countdown}s (Demo)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                fullWidth
                size="lg"
                variant="danger"
                onClick={handleDecline}
              >
                Decline
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="success"
                onClick={handleApprove}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Approve
              </Button>
            </div>

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secured by UPI • End-to-end encrypted
            </div>
          </Card>
        )}

        {/* Processing Step */}
        {step === 'processing' && (
          <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Processing Payment
            </h3>
            <p className="text-gray-600 mb-4">
              Please wait while we process your transaction...
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </Card>
        )}

        {/* Success Step */}
        {step === 'success' && (
        <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            </div>
            <h3 className="text-3xl font-bold text-green-600 mb-2 animate-fade-in">
            Payment Successful! 🎉
            </h3>
            <p className="text-gray-700 mb-4 font-semibold">
            ₹{amount.toFixed(2)} paid successfully
            </p>
            <div className="p-4 bg-white rounded-xl border-2 border-green-200 mb-4">
            <div className="text-xs text-gray-600 mb-1">Transaction ID</div>
            <div className="font-mono font-bold text-green-600 text-sm">{transactionId}</div>
            </div>
            
            {/* Loading indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Completing booking...</span>
            </div>
        </Card>
        )}

        {/* Failed Step */}
        {step === 'failed' && (
          <Card className="text-center bg-gradient-to-br from-red-50 to-orange-50">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-red-600 mb-2">
              Payment Failed
            </h3>
            <p className="text-gray-700 mb-6">
              Transaction could not be completed
            </p>
            <div className="space-y-3">
              <Button
                fullWidth
                size="lg"
                onClick={() => onFailure('Payment failed')}
              >
                Try Again
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="ghost"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};