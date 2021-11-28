"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const nanoid_1 = require("nanoid");
const listenerProto = {
    id: "",
    callback: () => { },
};
const PubSub = () => {
    const listeners = {};
    const maps = [];
    return {
        publish(pubId, data) {
            var _a;
            (_a = listeners[pubId]) === null || _a === void 0 ? void 0 : _a.forEach(({ callback }) => callback(data));
        },
        subscribe(pubId, callback) {
            var _a;
            const listener = Object.create(listenerProto);
            const id = (0, nanoid_1.nanoid)();
            listener.id = id;
            listener.callback = callback;
            if (listeners[pubId] === undefined) {
                listeners[pubId] = [];
            }
            (_a = listeners[pubId]) === null || _a === void 0 ? void 0 : _a.push(listener);
            maps.push({
                id,
                pubId,
            });
            return id;
        },
        unsubscribe(id) {
            var _a, _b;
            const pubId = (_a = maps.find((v) => v.id === id)) === null || _a === void 0 ? void 0 : _a.pubId;
            if (typeof pubId === "string") {
                listeners[pubId] = ((_b = listeners[pubId]) === null || _b === void 0 ? void 0 : _b.filter((v) => v.id === id)) || [];
            }
        },
    };
};
const pubsub = PubSub();
exports.pubsub = pubsub;
