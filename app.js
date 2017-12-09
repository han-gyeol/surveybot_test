'use strict';
const express = require('express');
const BootBot = require('bootbot');
const fs = require('fs');
const json2csv = require('json2csv');
const initDialogs = require('./dialogs');
const clock = require('./clock.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/participants', (req, res) => {
    fs.readFile(`./data/participants.JSON`, function (err, data) {
        if (err) res.send('Error occured on reading participant file.');
        else res.send(data);
    });
});

app.get('/response', (req, res) => {
    const id = req.query.id;
    fs.readFile(`./data/responses/${id}.JSON`, function (err, data) {
        if (err) res.send('Error occured on reading participant file.');
        else res.send(data);
    });
});

app.get('/csv', (req, res) => {
    const id = req.query.id;
    fs.readFile(`./data/responses/${id}.JSON`, function (err, data) {        
        var fields = ['date', 'time', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
        var json = JSON.parse(data);
        var csv = json2csv({ data: json, fields: fields });
        fs.writeFile(`./data/responses/csv/${id}.csv`, csv, (err) => {
            res.download(__dirname + `/data/responses/csv/${id}.csv`, `${id}.csv`);
        });
    });
});

const bot = new BootBot({
    accessToken: 'EAARJA41lo9EBABA80zYkkX1A1qHCsKSZBzkNhdEuLzdMQZBsLR5KoNrgPlMNxHcfZA5ZCyBEF1kumjlgMvbRgJmsY0ShJXWbWSVdfDFMcdjkgOgr36UquT9DSCfXidrtVZCZC2Tb1sLCbaLgWD7mSvaG9eqC1PbTZB8zCKrLV7NsQZDZD',
    verifyToken: 'all-your-base-are-belong-to-us',
    appSecret: '4fa260b39f7be65b2416fe699592e933'
});

app.listen(3001);
console.log('Frontpage running on port 3001')

initDialogs(bot);
bot.start();