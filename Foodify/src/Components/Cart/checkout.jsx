import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export default function Checkout({ confirm, cartItems, onIncrease, onDecrease, onRemove, buttonText = "Place Order" }) {
  const navigate = useNavigate();

  const subTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const total = subTotal;

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white dark:bg-brand-dark">
        <div className="w-[72px] h-[72px] rounded-full bg-[#fc8a06]/10 flex items-center justify-center mb-5">
          <ShoppingCart size={30} className="text-[#fc8a06]" />
        </div>
        <h1 className="text-[26px] font-extrabold text-[#03081F] dark:text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-black/50 dark:text-white/50 text-[15px]">
          Add some delicious food to get started.
        </p>
        <button
          onClick={() => navigate("/#popular-restaurants")}
          className="mt-6 h-[48px] px-8 rounded-full bg-[#fc8a06] text-white font-bold text-[15px] hover:bg-[#e07a00] active:scale-[0.98] transition-all"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-brand-dark px-4 lg:px-6 py-8 lg:py-10">
      <div className="w-full mx-auto" style={{ maxWidth: "1100px" }}>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[13px] font-semibold text-black/50 dark:text-white/50 hover:text-[#fc8a06] transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <h1 className="text-[28px] lg:text-[32px] font-extrabold text-[#03081F] dark:text-white mb-8">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: cart items ── */}
          <div className="lg:col-span-2 rounded-[16px] bg-[#fbfbfb] dark:bg-[#0a0f2e] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="flex items-center gap-3 font-bold text-[#03081F] dark:text-white px-6 py-5 border-b border-black/5 dark:border-white/10">
              <ShoppingCart size={18} className="text-[#fc8a06]" />
              My Cart ({cartItems.length})
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-black/5 dark:border-white/10 last:border-b-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-[88px] h-[72px] rounded-[10px] overflow-hidden bg-black/5 dark:bg-white/10 shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 text-[10px]">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[#03081F] dark:text-white truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[13px] text-black/45 dark:text-white/45 truncate mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                  {/* Quantity pill */}
                  <div className="flex items-center gap-3 rounded-full border border-black/10 dark:border-white/15 px-3 py-1.5">
                    <button
                      onClick={() => onDecrease(item.id)}
                      aria-label="Decrease quantity"
                      className="text-black/60 dark:text-white/60 hover:text-[#fc8a06] transition-colors"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="text-[14px] font-bold text-[#03081F] dark:text-white w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrease(item.id)}
                      aria-label="Increase quantity"
                      className="text-black/60 dark:text-white/60 hover:text-[#fc8a06] transition-colors"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <span className="font-bold text-[15px] text-[#03081F] dark:text-white whitespace-nowrap">
                    ${(Number(item.price) * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>

                  <button
                    onClick={() => onRemove(item.id)}
                    aria-label="Remove item"
                    className="text-black/30 dark:text-white/30 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: order summary ── */}
          <div className="h-fit rounded-[16px] bg-[#fbfbfb] dark:bg-[#0a0f2e] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] p-6">
            <h2 className="text-[20px] font-bold text-[#03081F] dark:text-white mb-5">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between text-black/60 dark:text-white/60">
                <span>Subtotal</span>
                <span>${subTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="h-px bg-black/10 dark:bg-white/10 my-2" />

              <div className="flex justify-between text-[18px] font-extrabold text-[#03081F] dark:text-white">
                <span>Total</span>
                <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              onClick={confirm}
              className="w-full h-[52px] mt-6 rounded-full bg-[#fc8a06] text-white font-bold text-[16px] hover:bg-[#e07a00] active:scale-[0.98] transition-all"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}