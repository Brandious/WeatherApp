const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');

const request = require('request');

const apiKey = process.env.apiKey;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index',  {weather: null, error: null});
});

app.post('/', (req, res)=> {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
   
    //console.log(city);
    request(url, (err, response, body) => {
        if(err)
            res.render('index', {weather: null, error: err});
        else 
        {
            let weather = JSON.parse(body);
            if(weather.main == undefined)
                res.render('index',{weather: null, error: 'Undefined'});
            else 
            {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running...');
});
