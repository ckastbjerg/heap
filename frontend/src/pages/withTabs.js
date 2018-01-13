import React, { Component } from 'react';
import { Tab as TabsTab } from '../composers/Module';

export const Tab = ({ name, tab, onClick, children }) => (
  <TabsTab isActive={tab === name} onClick={() => onClick(name)}>
    {children}
  </TabsTab>
);

function withTabs(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = { tab: undefined };
      this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(tab) {
      this.setState({ tab });
    }

    render() {
      return (
        <WrappedComponent
          tab={this.state.tab}
          onTabChange={this.onTabChange}
          {...this.props}
        />
      );
    }
  };
}

export default withTabs;
