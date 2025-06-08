import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  showPassword: false,
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

const countryCityMap = {
  India: ["Chandigarh","Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra"],
  Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City"],
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo", "Fukuoka", "Hiroshima"],
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!/^\+\d{1,3}\d{10}$/.test(formData.phone)) {
  newErrors.phone = "Phone must include country code and 10 digits. E.g., +91xxxxxxxxxxx";
}
    if (!formData.country) newErrors.country = "Select a country";
    if (!formData.city) newErrors.city = "Select a city";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
  newErrors.pan = "PAN format: 5 uppercase letters, 4 digits, 1 letter (e.g., ABCDE1234F)";
}
    if (!/^\d{12}$/.test(formData.aadhar)) {
  newErrors.aadhar = "Aadhar must be exactly 12 digits with no spaces";
}
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    } else {
      setErrors(validationErrors);
    }
  };

   const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      // Reset city when country changes
      setFormData({ ...formData, country: value, city: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const togglePassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // Get cities for selected country or empty array
  const cities = formData.country ? countryCityMap[formData.country] || [] : [];


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstName", "lastName", "username", "email", "phone", "pan", "aadhar"].map((field) => (
          <div key={field}>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
        <div>
          <input
            type={formData.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button type="button" onClick={togglePassword} className="text-blue-600 text-sm mt-1">
            {formData.showPassword ? "Hide" : "Show"} Password
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Country</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>
        <div>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!formData.country}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;