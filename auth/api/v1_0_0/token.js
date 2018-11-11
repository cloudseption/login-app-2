const crypto = require('crypto');
const CognitoExpress = require('cognito-express');
const cognitoExpress = new CognitoExpress({
    region: 'us-west-2',
    cognitoUserPoolId: 'us-west-2_eZyNHvuo4',
    tokenUse: 'id'
})

const getClientSecretFromDb = function getClientSecretFromDb(clientAppKey) {
    return 'asdfawexcv23rasdf';
};

const buildUserAccessTokenMsg = function buildUserAccessTokenMsg(cognitoResponse) {
    return {
        uuid: cognitoResponse.sub,
        email: cognitoResponse.email
    };
};

const genSignedAccessToken = function genSignedAccessToken(key, secret, message) {
    let hmac = crypto.createHmac('sha256', secret);
    hmac.update(message.toString());
    let signature = hmac.digest('hex');
    
    return {
        publicKey: key,
        signature: signature,
        message: message
    };
};

const generateToken = function(req, res) {
    let cognitoToken = req.headers.cognitoaccesstoken;
    let clientAppKey = req.headers.clientappkey;
    let clientAppSecret = getClientSecretFromDb(clientAppKey);

    if (!cognitoToken) {
        return res.status(401).send("Access Token missing from header");
    }
 
    cognitoExpress.validate(cognitoToken,
        function generateAppAccessToken(err, response) {
            if (err) {
                return res.status(401).send(err);
            }
            
            let idMsg = buildUserAccessTokenMsg(response);
            let token = genSignedAccessToken(clientAppKey, clientAppSecret, idMsg);

            res.send({ accesstoken: token });
        });
};

module.exports = generateToken;