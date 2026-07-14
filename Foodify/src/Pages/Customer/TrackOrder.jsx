import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Clock,
  Info,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Store,
  Hourglass,
  ChefHat,
  Bell,
  Bike,
  CheckCircle2,
  Utensils,
  ArrowLeft,
  X,
  AlertCircle
} from "lucide-react";

import Navbar from "../../Components/CommonComponents/Navbar";
import Footer from "../../Components/CommonComponents/Footer";
import { getUserOrders, getOrderDetails, cancelOrder } from "../../services/orderService";
import { getRestaurantById } from "../../services/restaurantservices";
import { useAuthModal } from "../../context/AuthModalContext";

import trackHero1 from "../../assets/Track_Hero1.png";
import trackHero2 from "../../assets/Track_Hero2.png";

// High-fidelity fallback orders matching the screenshot and backend schema with unified Rs. currency
const MOCK_ORDERS = [
  {
    order_id: 87654321,
    restaurant: {
      id: 1,
      name: "Tandoori Pizza London"
    },
    items: [
      {
        id: 201,
        name: "Margherita Pizza",
        image: "",
        type: "menu_item",
        quantity: 2,
        price_at_order: "799",
        subtotal: 1598
      },
      {
        id: 202,
        name: "Tandoori Paneer Pizza",
        image: "",
        type: "menu_item",
        quantity: 1,
        price_at_order: "1299",
        subtotal: 1299
      },
      {
        id: 203,
        name: "Coca Cola",
        image: "",
        type: "menu_item",
        quantity: 2,
        price_at_order: "139",
        subtotal: 278
      }
    ],
    total_price: "3175",
    current_status: "preparing",
    delivery_address: "8 Picketts Lock, All Souls, Hertford Hertfordshire, SG14 1BB, UK",
    status_history: [
      { status: "pending", timestamp: "2026-07-14T12:45:00Z" },
      { status: "accepted", timestamp: "2026-07-14T12:48:00Z" },
      { status: "preparing", timestamp: "2026-07-14T12:52:00Z" }
    ],
    created_at: "2026-07-14T12:45:00Z",
    updated_at: "2026-07-14T12:52:00Z"
  },
  {
    order_id: 87543210,
    restaurant: {
      id: 2,
      name: "Golden Dragon"
    },
    items: [
      {
        id: 204,
        name: "Kung Pao Chicken",
        image: "",
        type: "menu_item",
        quantity: 1,
        price_at_order: "1399",
        subtotal: 1399
      }
    ],
    total_price: "1399",
    current_status: "delivered",
    delivery_address: "Flat 302, Green Apartments, Lahore",
    status_history: [
      { status: "pending", timestamp: "2026-07-12T19:00:00Z" },
      { status: "accepted", timestamp: "2026-07-12T19:05:00Z" },
      { status: "preparing", timestamp: "2026-07-12T19:15:00Z" },
      { status: "out_for_delivery", timestamp: "2026-07-12T19:25:00Z" },
      { status: "delivered", timestamp: "2026-07-12T19:30:00Z" }
    ],
    created_at: "2026-07-12T19:00:00Z",
    updated_at: "2026-07-12T19:30:00Z"
  },
  {
    order_id: 87432109,
    restaurant: {
      id: 3,
      name: "Burger Craft"
    },
    items: [
      {
        id: 205,
        name: "Royal Cheese Burger",
        image: "",
        type: "menu_item",
        quantity: 2,
        price_at_order: "650",
        subtotal: 1300
      }
    ],
    total_price: "1300",
    current_status: "delivered",
    delivery_address: "Flat 302, Green Apartments, Lahore",
    status_history: [
      { status: "pending", timestamp: "2026-07-11T13:00:00Z" },
      { status: "accepted", timestamp: "2026-07-11T13:05:00Z" },
      { status: "preparing", timestamp: "2026-07-11T13:12:00Z" },
      { status: "out_for_delivery", timestamp: "2026-07-11T13:20:00Z" },
      { status: "delivered", timestamp: "2026-07-11T13:30:00Z" }
    ],
    created_at: "2026-07-11T13:00:00Z",
    updated_at: "2026-07-11T13:30:00Z"
  }
];

