const express = require("express");
const app = express();
const port = 3000;
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){
    const query = req.body.cityName;
    const appid = req.body.appID;
    const units = req.body.unitType;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;
    https.get(url, function (response) {
        response.on('data', function (data) {
            const obj = JSON.parse(data);
            const temperature = obj.main.temp;
            const city = obj.name;
            const weatherCondition = obj.weather[0].description;
            const picId = obj.weather[0].icon;
            res.write("<h1>The temperature of " + city + " is " + temperature + " degrees.</h1>");
            res.write("<p>The weather is currently " + weatherCondition + "</p>");
            const picUrl = "http://openweathermap.org/img/wn/" + picId + "@2x.png";
            res.write("<img src=" + picUrl + ">");
            res.send();
        });

    });
});




app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});