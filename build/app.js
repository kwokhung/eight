"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extend");
var mqtt = require("mqtt");
var Datastore = require("nedb");
var Eight_1 = require("./Eight");
var db = new Datastore();
exports.db = db;
db.ensureIndex({ fieldName: "who", unique: true }, function (err) {
    console.log("err" + " => " + JSON.stringify(err));
});
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
                    case "toEight/iAm":
                        Eight_1.Eight.Inbound.iAm(client, jsonMessage);
                        break;
                    case "toEight/iAmNoMore":
                        Eight_1.Eight.Inbound.iAmNoMore(client, jsonMessage);
                        break;
                    case "toEight/heartbeat":
                        Eight_1.Eight.Inbound.heartbeat(client, jsonMessage);
                        break;
                    case "toEight/tellOther":
                        Eight_1.Eight.Inbound.tellOther(client, jsonMessage);
                        break;
                    case "toEight/tellSomeone":
                        Eight_1.Eight.Inbound.tellSomeone(client, jsonMessage);
                        break;
                    case "toEight/whoAreThere":
                        Eight_1.Eight.Inbound.whoAreThere(client, jsonMessage);
                        break;
                }
            });
        }
    });
});
