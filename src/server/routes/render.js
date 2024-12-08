import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer } from "vite";

import { renderDev, renderProd, getData } from "../middlewares/index.js";

export default async function getRenderRouter(app) {
  const router = express.Router();

  let vite;

  if (process.env.NODE_ENV === "production") {
    router.use(
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

  router.use(
    "*",
    getData,
    process.env.NODE_ENV === "production" ? renderProd : renderDev(vite)
  );

  return router;
}
