import * as mqtt from "mqtt";
import * as Datastore from "nedb";
import { db } from './app';
import { EightInterface } from "./EightInterface";

export namespace Eight {
    export class Inbound {
        static iAm(client: mqtt.Client, iAm: EightInterface.Inbound.IAmParameter) {
            db.ensureIndex({ fieldName: "who", unique: true }, function (err) {
                console.log("err" + " => " + JSON.stringify(err));
            });

            db.insert({
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            }, function (err, newDocs) {
                console.log("err" + " => " + JSON.stringify(err));
                console.log("newDocs" + " => " + JSON.stringify(newDocs));
            });

            let heIs: EightInterface.Outbound.HeIsParameter = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("fromEight/heIs" + " => " + JSON.stringify(heIs));

            client.publish("fromEight/heIs", JSON.stringify(heIs), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });

            let youAre: EightInterface.Outbound.YouAreParameter = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log(iAm.whoAmI + "/youAre" + " => " + JSON.stringify(youAre));

            client.publish(iAm.whoAmI + "/youAre", JSON.stringify(youAre), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }

        static iAmNoMore(client: mqtt.Client, iAmNoMore: EightInterface.Inbound.IAmNoMoreParameter) {
            let heIsNoMore: EightInterface.Outbound.HeIsNoMoreParameter = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("fromEight/heIs" + " => " + JSON.stringify(heIsNoMore));

            client.publish("fromEight/heIs", JSON.stringify(heIsNoMore), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });

            let youAreNoMore: EightInterface.Outbound.YouAreNoMoreParameter = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log(iAmNoMore.whoAmI + "/youAre" + " => " + JSON.stringify(youAreNoMore));

            client.publish(iAmNoMore.whoAmI + "/youAre", JSON.stringify(youAreNoMore), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }

        static heartbeat(client: mqtt.Client, heartbeat: EightInterface.Inbound.HeartbeatParameter) {
            let someoneBeat: EightInterface.Outbound.SomeoneBeatParameter = {
                who: heartbeat.who,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("fromEight/someoneBeat" + " => " + JSON.stringify(someoneBeat));

            client.publish("fromEight/someoneBeat", JSON.stringify(someoneBeat), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }

        static tellOther(client: mqtt.Client, tellOther: EightInterface.Inbound.TellOtherParameter) {
            let someoneSaid: EightInterface.Outbound.SomeoneSaidParameter = {
                who: tellOther.who,
                what: tellOther.what,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("fromEight/someoneSaid" + " => " + JSON.stringify(someoneSaid));

            client.publish("fromEight/someoneSaid", JSON.stringify(someoneSaid), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }

        static tellSomeone(client: mqtt.Client, tellSomeone: EightInterface.Inbound.TellSomeoneParameter) {
            let someoneSaid: EightInterface.Outbound.SomeoneSaidParameter = {
                who: tellSomeone.who,
                what: tellSomeone.what,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log(tellSomeone.who + "/someoneSaid" + " => " + JSON.stringify(someoneSaid));

            client.publish(tellSomeone.who + "/someoneSaid", JSON.stringify(someoneSaid), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }

        static whoAreThere(client: mqtt.Client, whoAreThere: EightInterface.Inbound.WhoAreThereParameter) {
            let who: string[] = [];

            for (let item in ["a", "b", "c"]) {
                who.push(item);
            }

            let thereAre: EightInterface.Outbound.ThereAreParameter = {
                who: who,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log(whoAreThere.who + "/thereAre" + " => " + JSON.stringify(thereAre));

            client.publish(whoAreThere.who + "/thereAre", JSON.stringify(thereAre), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }
    }
}