export default function TrackOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetId = searchParams.get("id");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { openLogin } = useAuthModal();

  // States
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  // Demo preview mode toggle
  const [demoMode, setDemoMode] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // Fetch all orders
  useEffect(() => {
    let active = true;

    async function loadOrders() {
      // Demo Mode preview path
      if (demoMode) {
        if (active) {
          setOrders(MOCK_ORDERS);
          const selectOrder = targetId
            ? MOCK_ORDERS.find(o => String(o.order_id) === String(targetId)) || MOCK_ORDERS[0]
            : MOCK_ORDERS[0];
          setActiveOrder(selectOrder);
          setLoading(false);
        }
        return;
      }

      // Guest / Unauthenticated State
      if (!isAuthenticated) {
        if (active) {
          setOrders([]);
          setActiveOrder(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setOrdersError(null);

      try {
        const apiOrders = await getUserOrders();
        if (active) {
          setOrders(apiOrders || []);
          if (apiOrders && apiOrders.length > 0) {
            // Select active order
            const selectOrder = targetId
              ? apiOrders.find(o => String(o.order_id || o.id) === String(targetId)) || apiOrders[0]
              : apiOrders[0];
            setActiveOrder(selectOrder);
          } else {
            setActiveOrder(null);
          }
        }
      } catch (err) {
        console.error("Error fetching user orders:", err);
        if (active) {
          setOrdersError(err.message || "Failed to load orders from the server.");
          setOrders([]);
          setActiveOrder(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      active = false;
    };
  }, [isAuthenticated, targetId, demoMode]);

  // Fetch restaurant details for active order to enrich UI (images, description)
  useEffect(() => {
    if (!activeOrder?.restaurant?.id) {
      setRestaurantDetails(null);
      return;
    }

    let active = true;
    async function loadRestaurant() {
      try {
        const details = await getRestaurantById(activeOrder.restaurant.id);
        if (active) {
          setRestaurantDetails(details);
        }
      } catch (err) {
        console.error("Could not fetch restaurant details:", err);
        if (active) {
          setRestaurantDetails(null);
        }
      }
    }

    loadRestaurant();

    return () => {
      active = false;
    };
  }, [activeOrder]);

  // Format Helper: status timestamp extraction
  const getStatusTime = (statusName) => {
    if (!activeOrder?.status_history) return null;
    const historyItem = activeOrder.status_history.find(
      (h) => h.status.toLowerCase() === statusName.toLowerCase()
    );
    if (!historyItem?.timestamp) return null;

    return new Date(historyItem.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  // Format Helper: date format for order list
  const formatOrderDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    return `${day} ${month}, ${year} at ${time}`;
  };

  // Copy Order ID to Clipboard
  const handleCopyId = (e, orderId) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(orderId));
    setCopiedId(orderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Cancel active order handler
  const handleCancelOrder = async () => {
    if (!activeOrder) return;
    const orderId = activeOrder.order_id || activeOrder.id;
    if (!window.confirm(`Are you sure you want to cancel Order #ORD${orderId}?`)) return;

    setCancelling(true);
    try {
      if (demoMode) {
        // Mock cancellation update
        const updated = {
          ...activeOrder,
          current_status: "cancelled",
          status_history: [
            ...(activeOrder.status_history || []),
            { status: "cancelled", timestamp: new Date().toISOString() }
          ]
        };
        setActiveOrder(updated);
        setOrders(prev => prev.map(o => (String(o.order_id || o.id) === String(orderId) ? updated : o)));
        alert("Demo Order cancelled successfully!");
      } else {
        // Real API cancellation call
        await cancelOrder(orderId);
        const updated = {
          ...activeOrder,
          current_status: "cancelled",
          status_history: [
            ...(activeOrder.status_history || []),
            { status: "cancelled", timestamp: new Date().toISOString() }
          ]
        };
        setActiveOrder(updated);
        setOrders(prev => prev.map(o => (String(o.order_id || o.id) === String(orderId) ? updated : o)));
        alert("Order cancelled successfully!");
      }
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert(`Failed to cancel order: ${err.message}`);
    } finally {
      setCancelling(false);
    }
  };

  // Status mapping logic for step highlighting
  const statuses = ["pending", "accepted", "preparing", "out_for_delivery", "delivered"];
  const currentStatusIndex = statuses.indexOf(activeOrder?.current_status?.toLowerCase() || "pending");
  const isCancelled = activeOrder?.current_status?.toLowerCase() === "cancelled";

  // Alert message mapping
  const getStatusAlertMessage = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Your order is pending confirmation from the restaurant.";
      case "accepted":
        return "Your order has been accepted by the restaurant.";
      case "preparing":
        return "Your order is being prepared by the restaurant.";
      case "out_for_delivery":
        return "Your order is out for delivery with our rider!";
      case "delivered":
        return "Your order has been delivered. Enjoy your meal!";
      case "cancelled":
        return "This order has been cancelled.";
      default:
        return "Your order is currently in progress.";
    }
  };

  // Subtotal calculator
  const itemsSubtotal = activeOrder?.items?.reduce((sum, item) => sum + Number(item.subtotal || 0), 0) || 0;

  // Render order status steps config
  const steps = [
    { name: "Pending", status: "pending", icon: Hourglass },
    { name: "Accepted", status: "accepted", icon: ChefHat },
    { name: "Preparing", status: "preparing", icon: Bell },
    { name: "Out for delivery", status: "out_for_delivery", icon: Bike },
    { name: "Delivered", status: "delivered", icon: Check }
  ];

  const visibleOrders = showAllOrders ? orders : orders.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-brand-white dark:bg-brand-dark">
      <Navbar />

      <main className="flex-1 w-full mx-auto max-w-[1528px] px-4 md:px-12 lg:px-[137px] py-8 space-y-8">

        {/* ══════════════════════ HERO SECTION ══════════════════════ */}
        <section className="relative w-full bg-[#fcfcfc] dark:bg-[#0c1033] border border-black/5 dark:border-white/5 rounded-[12px] p-6 lg:p-12 overflow-hidden shadow-sm">
          {/* Background Gradient elements */}
          <div className="absolute right-0 top-0 w-[45%] h-full bg-gradient-to-l from-brand-orange/5 to-transparent pointer-events-none rounded-r-[12px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Col: Headings & Your Orders List */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h1 className="text-[32px] md:text-[44px] font-extrabold text-brand-dark dark:text-brand-white leading-tight">
                  Track Your Order
                </h1>
                <p className="text-[15px] md:text-[16px] text-brand-dark/60 dark:text-brand-white/60 mt-2 font-medium">
                  Follow your order in real-time and get it delivered fresh & fast.
                </p>
              </div>

              {/* Your Orders Card Container */}
              <div className="bg-white dark:bg-[#121844] rounded-[12px] border border-black/10 dark:border-white/10 p-5 max-w-[450px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
                <span className="text-[14px] font-bold text-brand-dark/40 dark:text-brand-white/40 uppercase tracking-wider block mb-4">
                  Your Orders
                </span>

                <div className="flex flex-col gap-3">
                  {orders.length > 0 ? (
                    visibleOrders.map((order) => {
                      const orderId = order.order_id || order.id;
                      const isActive = String(activeOrder?.order_id || activeOrder?.id) === String(orderId);
                      const isDeliveredStatus = order.current_status?.toLowerCase() === "delivered";
                      const isCancelledStatus = order.current_status?.toLowerCase() === "cancelled";

                      return (
                        <div
                          key={orderId}
                          onClick={() => setActiveOrder(order)}
                          className={`flex items-center justify-between p-4 rounded-[12px] border cursor-pointer transition-all ${isActive
                              ? "bg-brand-orange/5 border-brand-orange shadow-sm"
                              : "bg-white dark:bg-[#151c52] border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15"
                            }`}
                        >
                          <div className="flex flex-col gap-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-[15px] text-brand-dark dark:text-brand-white truncate">
                                #ORD{orderId}
                              </span>
                              <button
                                onClick={(e) => handleCopyId(e, orderId)}
                                className="text-brand-dark/40 dark:text-brand-white/40 hover:text-brand-orange transition-colors flex items-center shrink-0"
                                title="Copy Order ID"
                              >
                                {copiedId === orderId ? (
                                  <Check size={14} className="text-green-500" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            </div>
                            <span className="text-[12px] font-semibold text-brand-dark/50 dark:text-brand-white/50">
                              {formatOrderDate(order.created_at)}
                            </span>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`px-3 py-1 rounded-full text-[12px] font-bold whitespace-nowrap uppercase tracking-wider ${isDeliveredStatus
                                ? "bg-brand-green/10 text-brand-green"
                                : isCancelledStatus
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-brand-orange/10 text-brand-orange"
                              }`}
                          >
                            {order.current_status}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-brand-dark/40 dark:text-brand-white/40 font-semibold text-[13.5px]">
                      {!isAuthenticated ? "Sign in to see your orders" : "No orders placed yet"}
                    </div>
                  )}
                </div>

                {/* View All Orders Button */}
                {orders.length > 3 && (
                  <button
                    onClick={() => setShowAllOrders(!showAllOrders)}
                    className="w-full text-center text-brand-orange text-[14px] font-bold hover:underline mt-4 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {showAllOrders ? (
                      <>
                        Collapse Orders <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        View All Orders <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Right Col: Layered Food Hero Images */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[320px] lg:h-[400px] flex items-center select-none overflow-visible">
              {/* Bowl/Salad Image (TrackHero1) */}
              <img
                src={trackHero1}
                alt="Healthy Bowl Salad"
                className="absolute left-[5%] sm:left-[15%] lg:left-auto lg:right-[180px] top-[50%] lg:top-[50%] -translate-y-1/2 w-[220px] sm:w-[300px] lg:w-[380px] h-[220px] sm:h-[300px] lg:h-[380px] object-contain z-10 transition-transform duration-300 hover:scale-105"
              />
              {/* Pizza Image (TrackHero2) */}
              <img
                src={trackHero2}
                alt="Tasty Pizza"
                className="absolute right-[5%] sm:right-[15%] lg:right-[-80px] top-[50%] lg:top-[52%] -translate-y-1/2 w-[200px] sm:w-[280px] lg:w-[340px] h-[200px] sm:h-[280px] lg:h-[340px] object-contain z-0 transition-transform duration-300 hover:scale-105"
              />
            </div>

          </div>
        </section>

        {/* ══════════════════════ DYNAMIC PAGE CONTAINER ══════════════════════ */}
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white dark:bg-[#0e1236] border border-black/5 dark:border-white/5 rounded-[12px] shadow-sm">
            <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <p className="text-[14px] text-brand-dark/50 dark:text-brand-white/50">Loading orders…</p>
          </div>
        ) : ordersError ? (
          /* Real API Error State */
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-16 bg-white dark:bg-[#0e1236] border border-red-500/10 rounded-[12px] shadow-sm gap-5 font-body">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertCircle size={28} />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-brand-dark dark:text-brand-white">Failed to retrieve orders</h3>
              <p className="text-[14px] text-brand-dark/50 dark:text-brand-white/50 mt-1.5 max-w-[420px] mx-auto leading-relaxed">
                {ordersError}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-[8px] bg-brand-orange text-white font-bold text-[13px] hover:bg-[#e07a00] transition-all cursor-pointer shadow-sm"
              >
                Retry Request
              </button>
              <button
                onClick={() => setDemoMode(true)}
                className="px-6 py-2.5 rounded-[8px] border border-black/10 dark:border-white/10 text-brand-dark dark:text-brand-white font-bold text-[13px] hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Try Demo Preview
              </button>
            </div>
          </div>
        ) : !isAuthenticated && !demoMode ? (
          /* Unauthenticated User State */
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-16 bg-white dark:bg-[#0e1236] border border-black/5 dark:border-white/5 rounded-[12px] shadow-sm gap-5 font-body">
            <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <Store size={26} />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-brand-dark dark:text-brand-white">Sign in to track orders</h3>
              <p className="text-[14px] text-brand-dark/50 dark:text-brand-white/50 mt-1.5 max-w-[440px] mx-auto leading-relaxed">
                Log in to check your active orders, track real-time delivery status, and view your purchase history.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={openLogin}
                className="px-7 py-3 rounded-[8px] bg-brand-orange text-white font-bold text-[14px] hover:bg-[#e07a00] transition-all cursor-pointer shadow-md"
              >
                Sign In / Sign Up
              </button>
              <button
                onClick={() => setDemoMode(true)}
                className="px-7 py-3 rounded-[8px] border border-black/10 dark:border-white/10 text-brand-dark dark:text-brand-white font-bold text-[14px] hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Explore Demo Mode
              </button>
            </div>
          </div>
        ) : orders.length === 0 && !demoMode ? (
          /* Real Authenticated Empty State */
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-16 bg-white dark:bg-[#0e1236] border border-black/5 dark:border-white/5 rounded-[12px] shadow-sm gap-5 font-body">
            <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <Utensils size={26} />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-brand-dark dark:text-brand-white">No active orders</h3>
              <p className="text-[14px] text-brand-dark/50 dark:text-brand-white/50 mt-1.5 max-w-[440px] mx-auto leading-relaxed">
                You haven't placed any orders yet. Place an order at one of our restaurants to track its status here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate("/#popular-restaurants")}
                className="px-7 py-3 rounded-[8px] bg-brand-orange text-white font-bold text-[14px] hover:bg-[#e07a00] transition-all cursor-pointer shadow-md"
              >
                Browse Restaurants
              </button>
              <button
                onClick={() => setDemoMode(true)}
                className="px-7 py-3 rounded-[8px] border border-black/10 dark:border-white/10 text-brand-dark dark:text-brand-white font-bold text-[14px] hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Preview Demo Mode
              </button>
            </div>
          </div>
        ) : activeOrder ? (
          /* Active Tracked Order Content */
          <>
            {/* Demo preview mode banner */}
            {demoMode && (
              <div className="flex items-center justify-between gap-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-800 dark:text-yellow-200 rounded-[8px] p-4 font-body shadow-sm">
                <p className="text-[13.5px] font-bold">
                  💡 Demo Mode: You are previewing the Track Order UI with mock data. Log in to track your actual orders.
                </p>
                <button
                  onClick={() => setDemoMode(false)}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-[6px] font-bold text-[12px] transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Exit Demo Mode
                </button>
              </div>
            )}

            {/* ══════════════════════ STATUS TRACKER SECTION ══════════════════════ */}
            <section className="bg-white dark:bg-[#0e1236] border border-black/5 dark:border-white/5 rounded-[12px] p-6 lg:p-10 shadow-[0px_2px_15px_rgba(0,0,0,0.02)] flex flex-col gap-8">

              {/* Progress Nodes Row */}
              <div className="relative w-full flex items-center justify-between py-4 select-none overflow-x-auto scrollbar-hide px-2">

                {/* Background connecting bar */}
                <div className="absolute left-[40px] right-[40px] top-[44px] h-[4px] bg-black/5 dark:bg-white/5 -translate-y-1/2 pointer-events-none min-w-[500px]" />

                {/* Foreground orange active progress line */}
                {currentStatusIndex >= 0 && !isCancelled && (
                  <div
                    className="absolute left-[40px] top-[44px] h-[4px] bg-brand-orange -translate-y-1/2 transition-all duration-500 pointer-events-none min-w-[500px]"
                    style={{
                      width: `${(currentStatusIndex / (steps.length - 1)) * 90}%`
                    }}
                  />
                )}

                {/* Render Steps */}
                <div className="w-full flex justify-between min-w-[580px] z-10 gap-4">
                  {steps.map((step, idx) => {
                    const isStepCancelledPending = isCancelled && step.status === "pending";
                    const isCompleted = !isCancelled && idx <= currentStatusIndex;
                    const isCurrent = !isCancelled && idx === currentStatusIndex;
                    const StepIcon = isStepCancelledPending ? X : step.icon;
                    const time = getStatusTime(isStepCancelledPending ? "cancelled" : step.status) || getStatusTime(step.status);

                    return (
                      <div key={step.status} className="flex flex-col items-center text-center w-[120px] shrink-0">
                        {/* Circle Node */}
                        <div
                          className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all ${isStepCancelledPending
                              ? "bg-red-500 text-white shadow-[0px_4px_12px_rgba(239,68,68,0.3)]"
                              : isCompleted
                                ? "bg-brand-orange text-white shadow-[0px_4px_12px_rgba(252,138,6,0.3)]"
                                : "bg-white dark:bg-[#151b4b] border-[1.5px] border-black/10 dark:border-white/10 text-brand-dark/30 dark:text-brand-white/30"
                            }`}
                        >
                          <StepIcon size={20} strokeWidth={isCompleted || isStepCancelledPending ? 2.5 : 1.8} />
                        </div>

                        {/* Step Name & Time */}
                        <div className="mt-3">
                          <span
                            className={`text-[14px] font-bold block ${isStepCancelledPending
                                ? "text-red-500"
                                : isCompleted
                                  ? "text-brand-dark dark:text-brand-white"
                                  : "text-brand-dark/40 dark:text-brand-white/40"
                              }`}
                          >
                            {isStepCancelledPending ? "Cancelled" : step.name}
                          </span>
                          {time && (
                            <span className="text-[12px] font-semibold text-brand-dark/50 dark:text-brand-white/50 block mt-0.5">
                              {time}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Alert Message & Action Row */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-[8px] p-4 font-body ${isCancelled
                  ? "bg-red-500/5 border-red-500/15 text-red-800 dark:text-red-200"
                  : "bg-brand-orange/5 border-brand-orange/15 text-brand-dark/80 dark:text-brand-white/90"
                }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${isCancelled ? "bg-red-500" : "bg-brand-orange"
                    }`}>
                    {isCancelled ? <X size={16} strokeWidth={2.5} /> : <Info size={16} strokeWidth={2.5} />}
                  </div>
                  <p className="text-[14px] md:text-[15px] font-bold">
                    {getStatusAlertMessage(activeOrder?.current_status)}
                  </p>
                </div>

                {/* Cancel Button - shown only when order status is pending */}
                {activeOrder?.current_status?.toLowerCase() === "pending" && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-[8px] bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-[13px] transition-all cursor-pointer whitespace-nowrap shadow-sm text-center"
                  >
                    {cancelling ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </section>

            {/* ══════════════════════ ORDER DETAILS SECTION ══════════════════════ */}
            <section className="bg-white dark:bg-[#0e1236] border border-black/5 dark:border-white/5 rounded-[12px] p-6 lg:p-10 shadow-[0px_2px_15px_rgba(0,0,0,0.02)]">
              <h2 className="text-[20px] md:text-[24px] font-extrabold text-brand-dark dark:text-brand-white border-b border-black/5 dark:border-white/5 pb-5">
                Order Details
              </h2>

              <div className="mt-6 flex flex-col gap-8">

                {/* Restaurant Meta Info Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#fafafa] dark:bg-[#121844] rounded-[12px] border border-black/5 dark:border-white/5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-[60px] h-[60px] rounded-[8px] bg-brand-orange/10 flex items-center justify-center overflow-hidden shrink-0 border border-brand-orange/10">
                      {restaurantDetails?.image ? (
                        <img
                          src={restaurantDetails.image}
                          alt={activeOrder?.restaurant?.name || "Restaurant"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Store size={26} className="text-brand-orange" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-brand-dark dark:text-brand-white">
                        {activeOrder?.restaurant?.name || "Restaurant Name"}
                      </h3>
                      <p className="text-[13px] text-brand-dark/50 dark:text-brand-white/50 font-semibold mt-0.5">
                        {restaurantDetails?.description || "Fresh food delivered straight to you"}
                      </p>
                    </div>
                  </div>

                  {activeOrder?.restaurant?.id && (
                    <button
                      onClick={() => navigate(`/restaurants/${activeOrder.restaurant.id}`)}
                      className="px-5 py-2.5 rounded-[8px] border border-brand-orange text-brand-orange font-bold text-[13px] hover:bg-brand-orange hover:text-white transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
                    >
                      View Restaurant
                    </button>
                  )}
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-6">
                  <span className="text-[14px] font-bold text-brand-dark/40 dark:text-brand-white/40 uppercase tracking-wider block">
                    Items
                  </span>

                  <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
                    {activeOrder?.items?.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                        <div className="flex items-center gap-4">
                          {/* Thumbnail Image with count badge */}
                          <div className="relative w-[54px] h-[54px] rounded-[8px] bg-[#f5f5f5] dark:bg-[#151c52] border border-black/5 dark:border-white/5 flex items-center justify-center shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-[8px]"
                              />
                            ) : (
                              <Utensils size={20} className="text-brand-dark/20 dark:text-brand-white/20" />
                            )}
                            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] rounded-full bg-brand-green text-white text-[11px] font-bold flex items-center justify-center px-1 shadow-sm">
                              {item.quantity}
                            </span>
                          </div>

                          {/* Item Details */}
                          <div>
                            <h4 className="text-[15px] font-bold text-brand-dark dark:text-brand-white">
                              {item.name}
                            </h4>
                            <span className="text-[12px] font-semibold text-brand-dark/40 dark:text-brand-white/40 mt-0.5 block capitalize">
                              {item.type || "menu item"}
                            </span>
                          </div>
                        </div>

                        {/* Total Price for item */}
                        <span className="text-[15px] font-bold text-brand-dark dark:text-brand-white whitespace-nowrap">
                          Rs. {Number(item.subtotal || 0).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total breakdown */}
                <div className="border-t border-black/5 dark:border-white/5 pt-6 max-w-[400px] ml-auto w-full flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[14px] font-semibold text-brand-dark/60 dark:text-brand-white/60">
                    <span>Subtotal</span>
                    <span>Rs. {Number(itemsSubtotal).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-dashed border-black/10 dark:border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-[16px] font-bold text-brand-dark dark:text-brand-white">Total Paid</span>
                    <span className="text-[20px] md:text-[22px] font-extrabold text-brand-orange">
                      Rs. {Number(activeOrder?.total_price || itemsSubtotal).toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* ══════════════════════ GRID CARDS: DELIVERY INFO & OPERATIONAL TIMES ══════════════════════ */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-body">

              {/* Card 1: Delivery Information */}
              <div className="bg-white dark:bg-[#0e1236] border border-black/5 dark:border-white/5 rounded-[12px] p-6 lg:p-8 shadow-[0px_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-brand-dark dark:text-brand-white border-b border-black/5 dark:border-white/5 pb-4">
                    <MapPin className="text-brand-orange" size={20} />
                    <h3 className="text-[17px] font-extrabold">Delivery Information</h3>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-brand-dark/40 dark:text-brand-white/40 uppercase tracking-wider block mb-1">
                      Delivery Address
                    </span>
                    <p className="text-[14px] font-bold text-brand-dark/75 dark:text-brand-white/80 leading-relaxed">
                      {activeOrder?.delivery_address || "No delivery address specified."}
                    </p>
                  </div>
                </div>

                {activeOrder?.delivery_address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.delivery_address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-max text-center px-6 py-2.5 rounded-[8px] border border-brand-orange text-brand-orange font-bold text-[13px] hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
                  >
                    View on Map
                  </a>
                )}
              </div>

              {/* Card 2: Operational Times (Dark background gradient) */}
              <div className="bg-gradient-to-b from-[#03081F] to-[#0A1138] rounded-[12px] p-6 lg:p-8 shadow-[0px_2px_15px_rgba(0,0,0,0.05)] text-white flex flex-col gap-5 border border-white/5">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                  <Clock className="text-brand-orange" size={20} />
                  <h3 className="text-[17px] font-extrabold">Operational Times</h3>
                </div>

                {/* List of operational hours */}
                <div className="flex flex-col gap-2.5">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ].map((day) => (
                    <div key={day} className="flex justify-between items-center text-[13px] font-semibold text-white/80">
                      <span>{day}:</span>
                      <span className="font-bold text-white">07:00 AM-11:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          </>
        ) : null}

      </main>

      <Footer />
    </div>
  );
}
