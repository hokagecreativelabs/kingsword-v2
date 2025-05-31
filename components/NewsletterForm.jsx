"use client";

import { useState } from "react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API or add logic here
    setTimeout(() => {
      setMessage("Subscribed successfully!");
      setEmail("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="col-span-2 pt-8 md:pt-2">
      <p className="font-bold uppercase">Subscribe to our newsletter</p>
      <p className="py-4">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
      <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mr-4 rounded-md mb-4"
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className={`p-2 mb-4 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </form>
      {message && <p className="text-gray-500 mt-2">{message}</p>}
    </div>
  );
};

export default NewsletterForm;
