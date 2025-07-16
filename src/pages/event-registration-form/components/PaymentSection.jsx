import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PaymentSection = ({ event, formData, onPaymentComplete, onPrevious }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, completed
  const [transactionId, setTransactionId] = useState('');

  const mockQRCode = "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop";

  const handlePaymentConfirm = () => {
    if (!transactionId.trim()) {
      alert('Please enter transaction ID');
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const registrationId = `MITS${Date.now()}${Math.floor(Math.random() * 1000)}`;
      setPaymentStatus('completed');
      onPaymentComplete({
        registrationId,
        transactionId,
        amount: event.fees,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  const calculateTotal = () => {
    const baseFee = event.fees;
    const teamMembersFee = formData.teamMembers ? formData.teamMembers.length * baseFee : 0;
    return baseFee + teamMembersFee;
  };

  if (paymentStatus === 'completed') {
    return (
      <div className="bg-surface rounded-lg border border-border shadow-card p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">Your registration has been confirmed</p>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Registration ID:</span>
                <p className="font-mono font-medium text-foreground">{formData.registrationId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Transaction ID:</span>
                <p className="font-mono font-medium text-foreground">{transactionId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Amount Paid:</span>
                <p className="font-medium text-foreground">₹{calculateTotal()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Event:</span>
                <p className="font-medium text-foreground">{event.name}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Download Receipt
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
            >
              Permission Letter
            </Button>
            <Button
              iconName="Home"
              iconPosition="left"
              onClick={() => window.location.href = '/public-homepage'}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Payment Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Summary */}
        <div>
          <h3 className="text-md font-medium text-foreground mb-4">Payment Summary</h3>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Event Registration</span>
                <span className="text-sm font-medium text-foreground">₹{event.fees}</span>
              </div>
              
              {formData.teamMembers && formData.teamMembers.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Team Members ({formData.teamMembers.length})
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ₹{formData.teamMembers.length * event.fees}
                  </span>
                </div>
              )}
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Total Amount</span>
                  <span className="text-lg font-semibold text-primary">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Registration Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Participant:</span>
                <span className="text-foreground">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="text-foreground">{formData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event:</span>
                <span className="text-foreground">{event.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-md font-medium text-foreground mb-4">Payment Method</h3>
          
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-white rounded-lg border-2 border-border shadow-subtle">
              <Image
                src={mockQRCode}
                alt="UPI QR Code for payment"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Scan QR code with any UPI app to pay ₹{calculateTotal()}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h4 className="text-sm font-medium text-primary mb-2">Payment Instructions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Scan the QR code using any UPI app</li>
                <li>• Enter the exact amount: ₹{calculateTotal()}</li>
                <li>• Complete the payment</li>
                <li>• Enter transaction ID below</li>
              </ul>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Transaction ID <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter UPI transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground">
                You'll receive this ID after successful payment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-border mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
          disabled={paymentStatus === 'processing'}
        >
          Previous
        </Button>
        <Button
          onClick={handlePaymentConfirm}
          loading={paymentStatus === 'processing'}
          iconName="CheckCircle"
          iconPosition="right"
          disabled={!transactionId.trim()}
        >
          {paymentStatus === 'processing' ? 'Verifying Payment...' : 'Confirm Payment'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentSection;