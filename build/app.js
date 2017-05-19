"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extend");
var mqtt = require("mqtt");
var Eight_1 = require("./Eight");
var client = mqtt.connect("wss://mbltest01.mqtt.iot.gz.baidubce.com:8884/mqtt", {
    username: "mbltest01/eight",
    password: "JWFcQYcFXxIbghm+8JEvqRfPf9fN7Ah3NeZupc6Zgqw="
});
client.on("connect", function (connack) {
    //console.log("on connect");
    //console.log(JSON.stringify(connack));
    client.subscribe("toEight/#", function (err, granted) {
        //console.log("subscribe");
        //console.log(JSON.stringify(err));
        //console.log(JSON.stringify(granted));
        if ((typeof err === "undefined" || err === null) && granted.some(function (value) { return value.topic === "toEight/#" && value.qos !== 128; })) {
            client.on("message", function (topic, message, packet) {
                //console.log("on message");
                //console.log(JSON.stringify(topic));
                //console.log(JSON.stringify(message));
                //console.log(JSON.stringify(packet));
                console.log(topic + " <= " + message.toString());
                var jsonMessage = JSON.parse(message.toString());
                switch (topic) {
                    case "toEight/i.am":
                        Eight_1.Eight.Inbound.iAm(client, jsonMessage);
                        break;
                }
            });
        }
    });
});
