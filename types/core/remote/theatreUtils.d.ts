import Application from '../Application';
import RemoteTheatre from './RemoteTheatre';
import type { BroadcastData } from '../types';
export declare function theatreApp(app: Application, remote: RemoteTheatre, msg: BroadcastData): void;
export declare function theatreEditor(app: Application, remote: RemoteTheatre, msg: BroadcastData): void;
