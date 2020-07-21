"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpService_1 = require("./HttpService");
class GeocodingService extends HttpService_1.HttpService {
    constructor() {
        super(...arguments);
        this.mapBoxToken = "pk.eyJ1IjoiY3Jvc3N5MTk5OCIsImEiOiJjazgzeXJ0eGsweG41M3BvdzVwb3JoaWFhIn0.FzNr9OObIte0sW9vbqfiKA";
    }
    //Function for asking mapbox API to forward a location name to coordinates
    forwardGeocode(location, callback) {
        if (location == "")
            location = "Swansea";
        console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${this.mapBoxToken}`);
        this.CreateSecureRequest(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${this.mapBoxToken}`, (err, data) => {
            let mapboxData = data;
            if (err) {
                console.log("GeocodingService ERROR: reponse was null");
                callback(true, mapboxData);
            }
            if (mapboxData.features.length <= 0)
                callback(true, mapboxData);
            callback(false, mapboxData);
        });
    }
    //Function for changing coordinates to a location name
    decodeGeocode(latitude, longitude, callback) {
        console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.mapBoxToken}`);
        this.CreateSecureRequest(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.mapBoxToken}`, (err, data) => {
            let mapboxData = data;
            if (err) {
                console.log("GeocodingService ERROR: reponse was null");
                callback(true, mapboxData);
            }
            if (mapboxData.features.length <= 0)
                callback(true, mapboxData);
            callback(false, mapboxData);
        });
    }
}
exports.GeocodingService = GeocodingService;
