function OfferCard({ image, restaurantLabel, title, discount, onAdd, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="relative text-left rounded-xl overflow-hidden w-full h-[220px] sm:h-[260px] md:h-[325px]
                 font-poppins cursor-pointer hover:scale-[1.01] transition-transform
                 focus:outline-none focus:ring-2 focus:ring-[#fc8a06]"
    >
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(235deg, rgba(255,255,255,0) 1%, rgba(3,8,31,0.19) 52%, rgba(3,8,31,0.89) 88%)",
        }}
      />

      <div className="absolute top-0 right-0 bg-[#03081f] w-[70px] h-[54px] md:w-[88px] md:h-[66px] rounded-bl-xl flex items-center justify-center">
        <span className="text-white font-bold text-sm md:text-lg">{discount}</span>
      </div>

      <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 max-w-[70%]">
        <p className="text-[#fc8a06] font-medium text-sm md:text-lg">
          {restaurantLabel}
        </p>
        <p className="text-white font-bold text-xl md:text-3xl">{title}</p>
      </div>

      <span
        role="button"
        aria-label="Add offer"
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
        className="absolute bottom-0 right-0 bg-white/90 w-[75px] h-[68px] md:w-[97px] md:h-[89px]
                   rounded-tl-[35px] md:rounded-tl-[45px] rounded-br-xl
                   flex items-center justify-center
                   cursor-pointer hover:bg-white transition-colors"
      >
        <div className="w-8.5 h-8.5 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-3xl md:text-4xl font-bold leading-none">
            +
          </span>
        </div>
      </span>
    </button>
  );
}

export default OfferCard;