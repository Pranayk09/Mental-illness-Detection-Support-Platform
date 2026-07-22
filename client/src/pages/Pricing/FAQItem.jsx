import React from "react";

const FAQItem = ({ question, answer }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default FAQItem;
