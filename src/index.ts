import { nanoid } from "nanoid";

type Listener = {
  id: string;
  // pubId: string;
  callback: (data?: any) => any;
};

const listenerProto: Listener = {
  id: "",
  // pubId: "",
  callback: () => {},
};

type Listeners = {
  [pubId: string]: Listener[];
};

type ListenerMap = {
  id: string;
  pubId: string;
};

const PubSub = () => {
  // const __private__ = {
  //   listeners: [] as Listener[],
  // };

  const listeners: Listeners = {};
  const maps: ListenerMap[] = [];

  return {
    publish(pubId: string, data?: any) {
      listeners[pubId]?.forEach(({ callback }) => callback(data));
      // const children = __private__.listeners.filter(
      //   (listener) => listener.pubId === pubId
      // );
      // children.forEach(({ callback }) => {
      //   callback(data);
      // });
    },
    subscribe(pubId: string, callback: Listener["callback"]) {
      const listener = Object.create(listenerProto) as Listener;
      const id = nanoid();
      listener.id = id;
      // listener.pubId = pubId;
      listener.callback = callback;
      if (listeners[pubId] === undefined) {
        listeners[pubId] = [];
      }
      listeners[pubId]?.push(listener);
      maps.push({
        id,
        pubId,
      });
      // __private__.listeners.push(listener);
      return id;
    },
    unsubscribe(id: string) {
      const pubId = maps.find((v) => v.id === id)?.pubId;
      if (typeof pubId === "string") {
        listeners[pubId] = listeners[pubId]?.filter((v) => v.id === id) || [];
      }
      // const left = __private__.listeners.filter(
      //   (listener) => listener.id !== id
      // );
      // __private__.listeners = left;
    },
  };
};

const pubsub = PubSub();

export { pubsub };
