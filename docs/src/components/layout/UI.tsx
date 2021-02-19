import React, { createContext, useState, useCallback } from 'react';

export interface ContextData {
  sidebarOpened: boolean;
  openSidebar(): void;
  closeSidebar(): void;
}

export const Context = createContext({} as ContextData);

export const Provider = ({ children }: PropsWithChildren) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const openSidebar = useCallback(() => {
    setSidebarOpened(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpened(false);
  }, []);

  return (
    <Context.Provider
      value={{
        sidebarOpened,
        openSidebar,
        closeSidebar,
      }}
    >
      <div id="app">
        <div id="layout">{children}</div>
      </div>
    </Context.Provider>
  );
};
