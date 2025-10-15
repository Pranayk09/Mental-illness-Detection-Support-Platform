import React, { useContext } from "react";
import { Check, Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import {useNavigate} from 'react-router-dom'

const PricingCard = ({ plan }) => {
  const { backendUrl, token, user, setShowLogin } = useContext(AppContext);
   const navigate = useNavigate();

  // 🔹 Initialize Razorpay payment
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Nirvanic Plan Purchase",
      description: `${plan.name} Plan`,
      order_id: order.id,
      handler: async (response) => {
        try {
          // Send required fields to backend
          await axios.post(
            `${backendUrl}/api/payment/verify-payment`,
            {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              status: "success",
            },
            { headers: { token } }
          );

          toast.success(`${plan.name} Plan Activated!`);
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🔹 Start payment on button click
  const handlePayment = async () => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/payment/create-order`,
        { plan: plan.name, amount: plan.price.replace("$", "") },
        { headers: { token } }
      );

      if (data.success) initPay(data.order);
      else console.log(data.message);
    } catch (error) {
      toast.error("Payment initialization failed");
    }
  };


  const handleFreePlan = () => {
    toast.info("Free Plan Activated");
    navigate("/assessment");
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 ${
        plan.popular ? "border-2 border-purple-600" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-sm px-4 py-1 rounded-full flex items-center">
          <Star size={14} className="mr-1" /> Most Popular
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="mt-2 text-4xl font-bold">
          {plan.price}
          <span className="text-gray-500 text-base">/{plan.period}</span>
        </p>
        <p className="text-gray-600 mt-3">{plan.description}</p>
      </div>

    {plan.name === "Free" ? (
  <button
    className="w-full py-2 px-4 rounded-md font-medium mt-4 border border-gray-400 text-gray-700 
               hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 ease-in-out"
    onClick={handleFreePlan}
  >
    {plan.buttonText}
  </button>
) : (
  <button
    className="w-full py-2 px-4 rounded-md font-medium mt-4 bg-purple-600 text-white 
           hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-400/40
           active:scale-[0.97] transition-all duration-200 ease-in-out"
    onClick={handlePayment}
  >
    {plan.buttonText}
  </button>
)}


      <div className="mt-6 space-y-2 text-left">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start space-x-2">
            <Check size={18} className="text-green-600 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {plan.notIncluded.length > 0 && (
        <>
          <div className="border-t border-gray-300 my-4" />
          <h4 className="text-sm text-gray-500 font-semibold mb-2">
            Not Included
          </h4>
          {plan.notIncluded.map((feature, i) => (
            <div key={i} className="flex items-start space-x-2 text-gray-400">
              <div className="h-1 w-3 bg-gray-400 rounded mt-2"></div>
              <span>{feature}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PricingCard;
