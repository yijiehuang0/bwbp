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


// Global props are available to everyone
// loggedIn -> user logged in?
// pocs -> string->Contacts
// setUser for the global state
// setNavigation for global state
interface GlobalProps {
  loggedIn: boolean;
  user: UserRecord;
  pocs: { [rid: string]: Contact };
  setUser: Function;
  setPocs: Function;
  setNavigation: Function;
}

// State of this app
interface AppState {
  isLoaded: boolean;
  globalProps: GlobalProps;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    // initalize the state
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

    // bind actions that will change the state
    this.setUser = this.setUser.bind(this);
    this.setPocs = this.setPocs.bind(this);
    this.setNavigation = this.setNavigation.bind(this);
  }


  //Render is set first, then we set the default font
  // Then intialize the state
  async componentDidMount() {
    await this.setDefaultFont();
    this.setState({
      isLoaded: true,
    });
  }

  // Asynchronous function that gets the user record
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

  // Point of contacts
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
