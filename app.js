const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "1e7944f227831529f980e9ccd19af918";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const desc = weatherData.weather[0].description;
      const city = weatherData.name;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature is = " + temp + " .</h1><br>");
      res.write("<h1>There are " + desc + " in " + city + " .</h1><br>");
      res.write("<img src=" + imageURL + ">");
      res.send();
     })
    })
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));