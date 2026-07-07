function OfferSearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 border border-[#03081f] rounded-full px-5 py-3 w-full max-w-[344px]">
      <svg className="w-5 h-5 text-[#03081f] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search from menu..."
        className="bg-transparent outline-none text-black placeholder-gray-500 w-full font-poppins"
      />
    </div>
  );
}

export default OfferSearchBar;