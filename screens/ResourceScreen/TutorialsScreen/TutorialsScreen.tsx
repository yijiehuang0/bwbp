import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import * as Styles from '../../BaseScreen/styles';
import { BaseHeader } from '../../BaseScreen/BaseHeader';
import { videoCard } from './TutorialCard';
import { VideoRecord } from '@utils/airtable/interface';
import { getVideos } from '@utils/airtable/requests';

interface TutorialsScreenState {
  title: string;
  videos: VideoRecord[];
}

interface TutorialsScreenProps {
  navigation: StackNavigationProp;
}

export class TutorialsScreen extends React.Component<TutorialsScreenProps, TutorialsScreenState> {
  constructor(props: TutorialsScreenProps) {
    super(props);

    this.state = {
      title: 'Tutorials',
      videos: [],
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', this.fetchRecords);
  }

  fetchRecords = async (): Promise<void> => {
    const videos: VideoRecord[] = await getVideos();
    this.setState({ videos });
  };

  render() {
    return (
      <Styles.Background>
        <BaseHeader title={this.state.title} static="collapsed" backButton={this.props.navigation.goBack} />
        <ScrollView>{this.state.videos.map((record, index) => videoCard(record, index))}</ScrollView>
      </Styles.Background>
    );
  }
}
