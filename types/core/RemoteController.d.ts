import Application from './Application';
interface RemoteHandlers {
    components?: boolean;
    theatre?: boolean;
    three?: boolean;
    tweakpane?: boolean;
}
export default function RemoteController(app: Application, handlers: RemoteHandlers): void;
export {};
