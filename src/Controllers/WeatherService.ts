import { DarkskyData } from "../Models/DarkskyData"
import { MapboxData } from "../Models/MapboxData";
import { GeocodingService } from "./GeocodingService";
import { DarkskyDataService } from "../Controllers/DarkskyDataService";

class WeatherService {
    //Service for forwarding a location name to coordinates
    _geocodingService: GeocodingService;
    //Service for getting the latest weather based on 
    _darkskyService: DarkskyDataService;

    constructor()
    {
        this._geocodingService = new GeocodingService();
        this._darkskyService = new DarkskyDataService();
    }

    //This functions is used to convert a location name to the latest weather information
    public GetLocationLatestWeather(location: string, callback: (err: boolean, data: object) => void)
    {
        //Forward geocode the location that is typed in by the user
        this._geocodingService.forwardGeocode(location, (err: boolean, mapboxData: MapboxData) => {
            if(err)
            {
                console.log("GeocodingService: Response Value was null!");
                callback(false, {err: "Gecoding response was invalid", darkskyData: {}, mapboxData: {}});
            }

            //If we have a valid response access the longitude and latitude of the location
            let long = mapboxData.features[0].geometry.coordinates[0];
            let lat = mapboxData.features[0].geometry.coordinates[1];

            //With the provided longitude and latitude ask Darksky for the latest weather of the location
            this._darkskyService.GetLatestWeather(lat, long, (err: boolean, darkskyData: DarkskyData) => {
                if(err)
                {
                    console.log("The latest weather returned an error!");
                    callback(false, {err: "The latest weather returned an error", darkskyData: {}, mapboxData: {}});
                }
    
                //Get the current weather data and do some simple math equations to make them better understandable
                darkskyData.currently.temperature = Math.round(darkskyData.currently.temperature);
                darkskyData.currently.humidity *= 100;
                darkskyData.currently.precipProbability *= 100;

                //Return both mapboxData and darkskyData
                callback(false, {err: "", darkskyData: darkskyData, mapboxData: mapboxData});
            });
        });
    }

    //This function gets the latest weather just from coordinates alone
    public GetCoordsLatestWeather(lat: number, long: number, callback: (err: boolean, data: object) => void)
    {
        //We will request the mapbox data just with coordinates and not a location name
        this._geocodingService.decodeGeocode(lat, long, (err: boolean, mapboxData: MapboxData) => {
            if(err)
            {
                callback(true, {err: "Gecoding response was invalid", darkskyData: {}, mapboxData: {}});
            }

            //Get the latest weather with the latitude and longitude provided
            this._darkskyService.GetLatestWeather(lat, long, (err: boolean, darkskyData: DarkskyData) => {
                if(err)
                {
                    console.log("The latest weather returned an error!");
                    callback(true, {err: "The latest weather returned an error", darkskyData: {}, mapboxData: {}});
                }
                
                //Get the current weather data and do some simple math equations to make them better understandable
                darkskyData.currently.temperature = Math.round(darkskyData.currently.temperature);
                darkskyData.currently.humidity *= 100;
                darkskyData.currently.precipProbability *= 100;

                //Return both mapboxData and darkskyData
                callback(false, {err: "", darkskyData: darkskyData, mapboxData: mapboxData});
            });
        });
    }
}

export { WeatherService };