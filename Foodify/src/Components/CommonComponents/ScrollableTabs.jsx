import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TAB_VARIANTS = {
  outline: {
    active:
      "border border-orange-500 bg-white font-bold text-black",
    inactive:
      "border border-transparent font-medium text-gray-700 hover:bg-black/5 hover:text-black",
  },
  filled: {
    active: "bg-[#03081f] text-white",
    inactive: "bg-transparent text-black hover:bg-black/5",
  },
};

function ScrollableTabs({
  tabs,
  activeTab,
  onSelect,
  variant = "outline",
  ariaLabel = "Categories",
  className = "",
  buttonClassName = "",
  fadeFrom = "white",
}) {
  const scrollRef = useRef(null);
  const tabRefs = useRef({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const styles = TAB_VARIANTS[variant] ?? TAB_VARIANTS.outline;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [tabs, updateScrollState]);

  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab, tabs]);

  const scrollBy = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction * 240,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${className}`}>
      {canScrollLeft && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10"
            style={{
              background: `linear-gradient(to right, ${fadeFrom}, transparent)`,
            }}
          />
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-black/5"
          >
            <ChevronLeft size={18} />
          </button>
        </>
      )}

      {canScrollRight && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10"
            style={{
              background: `linear-gradient(to left, ${fadeFrom}, transparent)`,
            }}
          />
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-black/5"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <nav
        ref={scrollRef}
        aria-label={ariaLabel}
        className="flex items-center gap-2 overflow-x-auto pb-1 px-1 scrollbar-hide scroll-smooth"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={(node) => {
              tabRefs.current[tab] = node;
            }}
            type="button"
            onClick={() => onSelect(tab)}
            className={`shrink-0 rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer transition-all duration-300 ${buttonClassName} ${
              activeTab === tab ? styles.active : styles.inactive
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default ScrollableTabs;
