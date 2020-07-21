"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeocodingService_1 = require("./GeocodingService");
const DarkskyDataService_1 = require("../Controllers/DarkskyDataService");
class WeatherService {
    constructor() {
        this._geocodingService = new GeocodingService_1.GeocodingService();
        this._darkskyService = new DarkskyDataService_1.DarkskyDataService();
    }
    //This functions is used to convert a location name to the latest weather information
    GetLocationLatestWeather(location, callback) {
        this._geocodingService.forwardGeocode(location, (err, mapboxData) => {
            if (err) {
                console.log("GeocodingService: Response Value was null!");
                callback(false, { err: "Gecoding response was invalid", darkskyData: {}, mapboxData: {} });
            }
            if (mapboxData.features[0].geometry.coordinates[0] != undefined && mapboxData.features[0].geometry.coordinates[1] != undefined) {
                let long = mapboxData.features[0].geometry.coordinates[0];
                let lat = mapboxData.features[0].geometry.coordinates[1];
                this._darkskyService.GetLatestWeather(lat, long, (err, darkskyData) => {
                    if (err) {
                        console.log("The latest weather returned an error!");
                        callback(false, { err: "The latest weather returned an error", darkskyData: {}, mapboxData: {} });
                    }
                    darkskyData.currently.temperature = Math.round(darkskyData.currently.temperature);
                    darkskyData.currently.humidity *= 100;
                    darkskyData.currently.precipProbability *= 100;
                    callback(false, { err: "", darkskyData: darkskyData, mapboxData: mapboxData });
                });
            }
            else {
                callback(true, { err: "Location is invalid!", darkskyData: {}, mapboxData: mapboxData });
            }
        });
    }
    //This function gets the latest weather just from coordinates alone
    GetCoordsLatestWeather(lat, long, callback) {
        this._geocodingService.decodeGeocode(lat, long, (err, mapboxData) => {
            if (err) {
                callback(true, { err: "Gecoding response was invalid", darkskyData: {}, mapboxData: {} });
            }
            this._darkskyService.GetLatestWeather(lat, long, (err, darkskyData) => {
                if (err) {
                    console.log("The latest weather returned an error!");
                    callback(true, { err: "The latest weather returned an error", darkskyData: {}, mapboxData: {} });
                }
                darkskyData.currently.temperature = Math.round(darkskyData.currently.temperature);
                darkskyData.currently.humidity *= 100;
                darkskyData.currently.precipProbability *= 100;
                callback(false, { err: "", darkskyData: darkskyData, mapboxData: mapboxData });
            });
        });
    }
}
exports.WeatherService = WeatherService;
