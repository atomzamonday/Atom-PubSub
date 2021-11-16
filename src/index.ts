import { nanoid } from "nanoid";

type Listener = {
  id: string;
  pubId: string;
  callback: (data?: any) => any;
};

const listenerProto: Listener = {
  id: "",
  pubId: "",
  callback: () => {},
};

const PubSub = () => {
  const __private__ = {
    listeners: [] as Listener[],
  };

  return {
    publish(pubId: string, data?: any) {
      const children = __private__.listeners.filter(
        (listener) => listener.pubId === pubId
      );
      children.forEach(({ callback }) => {
        callback(data);
      });
    },
    subscribe(pubId: string, callback: Listener["callback"]) {
      const listener = Object.create(listenerProto) as Listener;
      const id = nanoid();
      listener.id = id;
      listener.pubId = pubId;
      listener.callback = callback;
      __private__.listeners.push(listener);
      return id;
    },
    unsubscribe(id: string) {
      const left = __private__.listeners.filter(
        (listener) => listener.id !== id
      );
      __private__.listeners = left;
    },
  };
};

const pubsub = PubSub();

export { pubsub };
