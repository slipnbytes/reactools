import { ComponentType, ComponentClass, FunctionComponent } from 'react';

export type Listener = () => void;

export type AnyObject = Record<any, any>;

export type AcceptedNode = Node | null;

export type Nullable<T> = T | null;

export type AnyThing<T> = T | Promise<T>;

export type PromiseType<T> = T extends Promise<infer R> ? R : T;

export type GetComponentProps<
  T extends ComponentType<any>
> = T extends ComponentType<infer P> ? P : never;

export type GetComponentReturnType<
  T extends ComponentType<any>
> = T extends FunctionComponent<any>
  ? ReturnType<T>
  : T extends ComponentClass<any>
  ? ReturnType<InstanceType<T>['render']>
  : any;
