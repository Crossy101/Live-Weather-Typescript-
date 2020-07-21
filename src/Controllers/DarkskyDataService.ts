import { HttpService } from "./HttpService";
import { DarkskyData } from "../Models/DarkskyData"

export class DarkskyDataService extends HttpService {
    //Darksky API Key
    darkskyAPIKey: string = "28b2709a73b03fdf005cd642f74a6151";

    public GetLatestWeather(latitude: number, longitude: number, callback: (err: boolean, data: DarkskyData) => void)
    {
        //Link API to be able to get the latest weather of a location
        let darkskyLink: string = `https://api.darksky.net/forecast/${this.darkskyAPIKey}/${latitude},${longitude}?exclude=flags&units=uk2`;
        this.CreateSecureRequest(darkskyLink, (err, res) => {
            //Convert DarkskyData to Model
            let darkskyData = res as DarkskyData;

            //If an error occurred during the API request
            if(err)
            {
                console.log("LATEST WEATHER ERROR: A problem has occured!");
                callback(true, darkskyData);
            }
            //Return dark sky data
            callback(false, darkskyData);
        });
    }
}
