"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt = require("mqtt");
var client = mqtt.connect("wss://mbltest01.mqtt.iot.gz.baidubce.com:8884/mqtt", {
    username: "mbltest01/eight",
    password: "JWFcQYcFXxIbghm+8JEvqRfPf9fN7Ah3NeZupc6Zgqw="
});
client.on("connect", function (connack) {
    console.log("on connect");
    console.log(JSON.stringify(connack));
    client.subscribe("eight/#", function (err, granted) {
        console.log("subscribe");
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(granted));
        if ((typeof err === 'undefined' || err === null) && granted.some(function (value) { return value.topic === "eight/#" && value.qos !== 128; })) {
            client.on("message", function (topic, message, packet) {
                console.log("on message");
                console.log(JSON.stringify(topic));
                console.log(JSON.stringify(message));
                console.log(JSON.stringify(packet));
                console.log(topic + ": " + message.toString());
            });
        }
    });
});
