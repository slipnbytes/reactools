import type { ComponentType, FunctionComponent } from 'react';

import { createFactory } from './WithPropsComponent';

import type {
  AnyObject,
  ComponentBase,
  GetComponentProps,
  GetComponentReturnType,
} from '@/shared/types';

type RemovePropsParameterAndGetRestParameters<
  T extends (...args: any[]) => any
> = T extends (props: any, ...restParameters: infer P) => any ? [...P] : [];

type MergeProps<Default extends AnyObject, Provided extends AnyObject> = Pick<
  Default,
  Exclude<keyof Default, keyof Provided>
> &
  Partial<Pick<Default, keyof Provided>>;

export interface WithPropsOtherComponent<
  T extends ComponentType<any>,
  P extends AnyObject
> extends ComponentBase<GetComponentProps<T>> {
  (props: MergeProps<GetComponentProps<T>, P>): GetComponentReturnType<T>;
}

export interface WithPropsFunctionComponent<
  T extends FunctionComponent<any>,
  P extends AnyObject
> extends ComponentBase<GetComponentProps<T>> {
  (
    props: MergeProps<GetComponentProps<T>, P>,
    ...restParameters: RemovePropsParameterAndGetRestParameters<T>
  ): GetComponentReturnType<T>;
}

export interface WithPropsReturn<P extends AnyObject> {
  <T extends FunctionComponent<any>>(Component: T): WithPropsFunctionComponent<
    T,
    P
  >;
  <T extends ComponentType<any>>(Component: T): WithPropsOtherComponent<T, P>;
}

export function withProps<P extends AnyObject>(props: P): WithPropsReturn<P> {
  return createFactory(props);
}
