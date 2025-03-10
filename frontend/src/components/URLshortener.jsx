import { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL + "/api", // Proxy will route this to backend
  headers: {
    "Content-Type": "application/json",
  },
});

const URLShortener = () => {
  const [longurl, setLongurl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longurl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/shorten", { longurl });
      setShortURL(`${API_BASE_URL}/${response.data.shortid}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to shorten URL. Please try again."
      );
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL);
    alert("Short URL copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-400">Short URL</h1>
      <p className="mt-2 text-gray-400">
        Copy the short link and share it in messages, texts, posts, websites,
        and more.
      </p>

      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <input
          type="text"
          placeholder="Enter a long URL..."
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          value={longurl}
          onChange={(e) => setLongurl(e.target.value)}
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      {shortURL && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="flex items-center bg-gray-700 p-2 rounded-lg">
            <input
              type="text"
              value={shortURL}
              readOnly
              className="w-full bg-transparent text-blue-400 font-semibold text-center"
            />
            <button
              onClick={copyToClipboard}
              className="ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Copy URL
            </button>
          </div>
          <p className="mt-2 text-gray-400">
            Long URL:{" "}
            <a
              href={longurl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              {longurl}
            </a>
          </p>
          <button
            onClick={() => setShortURL("")}
            className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
          >
            Shorten Another URL
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default URLShortener;
