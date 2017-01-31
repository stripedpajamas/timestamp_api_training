/**
 * Created by petersquicciarini on 1/31/17.
 */

var express = require('express');
var app = express();

app.get('/:input', function(req, res) {
    var timeInput = req.params.input,
        unix = null,
        natural = null,
        validNat = /(?:^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$)/.test(timeInput),
        validUnix = /(?:^\d+$)/.test(timeInput);
    if (validNat || validUnix) {
        var date = new Date(validUnix ? +timeInput : timeInput);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        unix = date.getTime() / 1000;
        natural = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    res.send(JSON.stringify({ unix: unix, natural: natural }));
});

app.get('/', function(req, res) {
    res.send('This is an FCC timestamp API. Send natural date (December 12, 2015) or Unix timestamp (1450137600) and we will return a JSON object.');
});

app.listen(process.env.PORT || 5000);