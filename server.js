import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// import sqlite from "node:sqlite";
import express from "express";
import session from "express-session";
import sqlite from "connect-sqlite3";

import {
  getRenderRouter,
  discordAuthRouter,
} from "./src/server/routes/index.js";

const app = express();
const SQLiteStore = sqlite(session);
const port = process.env.NODE_APP_PORT;
const renderRouter = await getRenderRouter(app);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use("/login", (req, res) => {
  res.send(
    '<div><h1>Login</h1><a href="/auth/discord">log me in discord</a></div>'
  );
});

app.use("/notauthorized", (req, res) => {
  res.send(
    '<div><h1>not authorized</h1>Try to log with another account in<a href="/auth/discord">discord</a></div>'
  );
});

app.use("/", discordAuthRouter);
app.use(
  "/",
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login");
  },
  renderRouter
);

app.use(function (err, req, res, next) {
  if (err.status === 403) {
    return res.redirect("/notauthorized");
  }

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
