const jose = require('node-jose');

function keystoreProxy() {
    this.keystore = jose.JWK.createKeyStore();
    this.appIdMap = {};

    this.storeKeyForApp = (appId, key) => {
        this.keystore.add(key)
        .then(() => {
            this.appIdMap[appId] = key;
        })
        .catch((err) => {
            throw err;
        });
    };

    this.generateKeyForApp =(appId) => {
        this.keystore.generate('oct', 256)
        .then((key) => {
            this.appIdMap[appId] = key;
        })
        .catch((err) => {
            throw err;
        });
    };

    this.getKeyForApp = (appId) => {
        if (!this.appIdMap[appId]) {
            throw new Error(`No registered app with ID ${appId}`);
        }
        return this.appIdMap[appId];
    };
};


const keystoreProxySingleton = new keystoreProxy();
keystoreProxySingleton.generateKeyForApp('hangman');

module.exports = keystoreProxySingleton;