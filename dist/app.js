"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const WeatherService_1 = require("./Controllers/WeatherService");
const bodyParser = __importStar(require("body-parser"));
const app = express_1.default();
app.use(express_1.default.static(__dirname + '/Public'));
app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    let weatherService = new WeatherService_1.WeatherService();
    weatherService.GetLocationLatestWeather("Swansea", (err, data) => {
        if (err) {
            console.log("ERROR CANNOT FIND LOCATION!");
        }
        res.render("index", data);
    });
});
app.get("/GetWeatherDetails/:location", (req, res) => {
    if (!req.params.location || req.params.location.length <= 0)
        res.send({ err: "The specified location is not valid", darkskyData: {}, mapboxData: {} });
    console.log("Location API: " + req.params.location);
    let weatherService = new WeatherService_1.WeatherService();
    weatherService.GetLocationLatestWeather(req.params.location, (err, data) => {
        if (err) {
            console.log("ERROR CANNOT FIND LOCATION!");
        }
        res.send(data);
    });
});
app.get("/GetWeatherCoords/:longitude/:latitude", (req, res) => {
    if (!req.params.latitude || req.params.latitude.length <= 0) {
        res.send({ err: "The specified location is not valid", darkskyData: {}, mapboxData: {} });
        return;
    }
    if (!req.params.longitude || req.params.longitude.length <= 0) {
        res.send({ err: "The specified location is not valid", darkskyData: {}, mapboxData: {} });
        return;
    }
    let weatherService = new WeatherService_1.WeatherService();
    weatherService.GetCoordsLatestWeather(parseFloat(req.params.latitude), parseFloat(req.params.longitude), (err, data) => {
        res.send(data);
    });
});
app.listen(5000, () => console.log("Server has started!"));
