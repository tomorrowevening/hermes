import BaseRemote from './remote/BaseRemote';
import { AppSettings } from '../utils/detectSettings';
export default class Application {
    assets: {
        audio: Map<string, any>;
        image: Map<string, ImageBitmap>;
        json: Map<string, any>;
        model: Map<string, any>;
        video: Map<string, any>;
    };
    components: Map<string, BaseRemote>;
    settings: AppSettings;
    onUpdateCallback?: () => void;
    protected playing: boolean;
    protected rafID: number;
    constructor(dev: boolean, editor?: boolean);
    dispose(): void;
    detectSettings(): Promise<void>;
    update(): void;
    draw(): void;
    play: () => void;
    pause: () => void;
    protected onUpdate: () => void;
    addComponent(name: string, component: BaseRemote): void;
    get debugEnabled(): boolean;
    get isApp(): boolean;
    set isApp(value: boolean);
    get editor(): boolean;
    set editor(value: boolean);
}
