import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h2>
      <ul className="space-y-2">
        {Object.entries(state || {}).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value.toString()}</li>
        ))}
      </ul>
      <button onClick={() => navigate("/")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Go Back
      </button>
    </div>
  );
};

export default Success;