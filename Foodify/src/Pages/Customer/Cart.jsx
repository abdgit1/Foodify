import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "../../Components/cart/Checkout";

const CART_STORAGE_KEY = "UserCart";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    setCartItems(storedCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  const handleIncrease = (id) => {
    saveCart(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;

    if (target.quantity > 1) {
      saveCart(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      handleRemove(id);
    }
  };

  const handleRemove = (id) => {
    saveCart(cartItems.filter((item) => item.id !== id));
  };

  // Was never actually passed to <Checkout> before — that's why "Place Order" did nothing.
  // TODO (Phase: real backend): this should call POST /order/checkout/ instead of
  // just clearing localStorage — for now it just simulates a successful order.
  const handleConfirm = () => {
    saveCart([]);
    navigate("/orders/track");
  };

  return (
    <Checkout
      cartItems={cartItems}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onRemove={handleRemove}
      confirm={handleConfirm}
    />
  );
}