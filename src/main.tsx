import { initTracking } from "./app/data/tracking";

  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  initTracking();
  createRoot(document.getElementById("root")!).render(<App />);
  