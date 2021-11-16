declare type Listener = {
    id: string;
    pubId: string;
    callback: (data?: any) => any;
};
declare const pubsub: {
    publish(pubId: string, data?: any): void;
    subscribe(pubId: string, callback: Listener["callback"]): string;
    unsubscribe(id: string): void;
};
export { pubsub };
