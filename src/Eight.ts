import * as mqtt from "mqtt";

export namespace Eight {
    export namespace Inbound {
        export interface IAmParameter {
            who: string;
            whoAmI: string;
            when: string;
        }

        export interface IAmNoMoreParameter {
            who: string;
            whoAmI: string;
            when: string;
        }

        export interface HeartbeatParameter {
            who: string;
            when: string;
        }

        export interface TellOtherParameter {
            who: string;
            what: any;
            when: string;
        }

        export interface TellSomeoneParameter {
            who: string;
            whom: string;
            what: any;
            when: string;
        }

        export interface WhoAreThereParameter {
            who: string;
            when: string;
        }
    }

    export namespace Outbound {
        export interface HeIsParameter {
            who: string;
            when: string;
        }

        export interface HeIsNoMoreParameter {
            who: string;
            when: string;
        }

        export interface YouAreParameter {
            who: string;
            when: string;
        }

        export interface YouAreNoMoreParameter {
            who: string;
            when: string;
        }

        export interface SomeoneBeatParameter {
            who: string;
            when: string;
        }

        export interface SomeoneSaidParameter {
            who: string;
            what: any;
            when: string;
        }

        export interface ThereAreParameter {
            who: string[];
            when: string;
        }
    }

    export class Inbound {
        static iAm(client: mqtt.Client, iAm: Inbound.IAmParameter) {
            let youAre: Outbound.YouAreParameter = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log(iAm.whoAmI + "/you.are" + " => " + JSON.stringify(youAre));

            client.publish(iAm.whoAmI + "/you.are", JSON.stringify(youAre), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });

            let heIs: Outbound.HeIsParameter = {
                who: iAm.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("fromEight/he.is" + " => " + JSON.stringify(heIs));

            client.publish("fromEight/he.is", JSON.stringify(heIs), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }

        static iAmNoMore(client: mqtt.Client, iAmNoMore: Inbound.IAmNoMoreParameter) {
            let youAreNoMore: Outbound.YouAreNoMoreParameter = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log(iAmNoMore.whoAmI + "/you.are" + " => " + JSON.stringify(youAreNoMore));

            client.publish(iAmNoMore.whoAmI + "/you.are", JSON.stringify(youAreNoMore), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });

            let HeIsNoMore: Outbound.HeIsNoMoreParameter = {
                who: iAmNoMore.whoAmI,
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("fromEight/he.is" + " => " + JSON.stringify(HeIsNoMore));

            client.publish("fromEight/he.is", JSON.stringify(HeIsNoMore), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }
    }
}
