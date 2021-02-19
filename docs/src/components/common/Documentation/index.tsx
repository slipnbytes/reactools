import { mergeClassNames } from '@hitechline/react';
import React from 'react';

import styles from './styles.module.css';

export const Documentation = ({ children }: PropsWithChildren) => (
  <main className={mergeClassNames('main-container-base', styles.container)}>
    {children}
  </main>
);
