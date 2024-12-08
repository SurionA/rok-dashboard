import express from "express";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

const scopes = [
  "identify",
  // "email", "guilds", "guilds.join"
];

const router = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  const {
    accessToken,
    refreshToken,
    profile: { id, username, avatar, global_name, locale, provider, fetchedAt },
  } = obj;
  // console.log({ obj });
  done(null, {
    accessToken,
    refreshToken,
    profile: {
      id,
      username,
      avatar,
      global_name,
      locale,
      provider,
      fetchedAt,
    },
  });
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_APP_ID,
      clientSecret: process.env.DISCORD_SECRET_KEY,
      callbackURL: "http://localhost:3500/auth/discord/callback",
      scope: scopes,
    },
    function (accessToken, refreshToken, profile, cb) {
      if (JSON.parse(process.env.AUTHORIZED_USERS).includes(profile.username)) {
        return cb(null, { accessToken, refreshToken, profile });
      }
      const err = new Error("not authorized");
      err.status = 403;

      return cb(err);
    }
  )
);

router.use(passport.initialize());
router.use(passport.session());
router.get("/auth/discord", passport.authenticate("discord"));
router.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

export default router;
