import { mergeClassNames } from '@hitechline/reactools';

import styles from './styles.module.css';

export const Documentation = ({ children }: PropsWithChildren): JSX.Element => (
  <main className={mergeClassNames('main-container-base', styles.container)}>
    {children}
  </main>
);
