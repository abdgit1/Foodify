import React from "react";
import OfferCard from "./OfferCard";
import { Loader2 } from "lucide-react";

function OffersGrid({ deals = [], loading, error, onAddOffer, onSelectOffer }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-black/40 dark:text-white/40">
        <Loader2 size={24} className="animate-spin mr-2" />
        <span>Loading deals…</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 font-semibold px-6 py-4">
        Failed to load deals. ({error})
      </p>
    );
  }

  if (deals.length === 0) {
    return (
      <p className="text-black/40 dark:text-white/40 px-6 py-4 font-medium text-[15px]">
        No active deals found for this restaurant.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-6 py-6">
      {deals.map((deal) => (
        <OfferCard
          key={deal.id}
          image={deal.image}
          restaurantLabel={deal.restaurantLabel}
          title={deal.name}
          price={deal.comboPrice}
          onAdd={() => onAddOffer && onAddOffer(deal)}
          onSelect={() => onSelectOffer && onSelectOffer(deal)}
        />
      ))}
    </div>
  );
}

export default OffersGrid;