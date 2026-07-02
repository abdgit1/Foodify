import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import orderImage from "../../assets/order 1.png";
import orderFoodImage from "../../assets/order-food 1.png";
import foodImage from "../../assets/food 1.png";

const tabs = [
  "Frequent Questions",
  "Who we are?",
  "Partner Program",
  "Help & Support",
];

const questions = [
  "How does Order.UK work?",
  "What payment methods are accepted?",
  "Can I track my order in real-time?",
  "Are there any special discounts or promotions available?",
  "Is Order.UK available in my area?",
];

const steps = [
  {
    title: "Place an Order!",
    image: orderFoodImage,
    description: "Place your order through our website or mobile app",
  },
  {
    title: "Track Progress",
    image: foodImage,
    description: "Track your order status along with live delivery time",
  },
  {
    title: "Get your Order!",
    image: orderImage,
    description: "Receive your order at your doorstep, lightning fast",
  },
];

const stats = [
  {
    number: "546+",
    title: "Registered Riders",
  },
  {
    number: "789,900+",
    title: "Orders Delivered",
  },
  {
    number: "690+",
    title: "Restaurants Partnered",
  },
  {
    number: "17,457+",
    title: "Food Items",
  },
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="bg-white py-8 font-sans px-5 sm:px-8 md:px-12.5">
      <div className="w-full">
        <section className="bg-[#F4F4F4] rounded-md p-6 sm:p-8 lg:p-12">
          <div className="w-full lg:w-[90%] mx-auto">
            <section className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                Know more about us!
              </h2>

              <nav className="hidden lg:flex flex-wrap justify-center gap-1">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${
                      activeTab === index
                        ? "border border-orange-500 bg-white font-bold text-black"
                        : "border border-transparent font-medium text-gray-700 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </section>

            <section
              className="rounded-[10px] p-5 sm:p-6 lg:p-10 flex flex-col lg:flex-row gap-8 transition-colors duration-300"
              style={{
                backgroundColor: isDark ? "#03081F" : "#FFFFFF",
              }}
            >
              <section className="lg:w-[40%] lg:border-r border-white/10 lg:pr-10">
                <ul className="space-y-3">
                  {questions.map((question, index) => (
                    <li key={question}>
                      <button
                        type="button"
                        onClick={() => setActiveQuestion(index)}
                        className={`w-fit text-left rounded-full px-3 py-3 font-bold text-xs sm:text-sm lg:text-base transition-all cursor-pointer ${
                          activeQuestion === index
                            ? "bg-[#FC8A06]"
                            : `${isDark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"}`
                        }`}
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Cards */}
              <section className="lg:w-[60%] flex flex-col ml-0 lg:ml-14 gap-6">
                <section className="grid sm:grid-cols-3 gap-4 ">
                  {steps.map((step) => (
                    <article
                      key={step.title}
                      className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center text-center h-full"
                    >
                      <h3 className="font-bold text-black text-sm sm:text-base mb-3">
                        {step.title}
                      </h3>

                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-14 w-14 sm:h-16 sm:w-16 object-contain mb-4"
                      />

                      <p className="text-xs text-[gray-700] font-medium leading-snug">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </section>

                <p
                  className={`text-center mt-8 text-sm leading-relaxed px-4 ${
                    isDark ? "text-white" : "text-[#03081F]"
                  }`}
                >
                  Order.UK simplifies the food ordering process. Browse through
                  our diverse menu, select your favorite dishes, and proceed to
                  checkout. Your delicious meal will be on its way to your
                  doorstep in no time!
                </p>
              </section>
            </section>
          </div>
        </section>

        <section className="bg-[#FF8C00] rounded-2xl mt-8 grid grid-cols-1 md:grid-cols-4 py-5 px-4 gap-y-5 md:gap-y-0">
          {stats.map((item, index) => (
            <article
              key={item.title}
              className={`text-center px-2 ${
                index !== stats.length - 1
                  ? "md:border-r border-b md:border-b-0 border-white/40 pb-5 md:pb-0"
                  : ""
              }`}
            >
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2">
                {item.number}
              </h3>

              <p className="text-white font-bold text-xs sm:text-sm lg:text-base">
                {item.title}
              </p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}