function DealCard({ image, discount, restaurantLabel, name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl overflow-hidden shadow-sm bg-brand-orange font-poppins
                 cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-orange"
    >
      <div className="relative rounded-xl overflow-hidden w-full h-[325px] font-poppins">
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />

        {/* diagonal dark gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundImage:
              'linear-gradient(235deg, rgba(255,255,255,0) 1%, rgba(3,8,31,0.19) 52%, rgba(3,8,31,0.89) 88%)',
          }}
        />

        {/* discount badge, top-right, flush corner, rounded bottom only */}
        <div className="absolute top-0 right-0 bg-[#03081f] w-[88px] h-[66px] rounded-bl-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">{discount}</span>
        </div>

        {/* text block, bottom-left */}
        <div className="absolute left-[24px] bottom-[24px]">
          <p className="text-[#fc8a06] font-medium text-lg">{restaurantLabel}</p>
          <p className="text-white font-bold text-2xl">{name}</p>
        </div>
      </div>
    </button>
  );
}

export default DealCard;