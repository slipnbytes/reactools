import { mergeClassNames, useOutClick } from '@hitechline/reactools';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

import { Link } from '@components/forward/Link';

import { documentationSections } from '@resources/data/documentation-sections';
import { useRouterChange } from '@resources/hooks/useRouterChange';
import { useUI } from '@resources/hooks/useUI';
import { generateRandomString } from '@resources/utils/generateRandomString';

import styles from './styles.module.css';

export const Sidebar = (): JSX.Element => {
  const { asPath } = useRouter();
  const { ref, addListener, removeListener } = useOutClick<HTMLDivElement>();
  const { sidebarOpened, closeSidebar, openSidebar } = useUI();

  useRouterChange(closeSidebar);

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
            <div key={generateRandomString()}>
              {title && <h4>{title}</h4>}

              <section>
                {links.map(({ href, title: linkTitle }) => (
                  <Link
                    key={generateRandomString()}
                    href={href}
                    className={mergeClassNames({
                      active: href === asPath,
                    })}
                  >
                    {linkTitle}
                  </Link>
                ))}
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
