"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var Eight;
(function (Eight) {
    var Inbound = (function () {
        function Inbound() {
        }
        Inbound.iAm = function (client, iAm) {
            app_1.db.insert({
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            }, function (err, newDocs) {
                console.log("err" + " => " + JSON.stringify(err));
                console.log("newDocs" + " => " + JSON.stringify(newDocs));
            });
            var heIs = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("fromEight/heIs" + " => " + JSON.stringify(heIs));
            client.publish("fromEight/heIs", JSON.stringify(heIs), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
            var youAre = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log(iAm.whoAmI + "/youAre" + " => " + JSON.stringify(youAre));
            client.publish(iAm.whoAmI + "/youAre", JSON.stringify(youAre), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        Inbound.iAmNoMore = function (client, iAmNoMore) {
            var heIsNoMore = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("fromEight/heIs" + " => " + JSON.stringify(heIsNoMore));
            client.publish("fromEight/heIs", JSON.stringify(heIsNoMore), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
            var youAreNoMore = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log(iAmNoMore.whoAmI + "/youAre" + " => " + JSON.stringify(youAreNoMore));
            client.publish(iAmNoMore.whoAmI + "/youAre", JSON.stringify(youAreNoMore), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        Inbound.heartbeat = function (client, heartbeat) {
            var someoneBeat = {
                who: heartbeat.who,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("fromEight/someoneBeat" + " => " + JSON.stringify(someoneBeat));
            client.publish("fromEight/someoneBeat", JSON.stringify(someoneBeat), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        Inbound.tellOther = function (client, tellOther) {
            var someoneSaid = {
                who: tellOther.who,
                what: tellOther.what,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("fromEight/someoneSaid" + " => " + JSON.stringify(someoneSaid));
            client.publish("fromEight/someoneSaid", JSON.stringify(someoneSaid), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        Inbound.tellSomeone = function (client, tellSomeone) {
            var someoneSaid = {
                who: tellSomeone.who,
                what: tellSomeone.what,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log(tellSomeone.who + "/someoneSaid" + " => " + JSON.stringify(someoneSaid));
            client.publish(tellSomeone.who + "/someoneSaid", JSON.stringify(someoneSaid), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        Inbound.whoAreThere = function (client, whoAreThere) {
            var who = [];
            app_1.db.find({}, function (err, docs) {
                console.log("err" + " => " + JSON.stringify(err));
                console.log("docs" + " => " + JSON.stringify(docs));
            });
            for (var item in ["a", "b", "c"]) {
                who.push(item);
            }
            var thereAre = {
                who: who,
                when: new Date().yyyyMMddHHmmss()
            };
            console.log(whoAreThere.who + "/thereAre" + " => " + JSON.stringify(thereAre));
            client.publish(whoAreThere.who + "/thereAre", JSON.stringify(thereAre), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        };
        return Inbound;
    }());
    Eight.Inbound = Inbound;
})(Eight = exports.Eight || (exports.Eight = {}));
