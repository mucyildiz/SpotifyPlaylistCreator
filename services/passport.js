const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const CryptoJS = require('crypto-js');


passport.serializeUser((user, done) => {
  done(null, user.spotifyId);
});

passport.deserializeUser((id, done) => {
    done(null, {id: id})
  });

passport.use(
    new SpotifyStrategy({
        clientID: keys.spotifyClientID,
        clientSecret: keys.spotifyClientSecret,
        callbackURL: "/auth/spotify/callback",
        proxy: true,
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
        console.log('before encrypting', accessToken);
        req.session.token = CryptoJS.AES.encrypt(accessToken, keys.passphrase).toString();
        req.session.passphrase = keys.passphrase;
        console.log('after encryption', req.session.token);
        done(null, {spotifyId: profile.id})
    }
));

