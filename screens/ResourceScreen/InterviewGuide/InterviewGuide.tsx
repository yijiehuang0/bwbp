import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import { LoadingView } from '@components/BaseComponents';
import { Colors } from '@assets/Colors';
import { getInterviewGuide } from '@utils/airtable/requests';
import { GlobalContext } from '@components/ContextProvider';
import { PDFScreen } from '@screens/PDFScreen/PDFScreen';

interface InterviewGuideScreenProps {
  navigation: StackNavigationProp;
}

interface InterviewGuideScreenState {
  uri: string;
}

export class InterviewGuideScreen extends React.Component<InterviewGuideScreenProps, InterviewGuideScreenState> {
  static contextType = GlobalContext;

  constructor(props: InterviewGuideScreenProps) {
    super(props);

    this.state = {
      uri: '',
    };
  }

  async componentDidMount(): Promise<void> {
    const interviewGuide = await getInterviewGuide();
    await this.setState({ uri: interviewGuide[0].url });
  }

  renderRefresh = (): React.ReactElement => (
    <LoadingView>
      <ActivityIndicator color={Colors.brandYellow} size="large" />
    </LoadingView>
  );

  render() {
    return (
      <PDFScreen
        title="Interview Guide"
        uri={this.state.uri}
        backButton={(): void => {
          this.props.navigation.goBack();
        }}
      ></PDFScreen>
    );
  }
}
