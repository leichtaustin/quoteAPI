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
    console.log(req.query);
    if(req.query.person) {
        const personQuote = quotes.filter(quote => quote.person === req.query.person);
        if(personQuote) {
            res.send({quotes: personQuote});
        } else {
            res.send([])
        }      
    } else {
        res.send(quotes);
    }
    
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {
        randomQuote: getRandomElement(quotes),
    };

    if(randomQuote) {
        res.send(randomQuote);
    } else {
        res.status(404).send('Unable to find quote');
    }
})

app.post('/api/quotes', (req, res, next) => {
    const quoteToAdd = {
        quote: req.query.quote,
        person: req.query.person,
    }
    if(quoteToAdd.quote && quoteToAdd.person) {
        quotes.push(quoteToAdd);
        res.status(201).send(quoteToAdd);
    } else {
        res.status(404).send();
    }
})