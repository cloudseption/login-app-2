const express = require('express');

const PORT = process.env.PORT || 80;

let app = express();


app.listen(PORT, () => console.log(`BadgeBook Server listening on port ${PORT}!`));