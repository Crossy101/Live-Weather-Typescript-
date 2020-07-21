import express, { urlencoded } from 'express';
import * as path from 'path';
import { MapboxData } from './Models/MapboxData';
import { DarkskyData } from './Models/DarkskyData';
import { WeatherService } from "./Controllers/WeatherService";
import { IndexRequestModel } from './Models/IndexRequestModel';
import * as bodyParser from 'body-parser';


const app: express.Application = express();

app.use(express.static(__dirname+'/Public'));

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use(express.urlencoded())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    let weatherService: WeatherService = new WeatherService();

    weatherService.GetLocationLatestWeather("Swansea", (err, data) => {
        if(err)
        {
            console.log("ERROR CANNOT FIND LOCATION!");
        }
        res.render("index", data);
    });
});

app.get("/GetWeatherDetails/:location", (req, res) => {

    if(!req.params.location || req.params.location.length <=0 )
        res.send({err: "The specified location is not valid", darkskyData: {}, mapboxData: {}});

    console.log("Location API: " + req.params.location);

    let weatherService: WeatherService = new WeatherService();

    weatherService.GetLocationLatestWeather(req.params.location, (err, data) => {
        if(err)
        {
            console.log("ERROR CANNOT FIND LOCATION!");
        }
        res.send(data);
    });
});

app.get("/GetWeatherCoords/:longitude/:latitude", (req, res) => {
    if(!req.params.latitude || req.params.latitude.length <= 0 )
    {
        res.send({err: "The specified location is not valid", darkskyData: {}, mapboxData: {}});
        return;
    }
        
    if(!req.params.longitude || req.params.longitude.length <=0 )
    {
        res.send({err: "The specified location is not valid", darkskyData: {}, mapboxData: {}});
        return;
    }

    let weatherService: WeatherService = new WeatherService();

    weatherService.GetCoordsLatestWeather(parseFloat(req.params.latitude), parseFloat(req.params.longitude), (err, data) => {
        res.send(data);
    });
});

app.listen(5000, () => console.log("Server has started!"));