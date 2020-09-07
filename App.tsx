import React from 'react';
import * as Font from 'expo-font';
import { setCustomText } from 'react-native-global-props';
import { Fonts } from './assets/fonts/Fonts';
import { AppContainer } from './components/Navbar';
import { UserRecord } from './utils/airtable/interface';
import { Contact } from './screens/Messages/data';
import ContextProvider from './components/ContextProvider';
import { storeUser } from '@utils/airtable/requests';
import { UserMock } from '@utils/airtable/mocks';

interface GlobalProps {
  loggedIn: boolean;
  user: UserRecord;
  pocs: { [rid: string]: Contact };
  setUser: Function;
  setPocs: Function;
  setNavigation: Function;
}

interface AppState {
  isLoaded: boolean;
  globalProps: GlobalProps;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      globalProps: {
        loggedIn: false,
        user: UserMock,
        pocs: null,
        setUser: this.setUser,
        setPocs: this.setPocs,
        setNavigation: this.setNavigation,
      },
    };
    this.setUser = this.setUser.bind(this);
    this.setPocs = this.setPocs.bind(this);
    this.setNavigation = this.setNavigation.bind(this);
  }

  async componentDidMount() {
    await this.setDefaultFont();
    this.setState({
      isLoaded: true,
    });
  }

  setUser = async (user: UserRecord) => {
    await storeUser(user);
    const { globalProps } = this.state;
    this.setState({
      globalProps: {
        ...globalProps,
        loggedIn: true,
        user,
      },
    });
  };

  setPocs = (pocs): void => {
    const { globalProps } = this.state;
    this.setState({
      globalProps: {
        ...globalProps,
        pocs,
      },
    });
  };

  setNavigation = (navigation): void => {
    const { globalProps } = this.state;
    this.setState({
      globalProps: {
        ...globalProps,
        navigation,
      },
    });
  };

  setDefaultFont = async () => {
    await Font.loadAsync(Fonts);
    const customTextProps = {
      style: { fontFamily: 'source-sans-pro-regular' },
    };
    setCustomText(customTextProps);
  };

  render(): JSX.Element {
    const { isLoaded, globalProps } = this.state;
    if (!isLoaded) {
      return null;
    }
    return (
      <ContextProvider state={globalProps}>
        <AppContainer />
      </ContextProvider>
    );
  }
}
