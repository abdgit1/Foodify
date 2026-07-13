import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "../../Components/Cart/checkout";

const MOCK_CART_ITEMS = [
  {
    id: 1,
    title: "Royal Cheese Burger",
    description: "Juicy beef patty, cheddar cheese, pickles, mustard, and ketchup.",
    price: 550,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    title: "Cold Coca Cola",
    description: "Chilled 330ml can.",
    price: 120,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);
  const navigate = useNavigate();

  const handleIncrease = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;

    if (target.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      handleRemove(id);
    }
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    navigate("/checkout");
  };

  return (
    <Checkout
      cartItems={cartItems}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onRemove={handleRemove}
      confirm={handleConfirm}
      buttonText="Proceed to Checkout"
    />
  );
}