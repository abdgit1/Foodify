function DealCard({ image, name, restaurantLabel, discount, compact = false }) {
  if (compact) {
    // Mobile version: matches Figma's small square card + text below
    return (
      <div className="flex-shrink-0 w-[150px] font-poppins snap-start">
        <div className="relative w-[150px] h-[150px] rounded-xl overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 bg-[#03081f] px-2 py-1 rounded-br-xl">
            <span className="text-white font-bold text-xs">{discount}</span>
          </div>
        </div>
        <p className="text-black text-xs mt-2">{restaurantLabel}</p>
        <p className="text-black font-bold text-sm leading-tight">{name}</p>
      </div>
    );
  }

  // Desktop version: unchanged, the overlay-gradient card you already built
  return (
    <div className="relative rounded-xl overflow-hidden w-full h-[325px] font-poppins">
      <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(235deg, rgba(255,255,255,0) 1%, rgba(3,8,31,0.19) 52%, rgba(3,8,31,0.89) 88%)',
        }}
      />
      <div className="absolute top-0 right-0 bg-[#03081f] w-[88px] h-[66px] rounded-bl-xl flex items-center justify-center">
        <span className="text-white font-bold text-lg">{discount}</span>
      </div>
      <div className="absolute left-6 bottom-6">
        <p className="text-[#fc8a06] font-medium text-lg">{restaurantLabel}</p>
        <p className="text-white font-bold text-2xl">{name}</p>
      </div>
    </div>
  );
}

export default DealCard;