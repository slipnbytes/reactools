import React from 'react';

import { Documentation } from '@components/common/Documentation';
import { Footer } from '@components/common/Footer';
import { Sidebar } from '@components/common/Sidebar';

import styles from './styles.module.css';

/* eslint-disable import-helpers/order-imports */
import { mergeClassNames } from '../../../..';

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <div className={mergeClassNames('main-container-loose', styles.content)}>
      <Sidebar />

      <Documentation>{children}</Documentation>
    </div>

    <Footer />
  </>
);
