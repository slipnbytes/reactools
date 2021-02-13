export type Listener = () => void;

export type AnyObject = Record<any, any>;

export type AcceptedNode = Node | null;

export type RefValue<T> = T | null;

export type AnyThing<T> = T | Promise<T>;

export type GetPromiseType<T> = T extends Promise<infer R> ? R : T;
