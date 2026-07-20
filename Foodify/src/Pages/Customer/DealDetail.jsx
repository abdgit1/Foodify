import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDealById } from '../../services/dealService';
import { addToCart } from '../../services/cartService';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import { useSelector } from 'react-redux';
import { useAuthModal } from '../../context/AuthModalContext';


const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { openLogin } = useAuthModal();

  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadDeal = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDealById(id);
        if (!isCancelled) setDeal(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadDeal();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="px-6 py-20 text-center text-black/50">Loading deal…</div>;
  }

  if (error || !deal) {
    return (
      <div className="px-6 py-20 text-center text-red-500">
        {error || 'Deal not found.'}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="px-6 py-8 max-w-[900px] mx-auto">
        {/* Hero image */}
        <div className="w-full h-[280px] rounded-xl overflow-hidden bg-black/5">
          {deal.image ? (
            <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-black/20 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-[#fc8a06] font-semibold">{deal.restaurantLabel}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-1">{deal.name}</h1>
          <p className="text-black/60 mt-2">{deal.description}</p>
          <p className="text-[#fc8a06] font-bold text-xl mt-3">${Number(deal.comboPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>

        {/* Included items */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3">What's included</h2>

          {deal.items.length === 0 ? (
            <p className="text-black/50 text-sm">No item breakdown available for this deal.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {deal.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-[#fbfbfb] rounded-xl p-3"
                >
                  <div className="w-[56px] h-[56px] rounded-lg overflow-hidden bg-black/5 shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 text-[10px]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-black">
                      {item.quantity}× {item.name}
                    </p>
                    <p className="text-black/50 text-sm">{item.restaurantName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={async () => {
            

            if (adding) return;

            if (!isAuthenticated) {
              openLogin();
              return;
            }
            setAdding(true);
            try {
              await addToCart({ dealId: deal.id });
              navigate('/cart');
            } catch (err) {
              alert(`Couldn't add "${deal.name}" to your cart: ${err.message}`);
            } finally {
              setAdding(false);
            }
          }}
          disabled={adding}
          className="w-full h-[52px] mt-8 rounded-full bg-[#fc8a06] text-white font-bold text-[16px] hover:bg-[#e07a00] active:scale-[0.98] transition-all shadow-md disabled:opacity-60"
        >
          {adding ? 'Adding…' : 'Add to Cart'}
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default DealDetail;