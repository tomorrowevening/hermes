import RemoteTheatre from '../core/remote/RemoteTheatre';
export declare function customizeTheatreElements(): Promise<void>;
export declare function animateObjectTransform(sheet: string, key: string, obj: any, theatre: RemoteTheatre): void;
type PropType = 'array' | 'boolean' | 'color' | 'euler' | 'matrix2' | 'matrix3' | 'matrix4' | 'number' | 'object' | 'string' | 'texture' | 'vector2' | 'vector3' | 'vector4';
type PropToAdd = {
    name: string;
    type: PropType;
    value: any;
};
export declare function getObjectMaterialProps(material: any): PropToAdd[];
export declare function getObjectMaterialObject(props: PropToAdd[]): {};
export declare function applyObjectMaterial(material: any, props: PropToAdd[], values: any): void;
export declare function animateObjectMaterial(sheet: string, key: string, material: any, theatre: RemoteTheatre): void;
export {};
