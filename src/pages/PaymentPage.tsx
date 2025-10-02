import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { bookingService } from "../api/services/bookingService";
import { paymentService } from "../api/services/paymentService";
import { BookingResponse } from "../types/booking.types";
import {
  PaymentMethod,
  PaymentGateway,
  CreatePaymentRequest,
} from "../types/payment.types";
import { PaymentMethods } from "../components/payment/PaymentMethods";
import { UpiPayment } from "../components/payment/UpiPayment";
import { Card } from "../components/common/Card";
import { Loading } from "../components/common/Loading";
import { Button } from "../components/common/Button";

export const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (bookingId) {
      loadBooking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const loadBooking = async () => {
    if (!bookingId) return;

    setIsLoading(true);
    try {
      const response = await bookingService.getBooking(bookingId);
      if (response.isSuccess && response.data) {
        setBooking(response.data);
      } else {
        toast.error("Failed to load booking details");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load booking");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (upiId?: string) => {
    if (!booking || !selectedMethod) return;

    setIsProcessing(true);
    try {
      const paymentRequest: CreatePaymentRequest = {
        bookingId: booking.id,
        bookingNumber: booking.bookingNumber,
        amount: booking.finalAmount,
        method: selectedMethod,
        preferredGateway: PaymentGateway.Razorpay,
        customerEmail: booking.contactEmail,
        customerPhone: booking.contactPhone,
        upiId: upiId,
        currency: "INR",
      };

      const response = await paymentService.createPayment(paymentRequest);

      if (response.isSuccess && response.data) {
        toast.success("💳 Payment initiated successfully!");

        // Simulate payment processing
        setTimeout(async () => {
          try {
            await paymentService.processPayment({
              paymentId: response.data!.paymentId,
              gatewayPaymentId: "demo_" + Date.now(),
              transactionId: "TXN_" + Date.now(),
            });

            await bookingService.confirmBooking(booking.id, response.data!.id);

            toast.success("🎉 Payment successful!");
            navigate(`/payment-success/${response.data!.id}`);
          } catch (error: any) {
            toast.error(error.message || "Payment processing failed");
            setIsProcessing(false);
          }
        }, 2000);
      } else {
        toast.error(response.message || "Payment creation failed");
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <Loading text="Loading booking details..." />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <Card className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to find the booking details
          </p>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/booking")}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Booking
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your preferred payment method
          </p>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="max-w-md animate-scale-in">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6">
                  <div className="w-20 h-20 border-4 border-primary-200 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-primary-600 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Processing Payment
                </h3>
                <p className="text-gray-600 mb-4">
                  Please wait while we process your payment...
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure encrypted connection
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <Card className="animate-slide-up">
              <PaymentMethods
                onSelect={setSelectedMethod}
                selectedMethod={selectedMethod}
              />
            </Card>

            {/* Payment Form */}
            {selectedMethod === PaymentMethod.UPI && (
              <div className="animate-scale-in">
                <UpiPayment
                  amount={booking.finalAmount}
                  onProceed={handlePayment}
                  isLoading={isProcessing}
                />
              </div>
            )}

            {selectedMethod === PaymentMethod.Card && (
              <Card className="animate-scale-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Card Payment
                    </h3>
                    <p className="text-gray-600">Secure payment gateway</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  You will be redirected to our secure payment gateway to
                  complete the transaction
                </p>

                <Button
                  fullWidth
                  size="lg"
                  onClick={() => handlePayment()}
                  isLoading={isProcessing}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                >
                  Pay ₹{booking.finalAmount.toFixed(2)}
                </Button>
              </Card>
            )}

            {selectedMethod === PaymentMethod.NetBanking && (
              <Card className="animate-scale-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Net Banking
                    </h3>
                    <p className="text-gray-600">All major banks supported</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  Select your bank and you'll be redirected to complete the
                  payment
                </p>

                <Button
                  fullWidth
                  size="lg"
                  onClick={() => handlePayment()}
                  isLoading={isProcessing}
                  variant="success"
                >
                  Proceed to Bank
                </Button>
              </Card>
            )}

            {selectedMethod === PaymentMethod.Wallet && (
              <Card className="animate-scale-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Wallet Payment
                    </h3>
                    <p className="text-gray-600">Paytm, PhonePe Wallet</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  Pay using your digital wallet balance
                </p>

                <Button
                  fullWidth
                  size="lg"
                  onClick={() => handlePayment()}
                  isLoading={isProcessing}
                  className="!bg-gradient-to-r !from-purple-600 !to-purple-700"
                >
                  Pay with Wallet
                </Button>
              </Card>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Order Summary
                    </h3>
                    <p className="text-sm text-gray-500">
                      Booking #{booking.bookingNumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Journey */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-xl">
                    <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                      Journey
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-sm">
                          <div className="font-bold text-gray-900">
                            {booking.sourceStation.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.sourceStation.code}
                          </div>
                        </div>
                      </div>
                      <div className="ml-1 h-6 w-0.5 bg-gradient-to-b from-green-500 to-red-500"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="text-sm">
                          <div className="font-bold text-gray-900">
                            {booking.destinationStation.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.destinationStation.code}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                      Passengers ({booking.passengerCount})
                    </h4>
                    <div className="space-y-2">
                      {booking.passengers.map((p, idx) => (
                        <div
                          key={idx}
                          className="text-sm flex justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{p.fullName}</span>
                          <span className="font-bold text-primary-600">
                            ₹{p.finalFare.toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fare Breakdown */}
                  <div className="space-y-2 text-sm pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₹{booking.totalFare.toFixed(2)}
                      </span>
                    </div>
                    {booking.discountAmount && booking.discountAmount > 0 && (
                      <div className="flex justify-between p-2 bg-green-50 rounded-lg">
                        <span className="text-green-700">Discount</span>
                        <span className="text-green-700 font-bold">
                          -₹{booking.discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {booking.taxAmount && booking.taxAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax & Fees</span>
                        <span className="font-medium">
                          ₹{booking.taxAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="bg-gradient-to-r from-primary-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
                      <div className="text-sm opacity-90 mb-1">
                        Total Amount
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div className="text-4xl font-extrabold">
                          ₹{booking.finalAmount.toFixed(0)}
                        </div>
                        <div className="text-sm opacity-75">incl. taxes</div>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      256-bit SSL encryption
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      PCI DSS compliant
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      100% safe & secure
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
