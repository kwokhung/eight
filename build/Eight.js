"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eight = (function () {
    function Eight() {
    }
    Eight.iAm = function (client, iAm) {
        var youAre = {
            who: iAm.whoAmI,
            when: new Date().yyyyMMddHHmmss()
        };
        console.log(iAm.whoAmI + "/you.are" + " => " + JSON.stringify(youAre));
        client.publish(iAm.whoAmI + "/you.are", JSON.stringify(youAre), function (err) {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });
        console.log("fromEight/he.is" + " => " + JSON.stringify(youAre));
        client.publish("fromEight/he.is", JSON.stringify(youAre), function (err) {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });
    };
    return Eight;
}());
exports.Eight = Eight;
