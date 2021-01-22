const passport = require('passport');
const fetch = require('node-fetch');
const keys = require('../config/keys.js');
const CryptoJS = require('crypto-js');
const { gatherPotentialSongs } = require('../logic/createPlaylist.js');



module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send({hi: 'yeah yeah'});
    })

    app.get(
        '/auth/spotify',
        passport.authenticate('spotify', {
            scope: ['user-top-read', 'user-library-read', 'playlist-modify-public']
        })
    );

    app.get(
        '/auth/spotify/callback',
        passport.authenticate('spotify'), 
        async (req, res) => {
            gatherPotentialSongs(req.session.token)
            res.redirect('/');
        }
    );

    app.get(
        '/api/logout', (req, res) => {
            req.session = null;
            req.logout();
            res.redirect('/')
        }
    )
}