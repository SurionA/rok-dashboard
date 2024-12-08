import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer } from "vite";

import {
  renderDev,
  renderProd,
  getData,
} from "./src/server/middlewares/index.js";

const app = express();
const port = process.env.NODE_APP_PORT || 4173;

let vite;

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      resolve(dirname(fileURLToPath(import.meta.url)), "dist/client"),
      { index: false }
    )
  );
} else {
  vite = await createServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });
  app.use(vite.middlewares);
}

app.use(
  "*",
  getData,
  process.env.NODE_ENV === "production" ? renderProd : renderDev(vite)
);

app.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
