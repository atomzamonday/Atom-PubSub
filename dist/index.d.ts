declare type Listener = {
    id: string;
    callback: (data?: any) => any;
};
declare class PubSub {
    private listeners;
    private maps;
    publish(pubId: string, data?: any): void;
    subscribe(pubId: string, callback: Listener["callback"]): string;
    unsubscribe(id: string): void;
}
declare const pubsub: PubSub;
export { pubsub };
