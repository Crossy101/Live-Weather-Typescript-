"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpService_1 = require("./HttpService");
class DarkskyDataService extends HttpService_1.HttpService {
    constructor() {
        super(...arguments);
        this.darkskyAPIKey = "28b2709a73b03fdf005cd642f74a6151";
    }
    GetLatestWeather(latitude, longitude, callback) {
        let darkskyLink = `https://api.darksky.net/forecast/${this.darkskyAPIKey}/${latitude},${longitude}?exclude=flags&units=uk2`;
        this.CreateSecureRequest(darkskyLink, (err, res) => {
            let darkskyData = res;
            if (err) {
                console.log("LATEST WEATHER ERROR: A problem has occured!");
                callback(true, darkskyData);
            }
            callback(false, darkskyData);
        });
    }
}
exports.DarkskyDataService = DarkskyDataService;
