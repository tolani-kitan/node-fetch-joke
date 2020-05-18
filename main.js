const request = require('request');
const fs = require('fs');

const searchTerm = process.argv[2];

const options = {
    url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
    headers: {
        'User-Agent': 'request',
        "Accept": 'application/json'
    }
}

// console.log(searchTerm)

request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
    const jokes = JSON.parse(body).results; 
    parseJoke(jokes)
    } else {
        console.log('Error', error)
    }
})

const parseJoke = (jokes) => {
    if(jokes.length !== 0){
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const joke = randomJoke.joke
        
        fs.appendFile('jokes.txt', joke + '/n', (err) => {
            if(err) throw err;
            console.log('Random Joke Updated');
        });
    }
    else {
        console.log("Can't find Joke")
    }
}

