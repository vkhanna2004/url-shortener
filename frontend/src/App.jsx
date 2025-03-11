import { useEffect, useState } from "react";
import URLShortener from "./components/URLshortener";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div>
      <URLShortener theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
