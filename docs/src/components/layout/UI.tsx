import React, { createContext } from 'react';

import { Layout } from './Layout';

export const Context = createContext({});

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <Context.Provider value={{}}>
      <div id="app">
        <div id="layout">
          <Layout>{children}</Layout>
        </div>
      </div>
    </Context.Provider>
  );
};
