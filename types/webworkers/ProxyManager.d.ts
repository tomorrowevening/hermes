import { EventDispatcher } from 'three';
interface SizeData {
    left: number;
    top: number;
    width: number;
    height: number;
}
interface EventData extends SizeData {
    type: string;
    id?: number;
    data?: any;
    preventDefault?: () => void;
    stopPropagation?: () => void;
}
export declare class ElementProxyReceiver extends EventDispatcher {
    style: Record<string, any>;
    left: number;
    top: number;
    width: number;
    height: number;
    ownerDocument: any;
    constructor();
    get clientWidth(): number;
    set clientWidth(value: number);
    get clientHeight(): number;
    set clientHeight(value: number);
    setPointerCapture(): void;
    releasePointerCapture(): void;
    getBoundingClientRect(): DOMRect;
    handleEvent(data: EventData): void;
    focus(): void;
    getRootNode(): any;
}
export declare class ProxyManager {
    targets: Record<number, ElementProxyReceiver>;
    constructor();
    makeProxy(data: {
        id: number;
    }): void;
    getProxy(id: number): ElementProxyReceiver;
    handleEvent(data: {
        id: number;
        data: EventData;
    }): void;
}
export {};
