import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function MenuItemCard({ image, name, price, restaurantName, onClick }) {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // don't also trigger the card's own onClick (navigation)
    navigate('/cart');
  };

  return (
    <div
      onClick={onClick}
      className="w-full text-left rounded-xl overflow-hidden shadow-sm bg-brand-orange font-poppins
                 cursor-pointer transition-transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-brand-orange"
    >
      <div className="w-full rounded-xl overflow-hidden shadow-sm bg-white font-poppins">
        {image ? (
          <img src={image} alt={name} className="w-full h-[160px] object-cover" />
        ) : (
          <div className="w-full h-[160px] bg-black/5 flex items-center justify-center text-black/20 text-[13px]">
            No image
          </div>
        )}
        <div className="px-3 py-3">
          <p className="text-black font-bold text-base truncate">{name}</p>
          <p className="text-black/50 text-sm truncate mt-0.5">{restaurantName}</p>

          <div className="flex items-center justify-between mt-2">
            <p className="text-[#fc8a06] font-bold text-sm">Rs. {price}</p>

            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${name} to cart`}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-brand-orange text-white hover:bg-[#e07a00] active:scale-95 transition-all"
            >
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;