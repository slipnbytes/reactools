import React from 'react';

import { Link } from '@components/forward/Link';

import { documentationSections } from '@fixtures/data/documentation-sections';

import styles from './styles.module.css';

/* eslint-disable import-helpers/order-imports */
import { mergeClassNames } from '../../../../..';

export const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={mergeClassNames('main-container-base', styles.content)}>
        {documentationSections.map(({ title, links }) => (
          <div>
            {title && <h4>{title}</h4>}

            <section>
              {links.map(({ href, title: linkTitle }) => (
                <Link href={href}>{linkTitle}</Link>
              ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

/* eslint react/jsx-key: 0 */
