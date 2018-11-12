const jose = require('node-jose');

const keystore = jose.JWK.createKeyStore();
keystore.generate('oct', 256).then(key => { console.log(key.toJSON(true)); });

module.exports = keystore;