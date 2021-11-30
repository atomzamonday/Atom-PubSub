"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const nanoid_1 = require("nanoid");
const listenerProto = {
    id: "",
    callback: () => { },
};
class PubSub {
    constructor() {
        this.listeners = {};
        this.maps = [];
    }
    publish(pubId, data) {
        var _a;
        (_a = this.listeners[pubId]) === null || _a === void 0 ? void 0 : _a.forEach(({ callback }) => callback(data));
    }
    subscribe(pubId, callback) {
        var _a;
        const listener = Object.create(listenerProto);
        const id = (0, nanoid_1.nanoid)();
        listener.id = id;
        listener.callback = callback;
        if (this.listeners[pubId] === undefined) {
            this.listeners[pubId] = [];
        }
        (_a = this.listeners[pubId]) === null || _a === void 0 ? void 0 : _a.push(listener);
        this.maps.push({
            pubId,
            id,
        });
        return id;
    }
    unsubscribe(id) {
        const map = this.maps.find(({ id: listenerId }) => listenerId === id);
        if (map !== undefined) {
            const { pubId } = map;
            this.listeners[pubId] = this.listeners[pubId].filter(({ id: listenerId }) => listenerId !== id);
        }
    }
}
const pubsub = new PubSub();
exports.pubsub = pubsub;
