declare global {
    interface Date {
        yyyyMMddHHmmss(): string;
    }
}

Date.prototype.yyyyMMddHHmmss = function () {
    var date = this;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    return "" + year +
        (month < 10 ? "0" + month : month) +
        (day < 10 ? "0" + day : day) +
        (hh < 10 ? "0" + hh : hh) +
        (mm < 10 ? "0" + mm : mm) +
        (ss < 10 ? "0" + ss : ss);
};

import * as mqtt from "mqtt";
import { Eight } from "./Eight";

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

                let jsonMessage: Eight.Inbound.IAmParameter = JSON.parse(message.toString());

                switch (topic) {
                    case "toEight/i.am":
                        Eight.Inbound.iAm(client, jsonMessage);

                        break;
                }
            });
        }
    });
})
