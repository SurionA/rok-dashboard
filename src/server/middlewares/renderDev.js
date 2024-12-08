import { readFileSync } from "node:fs";

export function renderDev(vite) {
  return async (req, res) => {
    const url = req.originalUrl;

    try {
      const template = await vite.transformIndexHtml(
        url,
        readFileSync("index.html", "utf-8")
      );
      const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

      const script = `<script>window.__data__=${JSON.stringify(
        req.data
      )}</script>`;

      const html = template.replace(
        `<!--outlet-->`,
        `${render(req.data)} ${script}`
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      res.status(500).end(error);
    }
  };
}
