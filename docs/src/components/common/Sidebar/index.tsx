import { mergeClassNames, useOutClick } from '@hitechline/react';
import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

import { Link } from '@components/forward/Link';

import { documentationSections } from '@fixtures/data/documentation-sections';
import { useUI } from '@fixtures/hooks/useUI';

import styles from './styles.module.css';

export const Sidebar = () => {
  const { ref, addListener, removeListener } = useOutClick<HTMLDivElement>();
  const { sidebarOpened, closeSidebar, openSidebar } = useUI();

  useEffect(() => {
    addListener(closeSidebar);

    return () => {
      removeListener(closeSidebar);
    };
  }, [addListener, removeListener, closeSidebar]);

  return (
    <div ref={ref} className={styles.wrap}>
      <div
        className={mergeClassNames('main-container-base', styles.responsive)}
      >
        <button
          type="button"
          onClick={openSidebar}
          className="flex items-center"
        >
          <GiHamburgerMenu size="4rem" />
          <span className="ml-3">MENU</span>
        </button>
      </div>

      <div
        className={mergeClassNames(styles.container, {
          opened: sidebarOpened,
        })}
      >
        <button
          type="button"
          onClick={closeSidebar}
          className={mergeClassNames(
            'flex',
            'items-center',
            styles.close__button,
          )}
        >
          <MdClose size="4rem" />
        </button>

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
    </div>
  );
};

/* eslint react/jsx-key: 0 */
