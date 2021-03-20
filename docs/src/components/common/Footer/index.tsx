import { FiGithub } from 'react-icons/fi';

import styles from './styles.module.css';

export const Footer = (): JSX.Element => (
  <footer className={styles.container}>
    <div className="main-container">
      <section className="flex justify-between flex-wrap align-center items-center">
        <p className="my-3">Copyright © Hitechline</p>

        <p className="my-3">
          <a href="https://github.com/hitechline/reactools">
            <FiGithub size="2rem" />
          </a>
        </p>
      </section>
    </div>
  </footer>
);
