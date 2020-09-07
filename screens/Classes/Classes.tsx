import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BaseScreen } from '../BaseScreen/BaseScreen';
import { ClassRecord } from '@utils/airtable/interface';
import { ClassCard } from './components/ClassCard';
import { getClasses } from '@utils/airtable/requests';
import { Status } from '@screens/StatusScreen/StatusScreen';
import ContactsModal from '@components/ContactsModal/ContactsModal';

import { StatusController } from '@screens/StatusScreen/StatusController';

interface ClassesScreenState {
  title: string;
  classes: ClassRecord[];
  refreshing: boolean;
  status: Status;
}

interface ClassesScreenProps {
  navigation: BottomTabNavigationProp;
}

export class ClassesScreen extends React.Component<ClassesScreenProps, ClassesScreenState> {
  constructor(props: ClassesScreenProps) {
    super(props);

    this.state = {
      title: 'Classes',
      classes: [],
      refreshing: true,
      status: Status.none,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.fetchRecords);
  }

  fetchRecords = async (): Promise<void> => {
    this.setState({
      refreshing: true,
    });
    const classes: ClassRecord[] = await getClasses();
    this.setState({
      refreshing: false,
      classes,
      status: classes.length == 0 ? Status.noContent : Status.none,
    });
  };

  renderCards = (): React.ReactElement => {
    return (
      <>
        {this.state.classes.map((record, index) => (
          <ClassCard key={index} classRecord={record} />
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
        headerRightButton={
          <ContactsModal
            resetTesting={(): void => {
              this.props.navigation.navigate('Login');
            }}
          />
        }
      >
        <StatusController defaultChild={this.renderCards()} status={this.state.status} viewWithoutLogin={true} />
      </BaseScreen>
    );
  }
}
