import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '@components/ContextProvider';
import { BaseScreen } from '../BaseScreen/BaseScreen';
import MessageCard from './components/Card/MessageCard';
import { MessageRecord } from '@utils/airtable/interface';
import { getMessages } from '@utils/airtable/requests';
import { Status } from '@screens/StatusScreen/StatusScreen';
import ContactsModal from '@components/ContactsModal/ContactsModal';

import { StatusController } from '@screens/StatusScreen/StatusController';

interface MessagesScreenState {
  title: string;
  messages: MessageRecord[];
  isLoaded: boolean;
  refreshing: boolean;
  staticHeader: boolean;
  status: Status;
}

interface MessagesScreenProps {
  navigation: BottomTabNavigationProp;
}

export class MessagesScreen extends React.Component<MessagesScreenProps, MessagesScreenState> {
  static contextType = GlobalContext;

  constructor(props: MessagesScreenProps) {
    super(props);

    this.state = {
      title: 'Messages',
      messages: [],
      isLoaded: false,
      refreshing: true,
      staticHeader: false,
      status: Status.none,
    };
  }

  componentDidMount(): void {
    this.props.navigation.addListener('focus', this.fetchRecords);
  }

  fetchRecords = async (): Promise<void> => {
    this.setState({
      refreshing: true,
    });
    const messages: MessageRecord[] = await getMessages(this.context.user);
    this.setState({
      refreshing: false,
      messages,
      status: messages.length == 0 ? Status.noContent : Status.none,
    });
  };

  setHeader = (): void => {
    this.setState({ staticHeader: true });
  };

  renderCards = (): React.ReactElement => {
    return (
      <>
        {this.state.messages.map((record, index) => (
          <MessageCard record={record} key={index} />
        ))}
      </>
    );
  };

  render() {
    return (
      <BaseScreen
        title={this.state.title}
        refreshMethod={this.fetchRecords}
        refreshing={this.state.refreshing}
        static={this.state.status != Status.none ? 'expanded' : ''}
        headerRightButton={
          <ContactsModal
            resetTesting={(): void => {
              this.props.navigation.navigate('Login');
            }}
          />
        }
      >
        <StatusController defaultChild={this.renderCards()} status={this.state.status} />
      </BaseScreen>
    );
  }
}
