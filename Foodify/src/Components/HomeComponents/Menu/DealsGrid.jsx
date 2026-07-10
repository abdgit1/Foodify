import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DealCard from "./DealCard";
import { getAllDeals } from "../../../services/dealService";

function DealsGrid() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadDeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllDeals();
        if (!isCancelled) setDeals(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadDeals();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Tabs are derived from the actual categories present in the fetched deals —
  // "All" is always first, then whatever real category names show up.
  const tabs = useMemo(() => {
    const names = new Set();
    deals.forEach((deal) => deal.categoryNames.forEach((name) => names.add(name)));
    return ["All", ...Array.from(names)];
  }, [deals]);

  const visibleDeals = useMemo(() => {
    if (activeTab === "All") return deals;
    return deals.filter((deal) => deal.categoryNames.includes(activeTab));
  }, [deals, activeTab]);

  return (
    <section className="px-6 py-8">
      <div className="flex items-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          🎊 Order.uk exclusive deals
        </h2>

        {/* Mobile: dropdown */}
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="lg:hidden ml-auto mb-4 border border-orange-500 rounded-full px-4 py-2 text-sm font-medium text-black bg-white"
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab}>{tab}</option>
          ))}
        </select>

        <nav className="hidden lg:flex flex-wrap justify-end gap-1 mb-4 ml-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? "border border-orange-500 bg-white font-bold text-black"
                  : "border border-transparent font-medium text-gray-700 hover:bg-black/5 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {loading && (
        <p className="text-black/50 text-[15px]">Loading deals…</p>
      )}

      {error && (
        <p className="text-red-500 text-[15px]">
          Couldn't load deals right now. ({error})
        </p>
      )}

      {!loading && !error && visibleDeals.length === 0 && (
        <p className="text-black/50 text-[15px]">No deals in this category yet.</p>
      )}

      {!loading && !error && visibleDeals.length > 0 && (
        <>
          {/* Mobile: horizontal sliding row */}
          <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {visibleDeals.map((deal) => (
              <DealCard
                key={deal.id}
                {...deal}
                compact
                onClick={() => navigate(`/deals/${deal.id}`)}
              />
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden lg:grid grid-cols-3 gap-5">
            {visibleDeals.map((deal) => (
              <DealCard
                key={deal.id}
                {...deal}
                onClick={() => navigate(`/deals/${deal.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default DealsGrid;