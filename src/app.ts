import "./extend";
import * as mqtt from "mqtt";
import * as Datastore from "nedb";
import { Eight } from "./Eight";

var db: Datastore = new Datastore();

db.ensureIndex({ fieldName: "who", unique: true }, function (err) {
    console.log("err" + " => " + JSON.stringify(err));
});

export { db };

let client = mqtt.connect("wss://mbltest01.mqtt.iot.gz.baidubce.com:8884/mqtt", {
    username: "mbltest01/eight",
    password: "JWFcQYcFXxIbghm+8JEvqRfPf9fN7Ah3NeZupc6Zgqw="
});

client.on("connect", (connack) => {
    //console.log("on connect");
    //console.log(JSON.stringify(connack));

    client.subscribe("toEight/#", (err, granted) => {
        //console.log("subscribe");
        //console.log(JSON.stringify(err));
        //console.log(JSON.stringify(granted));

        if ((typeof err === "undefined" || err === null) && granted.some(value => value.topic === "toEight/#" && value.qos !== 128)) {
            client.on("message", (topic, message, packet) => {
                //console.log("on message");
                //console.log(JSON.stringify(topic));
                //console.log(JSON.stringify(message));
                //console.log(JSON.stringify(packet));

                console.log(topic + " <= " + message.toString());

                let jsonMessage: any = JSON.parse(message.toString());

                switch (topic) {
                    case "toEight/iAm":
                        Eight.Inbound.iAm(client, jsonMessage);

                        break;

                    case "toEight/iAmNoMore":
                        Eight.Inbound.iAmNoMore(client, jsonMessage);

                        break;

                    case "toEight/heartbeat":
                        Eight.Inbound.heartbeat(client, jsonMessage);

                        break;

                    case "toEight/tellOther":
                        Eight.Inbound.tellOther(client, jsonMessage);

                        break;

                    case "toEight/tellSomeone":
                        Eight.Inbound.tellSomeone(client, jsonMessage);

                        break;

                    case "toEight/whoAreThere":
                        Eight.Inbound.whoAreThere(client, jsonMessage);

                        break;
                }
            });
        }
    });
})
