import { MDXProvider } from '@mdx-js/react';
import App from 'next/app';

import { Head } from '@components/common/Head';
import { Layout } from '@components/layout/Layout';
import { Provider as UIProvider } from '@components/layout/UI';

import '@styles/global.css';

const components = {};

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <MDXProvider components={components}>
        <UIProvider>
          <Head />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </MDXProvider>
    );
  }
}

export default MyApp;
