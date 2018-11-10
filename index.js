const express = require('express');
const auth = require('./auth/router');

const PORT = process.env.PORT || 8080;
let app = express();
app.use('/auth', auth);

app.listen(PORT, () => console.log(`BadgeBook Server listening on port ${PORT}!`));