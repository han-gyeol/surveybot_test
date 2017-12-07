const express = require('express');
const Bot = require('facebook-messenger-bot').Bot; // import Bot class
const Elements = require('facebook-messenger-bot').Elements;

const myPageAccessToken = 'EAARJA41lo9EBABA80zYkkX1A1qHCsKSZBzkNhdEuLzdMQZBsLR5KoNrgPlMNxHcfZA5ZCyBEF1kumjlgMvbRgJmsY0ShJXWbWSVdfDFMcdjkgOgr36UquT9DSCfXidrtVZCZC2Tb1sLCbaLgWD7mSvaG9eqC1PbTZB8zCKrLV7NsQZDZD';
const myVerification = 'test';

const app = express();
const bot = new Bot(myPageAccessToken, myVerification); // create bot instance

app.use('/facebook', bot.router()); // use the router
console.log('listenting at 3000');
app.listen(3000);

app.get('/', (req, res) => {
    res.send('I am a chatbot');
});

bot.on('message', async message => {
    const {sender} = message;

    // get sender id
    console.log(`Received a message from ${sender.id}`);

    // fetch additional user properties
    await sender.fetch(`first_name,last_name,profile_pic`, true); // true: use cache

    console.log(`Fetched ${sender.first_name}, ${sender.last_name}, ${sender.profile_pic}`);

    const {text, images, videos, location, audio} = message;

    if (text) {
        console.log(text);      // 'hey'
    }

    if (images) {
        console.log(images);    // ['http://...', 'http://...']
    }

    if (videos) {
        console.log(videos);    // ['http://...', 'http://...']
    }

    if (location) {
        console.log(location);  // {title, long, lat, url}
    }

    if (audio) {
        console.log(audio);     // url
    }

    console.log(message);       // log the message to learn about all the attributes
});