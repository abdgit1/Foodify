import OfferCard from "./OfferCard";

const offers = [
  {
    id: 1,
    image: "/src/assets/offer1.png",
    restaurantLabel: "Restaurant",
    title: "Chef Burgers London",
    discount: "-40%",
    },
  {
    id: 2,
    image: "/src/assets/offer2.png",
    restaurantLabel: "Restaurant",
    title: "Grand Ai Cafe London",
    discount: "-20%",
    },
  {
    id: 3,
    image: "/src/assets/offer3.png",
    restaurantLabel: "Restaurant",
    title: "Butterbrot Café London",
    discount: "-17%",
    },
];

function OffersGrid({ onAddOffer, onSelectOffer }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-6 py-6">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onAdd={() => onAddOffer(offer)}
          onSelect={() => onSelectOffer(offer)}
        />
      ))}
    </div>
  );
}

export default OffersGrid