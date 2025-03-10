import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const URLShortener = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, { longURL });
      setShortURL(`${window.location.origin}/${response.data.data.shortId}`);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL);
    alert("Short URL copied!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
      <h2 className="text-2xl font-semibold text-center text-gray-700">🔗 URL Shortener</h2>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter a long URL..."
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      {shortURL && (
        <div className="mt-4 p-3 bg-gray-100 border rounded-lg flex justify-between items-center">
          <a href={shortURL} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            {shortURL}
          </a>
          <button onClick={copyToClipboard} className="ml-2 text-gray-500 hover:text-gray-700">
            📋 Copy
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default URLShortener;
