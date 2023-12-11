import { RemoteMaterial, RemoteObject } from "../types";
import RemoteThree from '@/core/remote/RemoteThree';
export declare function inspectCamera(): any[];
export declare function inspectMaterialItems(material: RemoteMaterial): any[];
export declare function InspectMaterial(material: RemoteMaterial | RemoteMaterial[]): any;
export declare function InspectTransform(obj: RemoteObject, three: RemoteThree): import("react/jsx-runtime").JSX.Element;
