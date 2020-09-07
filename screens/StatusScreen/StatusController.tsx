import React from 'react';
import { Status, StatusScreen } from './StatusScreen';
import { GlobalContext } from '@components/ContextProvider';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type StatusControllerProps = {
  defaultChild: React.ReactElement;
  status: Status;
  viewWithoutLogin?: boolean;
};

export class StatusController extends React.Component<StatusControllerProps> {
  static contextType = GlobalContext;

  render() {
    const { defaultChild, status, viewWithoutLogin } = this.props;

    if (!this.context.loggedIn && !viewWithoutLogin) {
      return <StatusScreen name={Status.login} action={(): void => this.context.navigation.navigate('Login')} />;
    } else if (status !== Status.none) {
      return <StatusScreen name={status} />;
    }

    return defaultChild;
  }
}
