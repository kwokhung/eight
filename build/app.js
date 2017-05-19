"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var mqtt = require("mqtt");
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
                        var data = {
                            who: jsonMessage.whoAmI,
                            when: new Date().yyyyMMddHHmmss()
                        };
                        console.log(jsonMessage.whoAmI + "/you.are" + " => " + JSON.stringify(data));
                        client.publish(jsonMessage.whoAmI + "/you.are", JSON.stringify(data), function (err) {
                            //console.log("publish");
                            //console.log(JSON.stringify(err));
                        });
                        console.log("fromEight/he.is" + " => " + JSON.stringify(data));
                        client.publish("fromEight/he.is", JSON.stringify(data), function (err) {
                            //console.log("publish");
                            //console.log(JSON.stringify(err));
                        });
                        break;
                }
            });
        }
    });
});
