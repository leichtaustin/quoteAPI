const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.get('/api/quotes', (req, res, next) => {
    res.send(quotes);
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {
        quote: getRandomElement(quotes).quote,
    };

    if(randomQuote) {
        res.send(randomQuote);
    } else {
        res.status(404).send('Unable to find quote');
    }
})