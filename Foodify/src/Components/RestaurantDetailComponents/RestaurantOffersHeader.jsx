import OfferSearchBar from "./OfferSearchBar";

function RestaurantOffersHeader({ restaurantName, searchValue, onSearchChange }) {
  return (
    <div className="flex w-full flex-col md:flex-row md:items-center gap-4 px-6">
      <h2 className="text-2xl md:text-[32px] font-bold text-black font-poppins">
        All Offers from {restaurantName}
      </h2>
      <div className="md:ml-auto">
        <OfferSearchBar value={searchValue} onChange={onSearchChange} />
      </div>
    </div>
  );
}

export default RestaurantOffersHeader;