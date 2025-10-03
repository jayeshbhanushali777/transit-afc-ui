import React from 'react';
import { PaymentMethod } from '../../types/payment.types';

interface PaymentMethodsProps {
  onSelect: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod | null;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  onSelect,
  selectedMethod,
}) => {
  const paymentMethods = [
    {
      id: PaymentMethod.UPI,
      name: 'UPI',
      icon: '📱',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'PhonePe, GooglePay, Paytm',
      popular: true,
    },
    {
      id: PaymentMethod.CreditCard,
      name: 'Credit/Debit Card',
      icon: '💳',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Visa, Mastercard, Rupay',
      popular: false,
    },
    {
      id: PaymentMethod.NetBanking,
      name: 'Net Banking',
      icon: '🏦',
      gradient: 'from-green-500 to-teal-500',
      description: 'All major banks',
      popular: false,
    },
    {
      id: PaymentMethod.Wallet,
      name: 'Wallet',
      icon: '👛',
      gradient: 'from-orange-500 to-red-500',
      description: 'Paytm, PhonePe Wallet',
      popular: false,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Select Payment Method</h3>
          <p className="text-gray-600">Choose your preferred payment option</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`
              relative cursor-pointer rounded-2xl p-5 transition-all duration-200 border-2
              ${selectedMethod === method.id
                ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-105'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
              }
            `}
          >
            {/* Popular Badge */}
            {method.popular && (
              <div className="absolute -top-3 -right-3">
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                  ⭐ Popular
                </span>
              </div>
            )}

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                {method.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  {method.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {method.description}
                </p>
              </div>

              {/* Checkmark */}
              {selectedMethod === method.id && (
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};