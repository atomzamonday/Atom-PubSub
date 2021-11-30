import { nanoid } from "nanoid";

type Listener = {
  id: string;
  // pubId: string;
  callback: (data?: any) => any;
};

const listenerProto: Listener = {
  id: "",
  callback: () => {},
};

type Listeners = {
  [pubId: string]: Listener[];
};

type ListenerPubMap = {
  pubId: string;
  id: string;
};

class PubSub {
  // private pubIdCaches: string[] = [];
  private listeners: Listeners = {};
  private maps: ListenerPubMap[] = [];

  publish(pubId: string, data?: any) {
    this.listeners[pubId]?.forEach(({ callback }) => callback(data));
  }
  subscribe(pubId: string, callback: Listener["callback"]) {
    const listener = Object.create(listenerProto) as Listener;
    const id = nanoid();
    listener.id = id;
    // listener.pubId = pubId;
    listener.callback = callback;
    if (this.listeners[pubId] === undefined) {
      this.listeners[pubId] = [];
    }
    this.listeners[pubId]?.push(listener);
    this.maps.push({
      pubId,
      id,
    });
    return id;
  }
  unsubscribe(id: string) {
    const map = this.maps.find(({ id: listenerId }) => listenerId === id);
    if (map !== undefined) {
      const { pubId } = map;
      (this.listeners[pubId] as unknown as Listener[]) = (
        this.listeners[pubId] as unknown as Listener[]
      ).filter(({ id: listenerId }) => listenerId !== id);
    }
  }
}

const pubsub = new PubSub();

export { pubsub };
