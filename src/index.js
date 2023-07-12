import { App } from "./app";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

const ProvisionedApp = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

root.render(<ProvisionedApp />);
