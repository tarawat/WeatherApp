const express = require('express');
const ejs = require('ejs');
const https = require('https');
const bodyparser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/input.html');
  res.render('input');
});

app.post('/', (req, res) => {
  console.log('post request received');
  const query = req.body.city;
  const apikey = '505c637deade715e3f579991f7a16655';
  const unit = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&units=' +
    unit +
    '&appid=' +
    apikey;

  https.get(url, function (response) {
    console.log(res.statusCode);

    response.on('data', function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const tempMin = weatherdata.main.temp_min;
      const tempMax = weatherdata.main.temp_max;
      const country = weatherdata.sys.country;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imgURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.render('result', {
        WeatherIcon: imgURL,
        City: query,
        Country: country,
        temperature: temp,
        Description: desc,
        MinTemperature: tempMin,
        MaxTemperature: tempMax,
      });
    });
  });
});
app.listen(3000, () => {
  console.log('server is running on port 3000');
});
