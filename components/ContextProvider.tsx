import React, { createContext } from 'react';

export const GlobalContext = createContext(null);

interface ContextProviderProps {
  state: unknown;
  children: unknown;
}
export default class ContextProvider extends React.Component<ContextProviderProps, {}> {
  render(): React.ReactElement {
    return <GlobalContext.Provider value={this.props.state}>{this.props.children}</GlobalContext.Provider>;
  }
}
