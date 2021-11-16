"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const nanoid_1 = require("nanoid");
const listenerProto = {
    id: "",
    pubId: "",
    callback: () => { },
};
const PubSub = () => {
    const __private__ = {
        listeners: [],
    };
    return {
        publish(pubId, data) {
            const children = __private__.listeners.filter((listener) => listener.pubId === pubId);
            children.forEach(({ callback }) => {
                callback(data);
            });
        },
        subscribe(pubId, callback) {
            const listener = Object.create(listenerProto);
            const id = (0, nanoid_1.nanoid)();
            listener.id = id;
            listener.pubId = pubId;
            listener.callback = callback;
            __private__.listeners.push(listener);
            return id;
        },
        unsubscribe(id) {
            const left = __private__.listeners.filter((listener) => listener.id !== id);
            __private__.listeners = left;
        },
    };
};
const pubsub = PubSub();
exports.pubsub = pubsub;
