"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eight = (function () {
    function Eight() {
    }
    Eight.iAm = function (client, jsonMessage) {
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
    };
    return Eight;
}());
exports.default = Eight;
