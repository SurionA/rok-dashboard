import { hydrateRoot } from "react-dom/client";

import App from "./client/App";
console.log("render entry client");
hydrateRoot(
  document.getElementById("app"),
  <App stats={window?.__data__?.stats} profile={window?.__data__?.profile} />
);
