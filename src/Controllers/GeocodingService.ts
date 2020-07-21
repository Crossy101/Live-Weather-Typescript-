import { HttpService } from './HttpService';
import { MapboxData } from '../Models/MapboxData';

export class GeocodingService extends HttpService {
    mapBoxToken: string = "pk.eyJ1IjoiY3Jvc3N5MTk5OCIsImEiOiJjazgzeXJ0eGsweG41M3BvdzVwb3JoaWFhIn0.FzNr9OObIte0sW9vbqfiKA";

    //Function for asking mapbox API to forward a location name to coordinates
    public forwardGeocode(location: string, callback: (err: boolean, data: MapboxData ) => void)
    {
        //If the user hasn't typed in any location and searches just default to swansea
        if(location == "")
            location = "Swansea";
        //Create a HTTPS Request to Mapbox for geographical coordinates from a location name
        this.CreateSecureRequest(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${this.mapBoxToken}`, (err, data) => {
            //Convert api request to MapBoxData Model
            let mapboxData: MapboxData = data as MapboxData;
            
            if(err)
            {
                console.log("GeocodingService ERROR: reponse was null");
                callback(true, mapboxData);
            }
            
            //If the features length is less than 0 e.g. we have no weather given to us
            if(mapboxData.features.length <= 0)
                callback(true, mapboxData);

            //Return mapboxData
            callback(false, mapboxData);
        });
    }

    //Function for changing coordinates to a location name
    public decodeGeocode(latitude: number, longitude: number, callback: (err: boolean, data: MapboxData) => void)
    {
        console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.mapBoxToken}`);
        this.CreateSecureRequest(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.mapBoxToken}`, (err, data) => {
            let mapboxData: MapboxData = data as MapboxData;
            
            if(err)
            {
                console.log("GeocodingService ERROR: reponse was null");
                callback(true, mapboxData);
            }
            
            if(mapboxData.features.length <= 0)
                callback(true, mapboxData);

            callback(false, mapboxData);
        });
    }
}