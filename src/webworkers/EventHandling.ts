// Transfer Events

type EventHandler = (event: Event, sendFn: (data: any) => void) => void;

const mouseEventHandler = makeSendPropertiesHandler([
  'ctrlKey',
  'metaKey',
  'shiftKey',
  'button',
  'pointerId',
  'pointerType',
  'clientX',
  'clientY',
  'pageX',
  'pageY',
]);

const wheelEventHandlerImpl = makeSendPropertiesHandler([
  'clientX',
  'clientY',
  'deltaX',
  'deltaY',
  'deltaMode',
]);

const keydownEventHandler = makeSendPropertiesHandler([
  'ctrlKey',
  'metaKey',
  'shiftKey',
  'keyCode',
]);

function wheelEventHandler(event: WheelEvent, sendFn: (data: any) => void): void {
  event.preventDefault();
  wheelEventHandlerImpl(event, sendFn);
}

function preventDefaultHandler(event: Event): void {
  event.preventDefault();
}

function copyProperties(
  src: Record<string, any>,
  properties: string[],
  dst: Record<string, any>
): void {
  for (const name of properties) {
    dst[name] = src[name];
  }
}

function makeSendPropertiesHandler(properties: string[]): EventHandler {
  return function sendProperties(event: Event, sendFn: (data: any) => void): void {
    const data: Record<string, any> = { type: event.type };
    copyProperties(event as Record<string, any>, properties, data);
    sendFn(data);
  };
}

function touchEventHandler(event: TouchEvent, sendFn: (data: any) => void): void {
  const touches: Array<{ pageX: number; pageY: number }> = [];
  const data = { type: event.type, touches };

  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touches.push({
      pageX: touch.pageX,
      pageY: touch.pageY,
    });
  }

  sendFn(data);
}

// The four arrow keys
const orbitKeys: Record<string, boolean> = {
  '37': true, // left
  '38': true, // up
  '39': true, // right
  '40': true, // down
};

function filteredKeydownEventHandler(
  event: KeyboardEvent,
  sendFn: (data: any) => void
): void {
  const { keyCode } = event;
  if (orbitKeys[keyCode]) {
    event.preventDefault();
    keydownEventHandler(event, sendFn);
  }
}

// Proxy

export const WebworkerEventHandlers: Record<string, any> = {
  contextmenu: preventDefaultHandler,
  mousedown: mouseEventHandler,
  mousemove: mouseEventHandler,
  mouseup: mouseEventHandler,
  pointerdown: mouseEventHandler,
  pointermove: mouseEventHandler,
  pointerup: mouseEventHandler,
  touchstart: touchEventHandler,
  touchmove: touchEventHandler,
  touchend: touchEventHandler,
  wheel: wheelEventHandler,
  keydown: filteredKeydownEventHandler,
};

let nextProxyId = 0;

export class ElementProxy {
  id: number;
  worker: Worker;

  constructor(
    element: HTMLElement,
    worker: Worker,
    eventHandlers: Record<string, EventHandler>
  ) {
    this.id = nextProxyId++;
    this.worker = worker;

    const sendEvent = (data: any): void => {
      this.worker.postMessage({
        type: 'event',
        id: this.id,
        data,
      });
    };

    // Register an ID
    worker.postMessage({
      type: 'makeProxy',
      id: this.id,
    });

    for (const [eventName, handler] of Object.entries(eventHandlers)) {
      element.addEventListener(eventName, (event) => {
        handler(event as any, sendEvent);
      });
    }

    function sendSize(): void {
      sendEvent({
        type: 'resize',
        left: 0,
        top: 0,
        width: innerWidth,
        height: innerHeight,
      });
    }

    // Really need to use ResizeObserver
    window.addEventListener('resize', sendSize);
    sendSize();
  }
}
