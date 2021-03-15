import { mergeClassNames } from '@hitechline/reactools';

import { Alpha } from '@components/common/Alpha';
import { Documentation } from '@components/common/Documentation';
import { Footer } from '@components/common/Footer';
import { Sidebar } from '@components/common/Sidebar';

import styles from './styles.module.css';

export const Layout = ({ children }: PropsWithChildren): JSX.Element => (
  <>
    <div className={mergeClassNames('main-container-loose', styles.content)}>
      <Sidebar />

      <Documentation>{children}</Documentation>
    </div>

    <Alpha />
    <Footer />
  </>
);
