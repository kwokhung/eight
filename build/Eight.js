"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eight;
(function (Eight) {
    var Inbound = (function () {
        function Inbound() {
        }
        Inbound.iAm = function (client, iAm) {
            var youAre = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log(iAm.whoAmI + "/you.are" + " => " + JSON.stringify(youAre));
            client.publish(iAm.whoAmI + "/you.are", JSON.stringify(youAre), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
            var heIs = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("fromEight/he.is" + " => " + JSON.stringify(heIs));
            client.publish("fromEight/he.is", JSON.stringify(heIs), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        Inbound.iAmNoMore = function (client, iAmNoMore) {
            var youAreNoMore = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log(iAmNoMore.whoAmI + "/you.are" + " => " + JSON.stringify(youAreNoMore));
            client.publish(iAmNoMore.whoAmI + "/you.are", JSON.stringify(youAreNoMore), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
            var HeIsNoMore = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("fromEight/he.is" + " => " + JSON.stringify(HeIsNoMore));
            client.publish("fromEight/he.is", JSON.stringify(HeIsNoMore), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        return Inbound;
    }());
    Eight.Inbound = Inbound;
})(Eight = exports.Eight || (exports.Eight = {}));
