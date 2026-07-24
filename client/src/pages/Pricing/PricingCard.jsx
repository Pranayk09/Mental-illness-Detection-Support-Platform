import React, { useContext } from "react";
import { Check, Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PricingCard = ({ plan }) => {
  const { backendUrl, token, user, setShowLogin, fetchUserData } = useContext(AppContext);
  const navigate = useNavigate();

  // 🔹 Initialize Razorpay payment
  const initPay = async (order) => {
    const storedToken = localStorage.getItem("token") || token;
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_dummykey123",
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Nirvanic Health",
      description: `${plan.name} Plan Purchase`,
      order_id: order.id,
      handler: async (response) => {
        try {
          // Send payment verification to backend
          const { data } = await axios.post(
            `${backendUrl}/api/payment/verify-payment`,
            {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              status: "success",
            },
            { headers: { token: storedToken }, withCredentials: true }
          );

          if (data.success) {
            toast.success(`🎉 ${plan.name} Plan Activated Successfully!`);
            if (fetchUserData) fetchUserData(storedToken);
            navigate("/resources");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          toast.error("Payment verification error");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🔹 Start payment on button click (Protected for authenticated users only)
  const handlePayment = async () => {
    try {
      const storedToken = localStorage.getItem("token") || token;
      if (!user || !storedToken) {
        toast.info("Please log in or sign up to purchase a plan.");
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/payment/create-order`,
        { plan: plan.name, amount: plan.price.replace("$", "").replace("₹", "") },
        { headers: { token: storedToken }, withCredentials: true }
      );

      if (data.success && data.order) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Failed to create payment order");
      }
    } catch (error) {
      console.error("Payment init error:", error);
      toast.error("Payment initialization failed");
    }
  };

  const handleFreePlan = () => {
    const storedToken = localStorage.getItem("token") || token;
    if (!user || !storedToken) {
      toast.info("Please log in to continue with the Free Plan.");
      setShowLogin(true);
      return;
    }
    toast.info("Free Plan Active");
    navigate("/assessment");
  };

  return (
    <div
      className={`relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300 flex flex-col justify-between border ${
        plan.popular ? "border-2 border-emerald-500 ring-4 ring-emerald-100" : "border-slate-200/80"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white text-xs font-extrabold px-4 py-1 rounded-full shadow-md flex items-center">
          <Star size={12} className="mr-1 fill-amber-300 text-amber-300" /> Most Popular Choice
        </div>
      )}

      <div>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-extrabold text-slate-900">{plan.name}</h3>
          <p className="mt-3 text-4xl font-black text-slate-900">
            {plan.price}
            <span className="text-slate-400 text-sm font-semibold">/{plan.period}</span>
          </p>
          <p className="text-slate-500 text-xs mt-2 font-medium">{plan.description}</p>
        </div>

        <div className="space-y-3 text-left my-6 pt-6 border-t border-slate-100">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs font-semibold text-slate-700">
              <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {plan.notIncluded && plan.notIncluded.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Not Included
            </h4>
            {plan.notIncluded.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs text-slate-400 font-medium line-through">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        {plan.name === "Free" ? (
          <button
            className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs border border-slate-300 text-slate-700 
                       hover:bg-slate-50 active:scale-98 transition-all shadow-xs cursor-pointer"
            onClick={handleFreePlan}
          >
            {plan.buttonText || "Get Started Free"}
          </button>
        ) : (
          <button
            className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-indigo-600 text-white 
                   hover:from-emerald-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-emerald-500/20
                   active:scale-98 transition-all cursor-pointer"
            onClick={handlePayment}
          >
            {plan.buttonText || "Subscribe Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
