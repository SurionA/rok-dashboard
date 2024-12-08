import { readFileSync } from "node:fs";

export async function renderProd(_, res) {
  try {
    const template = readFileSync("./dist/client/index.html", "utf-8");
    const { render } = await import("./dist/server/entry-server.js");

    const html = template.replace(`<!--outlet-->`, render(req.data, req.user));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
}
