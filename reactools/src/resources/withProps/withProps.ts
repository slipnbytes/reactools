import { ComponentType, FunctionComponent } from 'react';

import { createFactory } from './WithPropsComponent';

import type {
  AnyObject,
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

export interface WithPropsReturn<P extends AnyObject> {
  <T extends FunctionComponent<any>>(Component: T): (
    props: MergeProps<GetComponentProps<T>, P>,
    ...restParameters: RemovePropsParameterAndGetRestParameters<T>
  ) => GetComponentReturnType<T>;
  <T extends ComponentType<any>>(Component: T): (
    props: MergeProps<GetComponentProps<T>, P>,
  ) => GetComponentReturnType<T>;
}

export function withProps<P extends AnyObject>(props: P): WithPropsReturn<P> {
  return createFactory(props);
}
