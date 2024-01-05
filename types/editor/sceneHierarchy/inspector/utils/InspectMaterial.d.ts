import { RemoteMaterial, RemoteObject } from "../../types";
import RemoteThree from '@/core/remote/RemoteThree';
export declare function acceptedMaterialNames(name: string): boolean;
export declare function niceMaterialNames(name: string): string;
export declare function clampedNames(name: string): boolean;
export declare function uploadLocalImage(): Promise<string>;
export declare function inspectMaterialItems(material: RemoteMaterial, object: RemoteObject, three: RemoteThree): any[];
export declare function InspectMaterial(object: RemoteObject, three: RemoteThree): any;
