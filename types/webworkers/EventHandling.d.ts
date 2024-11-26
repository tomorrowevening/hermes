type EventHandler = (event: Event, sendFn: (data: any) => void) => void;
export declare const WebworkerEventHandlers: Record<string, any>;
export declare class ElementProxy {
    id: number;
    worker: Worker;
    constructor(element: HTMLElement, worker: Worker, eventHandlers: Record<string, EventHandler>);
}
export {};
