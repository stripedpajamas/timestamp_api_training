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
        console.log(date);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        unix = date.getTime();
        natural = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    res.send(JSON.stringify({ unix: unix, natural: natural }));
});

app.listen(process.env.PORT || 8080);