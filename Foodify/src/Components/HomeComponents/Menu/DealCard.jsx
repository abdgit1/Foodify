function DealCard({ id, image, name, restaurantLabel, comboPrice, compact = false, onClick }) {
  if (compact) {
    // Mobile version: matches Figma's small square card + text below
    return (
      <div
        onClick={onClick}
        className="flex-shrink-0 w-[150px] font-poppins snap-start cursor-pointer"
      >
        <div className="relative w-[150px] h-[150px] rounded-xl overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-black/5 flex items-center justify-center text-black/20 text-[12px]">
              No image
            </div>
          )}
          <div className="absolute top-0 left-0 bg-[#03081f] px-2 py-1 rounded-br-xl">
            <span className="text-white font-bold text-xs">${Number(comboPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <p className="text-black text-xs mt-2">{restaurantLabel}</p>
        <p className="text-black font-bold text-sm leading-tight">{name}</p>
      </div>
    );
  }

  // Desktop version: unchanged visual style, discount badge swapped for combo price
  return (
    <div
      onClick={onClick}
      className="relative rounded-xl overflow-hidden w-full h-[325px] font-poppins cursor-pointer"
    >
      {image ? (
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-black/10 flex items-center justify-center text-black/30 text-sm">
          No image
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(235deg, rgba(255,255,255,0) 1%, rgba(3,8,31,0.19) 52%, rgba(3,8,31,0.89) 88%)',
        }}
      />
      <div className="absolute top-0 right-0 bg-[#03081f] px-4 h-[66px] rounded-bl-xl flex items-center justify-center">
        <span className="text-white font-bold text-lg whitespace-nowrap">${Number(comboPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="absolute left-6 bottom-6">
        <p className="text-[#fc8a06] font-medium text-lg">{restaurantLabel}</p>
        <p className="text-white font-bold text-2xl">{name}</p>
      </div>
    </div>
  );
}

export default DealCard;