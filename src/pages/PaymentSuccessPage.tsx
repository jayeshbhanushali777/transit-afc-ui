import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentService } from '../api/services/paymentService';
import { ticketService } from '../api/services/ticketService';
import { PaymentResponse } from '../types/payment.types';
import { TicketResponse } from '../types/ticket.types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import Confetti from 'react-confetti';

export const PaymentSuccessPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (paymentId) {
      loadPaymentAndTickets();
    }

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId]);

  const loadPaymentAndTickets = async () => {
    if (!paymentId) return;

    setIsLoading(true);
    try {
      const paymentResponse = await paymentService.getPayment(paymentId);
      if (paymentResponse.isSuccess && paymentResponse.data) {
        setPayment(paymentResponse.data);

        // Try to load tickets
        if (paymentResponse.data.bookingId) {
          const ticketsResponse = await ticketService.getTicketByBooking(
            paymentResponse.data.bookingId
          );
          if (ticketsResponse.isSuccess && ticketsResponse.data) {
            setTickets([ticketsResponse.data]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <Loading text="Loading payment details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse-slow">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2 animate-slide-up">
            Your booking is confirmed
          </p>
          {payment && (
            <p className="text-lg text-gray-500 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Transaction ID: <span className="font-mono font-bold text-primary-600">{payment.transactionId}</span>
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Payment Details Card */}
          {payment && (
            <Card className="animate-slide-up border-2 border-green-200" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Payment Confirmed</h2>
                  <p className="text-gray-600">Your payment has been processed successfully</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                    <p className="text-4xl font-extrabold text-green-600">
                      ₹{payment.totalAmount.toFixed(2)}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Booking Number</p>
                    <p className="text-2xl font-bold font-mono text-gray-900">
                      {payment.bookingNumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold text-gray-900">
                      {payment.method === 0 ? '📱 UPI' :
                       payment.method === 1 ? '💳 Card' :
                       payment.method === 2 ? '🏦 Net Banking' : '👛 Wallet'}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-xs text-gray-900">
                      {payment.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Payment Gateway</span>
                    <span className="font-semibold text-gray-900">
                      {payment.gateway === 0 ? 'Razorpay' : 'Stripe'}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(payment.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What's Next?</h2>
                <p className="text-gray-600">Here's what you need to know</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: '📧',
                  title: 'Check Email',
                  desc: 'Booking confirmation sent to your email',
                  color: 'from-blue-500 to-blue-700',
                },
                {
                  icon: '🎫',
                  title: 'View Ticket',
                  desc: 'Access your digital ticket with QR code',
                  color: 'from-purple-500 to-purple-700',
                },
                {
                  icon: '🚆',
                  title: 'Travel Day',
                  desc: 'Show QR code at entry and exit gates',
                  color: 'from-green-500 to-green-700',
                },
              ].map((step, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              fullWidth
              size="xl"
              onClick={() => navigate('/my-tickets')}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              }
            >
              View My Tickets
            </Button>

            <Button
              fullWidth
              size="xl"
              variant="secondary"
              onClick={() => navigate('/my-bookings')}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            >
              My Bookings
            </Button>

            <Button
              fullWidth
              size="xl"
              variant="ghost"
              onClick={() => navigate('/')}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
            >
              Back to Home
            </Button>
          </div>

          {/* Receipt Download */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Download Receipt</h4>
                  <p className="text-sm text-gray-600">Get a copy of your payment receipt</p>
                </div>
              </div>
              <Button
                variant="secondary"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                }
              >
                Download PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};