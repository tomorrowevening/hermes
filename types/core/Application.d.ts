import BaseRemote from './remote/BaseRemote';
import { AppSettings } from '../utils/detectSettings';
export declare class Application {
    assets: {
        audio: Map<string, any>;
        image: Map<string, ImageBitmap>;
        json: Map<string, any>;
        model: Map<string, any>;
        video: Map<string, any>;
    };
    components: Map<string, any>;
    settings: AppSettings;
    onUpdateCallback?: () => void;
    protected playing: boolean;
    protected rafID: number;
    dispose(): void;
    detectSettings(dev?: boolean, editor?: boolean): Promise<void>;
    update(): void;
    draw(): void;
    play: () => void;
    pause: () => void;
    private onUpdate;
    addComponent(name: string, component: BaseRemote): void;
    get debugEnabled(): boolean;
    get isApp(): boolean;
    set isApp(value: boolean);
    get editor(): boolean;
    set editor(value: boolean);
}
