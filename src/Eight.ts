import * as mqtt from "mqtt";

export interface IAmParameter {
    who: string;
    whoAmI: string;
    when: string;
}

export interface YouAreParameter {
    who: string;
    when: string;
}

export class Eight {
    static iAm(client: mqtt.Client, iAm: IAmParameter) {
        let youAre: YouAreParameter = {
            who: iAm.whoAmI,
            when: new Date().yyyyMMddHHmmss()
        };

        console.log(iAm.whoAmI + "/you.are" + " => " + JSON.stringify(youAre));

        client.publish(iAm.whoAmI + "/you.are", JSON.stringify(youAre), (err) => {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });

        console.log("fromEight/he.is" + " => " + JSON.stringify(youAre));

        client.publish("fromEight/he.is", JSON.stringify(youAre), (err) => {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });
    }
}