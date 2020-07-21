"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
class HttpService {
    //Create a secure (HTTPS) request to the specified API
    CreateSecureRequest(url, callback) {
        let dataToReturn = {};
        https.get(url, (response) => {
            var _a;
            //Check if the reponse responded with 200 (OK)
            if (response.statusCode != 200) {
                console.log("The API request has responded with a status code: " + ((_a = response.statusCode) === null || _a === void 0 ? void 0 : _a.toString()));
                callback(true, {});
            }
            else {
                let buffer = "";
                //Print out the data we need
                response.on('data', (data) => {
                    buffer += data.toString();
                }).on("end", () => {
                    callback(false, JSON.parse(buffer));
                });
            }
            //If an error occured on the HTTPS Request
        }).on('error', (e) => {
            console.log(e);
            callback(true, {});
        });
    }
}
exports.HttpService = HttpService;
