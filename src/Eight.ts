import * as mqtt from "mqtt";

export default class Eight {
    static iAm(client: mqtt.Client, jsonMessage: any) {
        let data: any = {
            who: jsonMessage.whoAmI,
            when: new Date().yyyyMMddHHmmss()
        };

        console.log(jsonMessage.whoAmI + "/you.are" + " => " + JSON.stringify(data));

        client.publish(jsonMessage.whoAmI + "/you.are", JSON.stringify(data), (err) => {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });

        console.log("fromEight/he.is" + " => " + JSON.stringify(data));

        client.publish("fromEight/he.is", JSON.stringify(data), (err) => {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });
    }
}