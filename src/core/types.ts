export type ApplicationMode = 'listener' | 'editor'

export type VoidCallback = () => void

export type DataUpdateCallback = (data: any) => void

export const noop = () => {}
