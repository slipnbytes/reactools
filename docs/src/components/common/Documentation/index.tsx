import React from 'react';

import styles from './styles.module.css';

/* eslint-disable import-helpers/order-imports */
import { mergeClassNames } from '../../../../..';

export const Documentation = ({ children }: PropsWithChildren) => (
  <main className={mergeClassNames('main-container-base', styles.container)}>
    {children}
  </main>
);
