import { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Moon, Copy } from "lucide-react"; 

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const isValidURL = (url) => {
  try {
    new URL(url);
    return /^(https?:\/\/)/.test(url);
  } catch (_) {
    return false;
  }
};

const URLShortener = () => {
  const [longurl, setLongurl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleShorten = async () => {
    if (!longurl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    if (!isValidURL(longurl)) {
      setError(
        "Invalid URL. Please enter a valid URL including http:// or https://"
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/shorten", { longurl });
      setShortURL(`${API_BASE_URL}/api/${response.data.data.shortid}`);
    } catch (err) {
      setError(
        err.response?.data?.data?.message ||
          "Failed to shorten URL. Please try again."
      );
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >

      <header className="flex items-center justify-between w-full max-w-lg mb-6 px-4">
        <h1
          className="text-4xl font-extrabold text-blue-500 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          🔗 ShortenURL
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:scale-110 transition-transform"
        >
          {theme === "dark" ? (
            <Sun size={22} className="text-yellow-400" />
          ) : (
            <Moon size={22} className="text-gray-900" />
          )}
        </button>
      </header>

      <div
        className={`mt-4 p-6 rounded-lg shadow-lg max-w-lg w-full ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <input
          type="text"
          placeholder="Paste a long URL here..."
          className={`w-full px-4 py-3 rounded-lg text-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          value={longurl}
          onChange={(e) => setLongurl(e.target.value)}
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold text-lg"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      {shortURL && (
        <div
          className={`mt-6 p-4 rounded-lg shadow-lg max-w-lg w-full text-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="text-lg font-semibold text-green-500">Your Shortened URL:</p>
          <div
            className={`flex items-center justify-between p-3 rounded-lg mt-2 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <input
              type="text"
              value={shortURL}
              readOnly
              className="w-full bg-transparent text-blue-400 font-bold text-center cursor-pointer"
              onClick={() => window.open(shortURL, "_blank")}
            />
            <button
              onClick={copyToClipboard}
              className="ml-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition flex items-center gap-1"
            >
              <Copy size={20} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-gray-500">
            Original URL:{" "}
            <a
              href={longurl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {longurl}
            </a>
          </p>
          <button
            onClick={() => {
              setShortURL("");
              setLongurl("");
            }}
            className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition text-lg"
          >
            Shorten Another URL
          </button>
        </div>
      )}

      <p className="mt-6 text-m text-gray-500 text-center">
        ⚠️ Shortened URLs will expire after 24 hours if not accessed.
      </p>

      {error && (
        <p className="mt-4 text-red-500 text-lg">{error}</p>
      )}
    </div>
  );
};

export default URLShortener;
