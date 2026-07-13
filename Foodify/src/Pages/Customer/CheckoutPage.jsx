import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Wallet, Check, Hash } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Form State (matching backend inputs)
  const [address, setAddress] = useState("Flat 302, Green Apartments, Lahore");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Pricing (Simplified total calculation - no discounts/fees)
  const subTotal = 1220; // Mock subtotal for UI presentation
  const total = subTotal;

  const paymentOptions = [
    { id: "cash", label: "Cash on Delivery", icon: Wallet, desc: "Pay with cash upon delivery" },
    { id: "stripe", label: "Credit Card (Stripe)", icon: CreditCard, desc: "Pay securely with credit card" },
    { id: "easypaisa", label: "EasyPaisa", icon: Wallet, desc: "Pay via EasyPaisa mobile wallet" },
    { id: "jazzcash", label: "JazzCash", icon: Wallet, desc: "Pay via JazzCash mobile wallet" },
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }
    if (paymentMethod !== "cash" && !transactionId.trim()) {
      alert("Transaction ID is required for card and wallet payments.");
      return;
    }

    alert(
      `Order placed successfully!\n\n` +
      `Delivery Address: ${address}\n` +
      `Payment Method: ${paymentMethod.toUpperCase()}\n` +
      `${paymentMethod !== "cash" ? `Transaction ID: ${transactionId}\n` : ""}` +
      `Total Payment: Rs. ${total.toFixed(2)}`
    );
    navigate("/#popular-restaurants");
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] dark:bg-brand-dark px-4 lg:px-6 py-8 lg:py-10 font-sans">
      <div className="w-full mx-auto" style={{ maxWidth: "1100px" }}>
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-[13px] font-semibold text-black/50 dark:text-white/50 hover:text-[#fc8a06] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={15} />
          Back to Cart
        </button>

        <h1 className="text-[28px] lg:text-[32px] font-extrabold text-[#03081F] dark:text-white mb-8">
          Checkout Details
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Form & Payments */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Delivery Details */}
            <div className="bg-white dark:bg-[#0a0f2e] rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-[18px] font-bold text-[#03081F] dark:text-white mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-[#fc8a06]" />
                Delivery Information
              </h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-black/45 dark:text-white/45 uppercase tracking-wider">
                  Delivery Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, apartment, city, etc."
                  className="w-full p-4 rounded-lg border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-[#fc8a06] focus:outline-none text-[14px] resize-none"
                />
              </div>
            </div>

            {/* 2. Payment Selector */}
            <div className="bg-white dark:bg-[#0a0f2e] rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-[18px] font-bold text-[#03081F] dark:text-white mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-[#fc8a06]" />
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#fc8a06] bg-[#fc8a06]/5 dark:bg-[#fc8a06]/10"
                          : "border-black/5 dark:border-white/5 bg-transparent hover:border-black/15 dark:hover:border-white/15"
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg ${isSelected ? "bg-[#fc8a06] text-white" : "bg-black/5 dark:bg-white/5 text-black/45 dark:text-white/45"}`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 pr-6">
                        <p className="font-bold text-[14px] text-[#03081F] dark:text-white">
                          {opt.label}
                        </p>
                        <p className="text-[12px] text-black/50 dark:text-white/50 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute right-4 top-4 w-5 h-5 rounded-full bg-[#fc8a06] flex items-center justify-center text-white">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Conditional Transaction ID Input */}
              {paymentMethod !== "cash" && (
                <div className="flex flex-col gap-1.5 mt-6 border-t border-black/5 dark:border-white/5 pt-6">
                  <label className="text-[12px] font-bold text-black/45 dark:text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                    <Hash size={14} className="text-[#fc8a06]" />
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter transaction receipt / gateway ID"
                    className="w-full h-[46px] rounded-lg border border-black/10 dark:border-white/10 px-4 bg-transparent text-black dark:text-white focus:border-[#fc8a06] focus:outline-none text-[14px]"
                  />
                  <p className="text-[12px] text-black/45 dark:text-white/45">
                    Provide the transaction code from your card or mobile wallet confirmation receipt.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Checkout Summary Card */}
          <div className="h-fit rounded-[16px] bg-white dark:bg-[#0a0f2e] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] p-6">
            <h2 className="text-[20px] font-bold text-[#03081F] dark:text-white mb-5">
              Summary
            </h2>

            <div className="flex flex-col gap-3 text-[14px] mb-6">
              <div className="flex justify-between text-black/60 dark:text-white/60">
                <span>Items Subtotal</span>
                <span>Rs. {subTotal.toFixed(2)}</span>
              </div>

              <div className="h-px bg-black/10 dark:bg-white/10 my-2" />

              <div className="flex justify-between text-[18px] font-extrabold text-[#03081F] dark:text-white">
                <span>Total Payment</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[52px] rounded-full bg-[#fc8a06] text-white font-bold text-[16px] hover:bg-[#e07a00] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              Place Order
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
