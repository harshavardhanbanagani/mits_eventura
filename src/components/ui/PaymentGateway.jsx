import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { processPayment } from '../../store/slices/registrationsSlice';
import { useToast } from './ToastContainer';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const PaymentGateway = ({
  amount,
  currency = 'INR',
  orderId,
  onSuccess,
  onFailure,
  onCancel,
  description = '',
  userDetails = {},
}) => {
  const dispatch = useDispatch();
  const { paymentLoading } = useSelector(state => state.registrations);
  const { showToast } = useToast();

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    netBankingBank: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, MasterCard, RuPay',
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: 'Smartphone',
      description: 'PhonePe, Google Pay, Paytm',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: 'Building',
      description: 'All major banks supported',
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'Wallet',
      description: 'Paytm, PhonePe, Amazon Pay',
    },
  ];

  const banks = [
    { value: 'sbi', label: 'State Bank of India' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'kotak', label: 'Kotak Mahindra Bank' },
    { value: 'pnb', label: 'Punjab National Bank' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (selectedMethod === 'card') {
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!paymentData.cvv || paymentData.cvv.length !== 3) {
        newErrors.cvv = 'Please enter a valid 3-digit CVV';
      }
      if (!paymentData.cardholderName.trim()) {
        newErrors.cardholderName = 'Please enter cardholder name';
      }
    } else if (selectedMethod === 'upi') {
      if (!paymentData.upiId || !paymentData.upiId.includes('@')) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    } else if (selectedMethod === 'netbanking') {
      if (!paymentData.netBankingBank) {
        newErrors.netBankingBank = 'Please select a bank';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Format card number
    if (field === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      setPaymentData(prev => ({ ...prev, [field]: formatted }));
    }

    // Format expiry date
    if (field === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      setPaymentData(prev => ({ ...prev, [field]: formatted }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentDetails = {
        method: selectedMethod,
        amount,
        currency,
        orderId,
        ...paymentData,
        timestamp: new Date().toISOString(),
      };

      const result = await dispatch(processPayment({
        registrationId: orderId,
        paymentData: paymentDetails,
      })).unwrap();

      showToast({
        type: 'success',
        title: 'Payment Successful!',
        message: `Payment of ${currency} ${amount} has been processed successfully.`,
      });

      onSuccess(result);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Payment Failed',
        message: error.message || 'Payment processing failed. Please try again.',
      });

      onFailure(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <Input
              label="Card Number"
              value={paymentData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              error={errors.cardNumber}
              icon="CreditCard"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                error={errors.expiryDate}
              />
              <Input
                label="CVV"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={3}
                type="password"
                error={errors.cvv}
              />
            </div>
            
            <Input
              label="Cardholder Name"
              value={paymentData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="John Doe"
              error={errors.cardholderName}
            />
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <Input
              label="UPI ID"
              value={paymentData.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              placeholder="yourname@paytm"
              error={errors.upiId}
              icon="Smartphone"
            />
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-800">
                <Icon name="Info" size={16} />
                <span className="text-sm font-medium">UPI Payment</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                You'll be redirected to your UPI app to complete the payment.
              </p>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bank
              </label>
              <select
                value={paymentData.netBankingBank}
                onChange={(e) => handleInputChange('netBankingBank', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Choose your bank</option>
                {banks.map((bank) => (
                  <option key={bank.value} value={bank.value}>
                    {bank.label}
                  </option>
                ))}
              </select>
              {errors.netBankingBank && (
                <p className="text-red-500 text-sm mt-1">{errors.netBankingBank}</p>
              )}
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <Icon name="Shield" size={16} />
                <span className="text-sm font-medium">Secure Banking</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                You'll be redirected to your bank's secure login page.
              </p>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['paytm', 'phonepe', 'amazonpay', 'googlepay'].map((wallet) => (
                <button
                  key={wallet}
                  onClick={() => handleInputChange('selectedWallet', wallet)}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    paymentData.selectedWallet === wallet
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{wallet}</div>
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 text-purple-800">
                <Icon name="Wallet" size={16} />
                <span className="text-sm font-medium">Digital Wallet</span>
              </div>
              <p className="text-sm text-purple-700 mt-1">
                Choose your preferred wallet and complete the payment.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
        <h3 className="text-lg font-semibold">Complete Payment</h3>
        <div className="mt-2">
          <div className="text-2xl font-bold">
            {currency} {amount.toLocaleString()}
          </div>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={method.icon} size={24} className="text-gray-600" />
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
                {selectedMethod === method.id && (
                  <Icon name="CheckCircle" size={20} className="text-primary ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Payment Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMethod}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            {renderPaymentForm()}
          </motion.div>
        </AnimatePresence>

        {/* Security Notice */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-700">
            <Icon name="Lock" size={16} />
            <span className="text-sm font-medium">Secure Payment</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Your payment information is encrypted and secure. We do not store your payment details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            loading={isProcessing}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : `Pay ${currency} ${amount}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;