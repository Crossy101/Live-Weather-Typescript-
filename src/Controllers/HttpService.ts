import * as https from 'https'

export class HttpService {
    //Create a secure (HTTPS) request to the specified API
    public CreateSecureRequest(url: string, callback: (error: boolean, data: object) => void)
    {
        let dataToReturn: object = {};
        https.get(url, (response) => {
            //Check if the reponse responded with 200 (OK)
            if(response.statusCode != 200)
            {
                console.log("The API request has responded with a status code: " + response.statusCode?.toString());
                callback(true, {});
            }
            else
            {
                let buffer: string = "";
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