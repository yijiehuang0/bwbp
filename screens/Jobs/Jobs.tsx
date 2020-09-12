import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '@components/ContextProvider';
import { BaseScreen } from '../BaseScreen/BaseScreen';
import { JobCard } from './components/Card/JobCard';
import { JobRecord } from '@utils/airtable/interface';
import { getJobs, updateJob } from '@utils/airtable/requests';
import { Status } from '../StatusScreen/StatusScreen';
import ContactsModal from '@components/ContactsModal/ContactsModal';
import { StatusController } from '@screens/StatusScreen/StatusController';
import JobsFilterOverlay from './components/Card/JobsFilterOverlay';
import { Availability } from './components/Card/JobsFilterOverlay';
import { Button } from 'react-native-elements';
import { View } from 'react-native';

import { cloneDeep } from 'lodash';

interface JobsScreenState {
  title: string;
  jobs: JobRecord[];
  refreshing: boolean;
  staticHeader: boolean;
  status: Status;
  filter: boolean;
}

interface JobsScreenProps {
  navigation: BottomTabNavigationProp;
}

export class JobsScreen extends React.Component<JobsScreenProps, JobsScreenState> {
  static contextType = GlobalContext;

  constructor(props: JobsScreenProps) {
    super(props);

    this.state = {
      title: 'Jobs',
      jobs: [],
      refreshing: true,
      staticHeader: false,
      status: Status.none,
      filter: false,
    };

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount(): void {
    this.props.navigation.addListener('focus', this.fetchRecords);
  }

  createJobCard = (record: JobRecord, index: number): React.ReactElement => {
    return (
      <JobCard
        key={index}
        user={this.context.user}
        submitted={this.context.user.rid in record.users}
        jobRecord={record}
        updatefn={(): void => {
          updateJob(record.rid, this.context.user);
        }}
      />
    );
  };

  fetchRecords = (): void => {
    this.setState({
      refreshing: true,
    });
    const jobs: JobRecord[] = getJobs();
    this.setState({
      refreshing: false,
      jobs,
      status: this.getStatus(jobs),
    });
  };

  displayJobs = (availability: Availability): void => {
    this.filterJobs(getJobs(), availability);
  };

  filterJobs = (jobs: JobRecord[], availability: Availability): void => {
    const newJobs: JobRecord[] = cloneDeep(jobs).filter(function(job: JobRecord) {
      for (var day of job.schedule) {
        if (availability[day.toLowerCase()] == true && availability.hourswk >= +job.hours) {
          return true;
        }
      }
    });
    this.setState({ jobs: newJobs });
  };

  getStatus = (jobs: JobRecord[]): Status => {
    if (!this.context.user.graduated) {
      return Status.jobLocked;
    } else if (jobs.length == 0) {
      return Status.noContent;
    } else {
      return Status.none;
    }
  };

  toggleFilter = (): void => {
    this.setState({ filter: !this.state.filter });
  };

  setHeader = (): void => {
    this.setState({ staticHeader: true });
  };

  renderCards(): React.ReactElement {
    return <>{this.state.jobs.map((record, index) => this.createJobCard(record, index))}</>;
  }

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
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Button title="Filter Search" containerStyle={{ width: '50%' }} onPress={this.toggleFilter} />
        </View>
        <JobsFilterOverlay
          displayJobs={this.displayJobs}
          toggleFilter={this.toggleFilter}
          visible={this.state.filter}
        />
        <StatusController defaultChild={this.renderCards()} status={this.state.status} />
      </BaseScreen>
    );
  }
}
