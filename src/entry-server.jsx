import { renderToString } from "react-dom/server";

import App from "./client/App";

export const render = (stats, profile) => {
  console.log("render entry server");
  return renderToString(<App stats={stats} profile={profile} />);
};
