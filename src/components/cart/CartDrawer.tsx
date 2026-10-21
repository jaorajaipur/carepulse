import React, { useState, useEffect } from 'react';
import { CartItem } from '../../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  RefreshCw,
  Receipt,
  FileDown,
  MapPin,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onClose: () => void;
}

type CheckoutStep = 'cart' | 'payment_selection' | 'processing' | 'success';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [couponCode, setCouponCode] = useState('CAREPULSE20');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Payment form states
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiId, setUpiId] = useState('arjun.sharma@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8812');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  // Transaction simulation metadata
  const [processingStage, setProcessingStage] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState<{
    txnId: string;
    utrNumber: string;
    timestamp: string;
    paidAmount: number;
    paymentModeName: string;
  } | null>(null);

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = couponApplied ? Math.round(subtotal * 0.2) : 0;
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 299 ? 0 : 40;
  const healthcarePackagingFee = items.length > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + healthcarePackagingFee);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'CAREPULSE20' || couponCode.trim().toUpperCase() === 'HEALTH10') {
      setCouponApplied(true);
      setCouponError(null);
    } else {
      setCouponError('Invalid code. Try "CAREPULSE20" for 20% off.');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponError(null);
  };

  // Start Payment Processing Simulation
  const handleProceedToPayment = () => {
    setCheckoutStep('processing');
    setProcessingStage(1);

    const generatedTxnId = `TXN-CP-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const generatedUtr = `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const now = new Date();
    const timestampStr = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const paymentLabel =
      paymentMethod === 'upi'
        ? `UPI (${selectedUpiApp === 'gpay' ? 'Google Pay' : selectedUpiApp === 'phonepe' ? 'PhonePe' : 'Paytm'})`
        : paymentMethod === 'card'
        ? 'Credit / Debit Card'
        : 'Cash on Delivery';

    // Simulated progress steps
    setTimeout(() => {
      setProcessingStage(2); // Authorizing
    }, 900);

    setTimeout(() => {
      setProcessingStage(3); // Generating receipt
    }, 1800);

    setTimeout(() => {
      setTransactionDetails({
        txnId: generatedTxnId,
        utrNumber: generatedUtr,
        timestamp: timestampStr,
        paidAmount: total,
        paymentModeName: paymentLabel,
      });
      setCheckoutStep('success');

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.65 },
        });
      } catch {
        // Safe fallback
      }
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden border border-slate-100">
        
        {/* Top Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#eff4ff] text-[#006388] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                {checkoutStep === 'cart' && `Your Health Cart (${items.length})`}
                {checkoutStep === 'payment_selection' && 'Choose Payment Method'}
                {checkoutStep === 'processing' && 'Securing Transaction...'}
                {checkoutStep === 'success' && 'Order & Payment Confirmed'}
              </h3>
              <p className="text-[10px] text-slate-400">
                {checkoutStep === 'cart' && 'Review items & savings'}
                {checkoutStep === 'payment_selection' && '100% Encrypted & Safe Checkout'}
                {checkoutStep === 'processing' && 'Bank & RBI Compliant Gateway'}
                {checkoutStep === 'success' && 'Official CarePulse Tax Invoice'}
              </p>
            </div>
          </div>
          
          {checkoutStep !== 'processing' && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 1. CART ITEMS & PRICING STEP */}
        {checkoutStep === 'cart' && (
          <>
            <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1 bg-[#f8f9ff]">
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700">Your Cart is Empty</h4>
                  <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto">
                    Add medicines, lab tests or nurse bookings to continue
                  </p>
                </div>
              ) : (
                <>
                  {/* Delivery Location Preview */}
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#007dab] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] block">Delivering to: Sobha Lavender, Flat 402</span>
                        <span className="text-[10px] text-slate-400">Indiranagar, Bengaluru • 15 Mins Express</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#006388] px-2 py-0.5 rounded bg-sky-50">Saved</span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-sky-50 text-[#006388]">
                              {item.type}
                            </span>
                            {item.requiresPrescription && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Rx Verified
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 mt-1 truncate">{item.title}</h4>
                          <div className="mt-0.5 flex items-baseline gap-1.5">
                            <span className="text-xs font-extrabold text-slate-900">₹{item.price * item.quantity}</span>
                            {item.originalPrice && (
                              <span className="text-[10px] text-slate-400 line-through">
                                ₹{item.originalPrice * item.quantity}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-xs hover:bg-slate-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-xs hover:bg-slate-50"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Card */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <Tag className="w-4 h-4 text-[#007dab] flex-shrink-0" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="ENTER PROMO CODE"
                          className="w-full text-xs font-bold text-slate-800 uppercase focus:outline-none"
                        />
                      </div>
                      {couponApplied ? (
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs font-bold text-rose-600 hover:underline flex-shrink-0"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyCoupon}
                          className="text-xs font-bold text-[#006388] hover:underline flex-shrink-0"
                        >
                          Apply Code
                        </button>
                      )}
                    </div>

                    {couponApplied && (
                      <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Code CAREPULSE20 applied: You saved ₹{discountAmount}!</span>
                      </div>
                    )}
                    {couponError && (
                      <p className="text-[10px] text-rose-600 font-semibold">{couponError}</p>
                    )}
                  </div>

                  {/* Calculated Price Breakdown */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 text-xs">
                    <h4 className="font-bold text-slate-900 text-xs">Order Bill Details</h4>
                    
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Items Subtotal</span>
                      <span className="font-medium text-slate-800">₹{subtotal}</span>
                    </div>

                    {couponApplied && discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 text-[11px] font-semibold">
                        <span>Promo Code Discount (20%)</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1">
                        <span>Express 15-Min Delivery</span>
                        {deliveryFee === 0 && <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded">FREE &gt;₹299</span>}
                      </span>
                      <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-slate-800 font-medium"}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Clinical Packaging & Sterilization</span>
                      <span className="font-medium text-slate-800">₹{healthcarePackagingFee}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-900 text-sm font-extrabold">
                      <span>Total Payable</span>
                      <span className="text-base text-[#006388]">₹{total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Proceed Button */}
            {items.length > 0 && (
              <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Grand Total</span>
                  <span className="text-base font-extrabold text-slate-900">₹{total}</span>
                </div>
                <button
                  onClick={() => setCheckoutStep('payment_selection')}
                  className="flex-1 py-2.5 rounded-full bg-[#006388] hover:bg-[#007dab] active:scale-95 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* 2. PAYMENT SELECTION STEP */}
        {checkoutStep === 'payment_selection' && (
          <>
            <div className="p-4 overflow-y-auto no-scrollbar space-y-4 flex-1 bg-[#f8f9ff] text-xs">
              {/* Order total header */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Amount to Pay</span>
                  <div className="text-base font-extrabold text-[#006388]">₹{total}</div>
                </div>
                <div className="text-right text-[11px]">
                  <span className="text-emerald-700 font-bold block">✓ Total Saved: ₹{discountAmount}</span>
                  <span className="text-slate-400 text-[10px]">{items.length} items included</span>
                </div>
              </div>

              {/* Payment Methods Accordion */}
              <div className="space-y-2.5">
                <label className="font-bold text-slate-800 text-xs block">Choose Payment Mode</label>

                {/* Option 1: Instant UPI */}
                <div
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#007dab] bg-white shadow-xs ring-1 ring-[#007dab]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Instant UPI (0% Transaction Fee)</h4>
                        <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#007dab]' : 'border-slate-300'}`}>
                      {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-[#007dab]"></div>}
                    </div>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'gpay' as const, label: 'Google Pay' },
                          { id: 'phonepe' as const, label: 'PhonePe' },
                          { id: 'paytm' as const, label: 'Paytm UPI' },
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUpiApp(app.id);
                            }}
                            className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                              selectedUpiApp === app.id
                                ? 'border-[#007dab] bg-[#eff4ff] text-[#006388]'
                                : 'border-slate-200 bg-slate-50 text-slate-600'
                            }`}
                          >
                            {app.label}
                          </button>
                        ))}
                      </div>

                      <div className="mt-2">
                        <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Or enter custom UPI ID / VPA</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                          placeholder="e.g. mobile@upi"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Credit / Debit Cards */}
                <div
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#007dab] bg-white shadow-xs ring-1 ring-[#007dab]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Credit / Debit Card</h4>
                        <p className="text-[10px] text-slate-500">Visa, Mastercard, RuPay, Amex</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#007dab]' : 'border-slate-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#007dab]"></div>}
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Valid Thru</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 3: Cash on Delivery */}
                <div
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#007dab] bg-white shadow-xs ring-1 ring-[#007dab]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Cash / UPI on Delivery</h4>
                        <p className="text-[10px] text-slate-500">Pay at doorstep during 15-min delivery</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#007dab]' : 'border-slate-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#007dab]"></div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Encryption reassurance */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center gap-2 text-[10px] text-slate-600">
                <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>256-bit SSL encrypted & RBI Compliant Tokenized Gateway. Your card data is never stored.</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3.5 bg-white border-t border-slate-100 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="py-2.5 px-4 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleProceedToPayment}
                className="flex-1 py-2.5 rounded-full bg-[#006388] hover:bg-[#007dab] active:scale-95 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Pay ₹{total} Now</span>
              </button>
            </div>
          </>
        )}

        {/* 3. SIMULATED PAYMENT PROCESSING GATEWAY */}
        {checkoutStep === 'processing' && (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-[#006388] animate-spin"></div>
              <Lock className="w-7 h-7 text-[#006388] animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Processing Secure Payment</h3>
              <p className="text-xs text-slate-500">Please do not press back or refresh</p>
            </div>

            {/* Multi-stage animation tracker */}
            <div className="max-w-xs mx-auto p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-left text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${processingStage >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                  ✓
                </span>
                <span className="text-[11px] font-semibold text-slate-800">Connecting to Payment Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${processingStage >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600 animate-pulse'}`}>
                  {processingStage >= 2 ? '✓' : '•'}
                </span>
                <span className="text-[11px] font-semibold text-slate-800">Verifying Bank Authorization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${processingStage >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {processingStage >= 3 ? '✓' : '•'}
                </span>
                <span className="text-[11px] font-semibold text-slate-800">Generating Verified Invoice</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">Total transaction amount: ₹{total}</p>
          </div>
        )}

        {/* 4. PAYMENT SUCCESSFUL & TRANSACTION STATUS RECEIPT */}
        {checkoutStep === 'success' && transactionDetails && (
          <div className="p-5 overflow-y-auto no-scrollbar space-y-4 my-auto">
            {/* Success Icon & Heading */}
            <div className="text-center space-y-1.5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-emerald-700 font-semibold">Transaction Status: COMPLETED (Captured)</p>
            </div>

            {/* Official Digital Tax Invoice / Transaction Card */}
            <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-slate-200 text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-400 text-[10px] font-semibold uppercase">Payment Summary</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  PAID
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-900">{transactionDetails.txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank UTR Ref:</span>
                  <span className="font-mono font-medium text-slate-800">{transactionDetails.utrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-medium text-slate-800">{transactionDetails.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-medium text-slate-800">{transactionDetails.paymentModeName}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200/80">
                  <span className="font-bold text-slate-800">Amount Transacted:</span>
                  <span className="font-extrabold text-slate-900 text-xs">₹{transactionDetails.paidAmount}</span>
                </div>
              </div>
            </div>

            {/* Delivery / Order ETA Alert */}
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-[11px] text-[#004c6a] flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-[#007dab] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">15-Min Express Delivery Dispatched</span>
                <span className="text-slate-600">Your order has been routed to our licensed Indiranagar healthcare hub. Delivery partner assigned.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  alert(`CarePulse Tax Invoice #${transactionDetails.txnId}\nTotal: ₹${transactionDetails.paidAmount}\nStatus: Paid via ${transactionDetails.paymentModeName}\nRecipient: Arjun Sharma (Indiranagar, Bengaluru)\nDownloaded successfully to device.`);
                }}
                className="w-full py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Invoice PDF</span>
              </button>

              <button
                onClick={() => {
                  onClearCart();
                  onClose();
                }}
                className="w-full py-2.5 rounded-full bg-[#006388] text-white font-bold text-xs shadow-md hover:bg-[#007dab] active:scale-95 transition-all"
              >
                Done • Return to Care Hub
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
