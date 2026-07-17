import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Checkout from "../../Components/Cart/checkout";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../../services/cartService";
import { useAuthModal } from "../../context/AuthModalContext";
import Navbar from "../../Components/CommonComponents/Navbar";
import Footer from "../../Components/CommonComponents/Footer";

// Maps the backend cart item shape to what <Checkout> expects.
function toCheckoutItem(item) {
  return {
    id: item.id,
    title: item.name,
    description: item.restaurant,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  };
}

export default function Cart() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { openLogin } = useAuthModal();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;

    let isCancelled = false;

    const loadCart = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const cart = await getCart();
        if (!isCancelled) setCartItems(cart.items.map(toCheckoutItem));
      } catch (err) {
        if (!isCancelled) setLoadError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadCart();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated]);

  // Shared helper: optimistically apply `updater`, call the backend, and
  // roll back + surface an alert if the request fails.
  const mutateItem = async (id, updater, request) => {
    const previousItems = cartItems;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? updater(item) : item))
    );
    try {
      await request();
    } catch (err) {
      setCartItems(previousItems);
      alert(`Couldn't update your cart: ${err.message}`);
    }
  };

  const handleRemove = async (id) => {
    const previousItems = cartItems;
    setCartItems((items) => items.filter((item) => item.id !== id));
    try {
      await removeCartItem(id);
    } catch (err) {
      setCartItems(previousItems);
      alert(`Couldn't remove item: ${err.message}`);
    }
  };

  const handleIncrease = (id) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;
    const newQuantity = target.quantity + 1;
    mutateItem(
      id,
      (item) => ({ ...item, quantity: newQuantity }),
      () => updateCartItemQuantity(id, newQuantity)
    );
  };

  const handleDecrease = (id) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;

    if (target.quantity <= 1) {
      handleRemove(id);
      return;
    }

    const newQuantity = target.quantity - 1;
    mutateItem(
      id,
      (item) => ({ ...item, quantity: newQuantity }),
      () => updateCartItemQuantity(id, newQuantity)
    );
  };

  const handleConfirm = () => {
    navigate("/checkout");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-brand-dark">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-black/60 dark:text-white/60 text-[15px] text-center">
            Log in to see what's in your cart.
          </p>
          <button
            onClick={openLogin}
            className="h-[46px] px-8 rounded-full bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-all"
          >
            Log In
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-brand-dark">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-black/50 dark:text-white/50 text-[15px]">
            Loading your cart…
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-brand-dark">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-[15px]">
            Couldn't load your cart right now. ({loadError})
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-brand-dark">
      <Navbar />
      <div className="flex-1">
        <Checkout
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          confirm={handleConfirm}
          buttonText="Proceed to Checkout"
        />
      </div>
      <Footer />
    </div>
  );
}