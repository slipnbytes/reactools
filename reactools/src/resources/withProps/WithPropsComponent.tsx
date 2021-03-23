import { ComponentType } from 'react';

import type { AnyObject } from '@/shared/types';

export function createFactory<P extends AnyObject>(
  props: P,
): <T extends ComponentType<any>>(Component: T) => T {
  return <T extends ComponentType<any>>(Component: T): T => {
    const WithPropsComponent = (componentProps: any): any => (
      <Component {...props} {...componentProps} />
    );

    WithPropsComponent.displayName =
      Component.displayName || 'WithPropsComponent';

    return WithPropsComponent as T;
  };
}
