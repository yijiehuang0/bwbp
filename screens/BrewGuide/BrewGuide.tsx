import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import { LoadingView } from '@components/BaseComponents';
import { Colors } from '@assets/Colors';
import { getBrewGuide } from '@utils/airtable/requests';
import { GlobalContext } from '@components/ContextProvider';
import { PDFScreen } from '@screens/PDFScreen/PDFScreen';

interface BrewGuideScreenProps {
  navigation: StackNavigationProp;
}

interface BrewGuideScreenState {
  uri: string;
}

export class BrewGuideScreen extends React.Component<BrewGuideScreenProps, BrewGuideScreenState> {
  static contextType = GlobalContext;

  constructor(props: BrewGuideScreenProps) {
    super(props);

    this.state = {
      uri: '',
    };
  }

  async componentDidMount(): Promise<void> {
    const brewGuide = await getBrewGuide();
    await this.setState({ uri: brewGuide[0].url });
  }

  renderRefresh = (): React.ReactElement => (
    <LoadingView>
      <ActivityIndicator color={Colors.brandYellow} size="large" />
    </LoadingView>
  );

  render() {
    return (
      <PDFScreen
        title="Brew Guide"
        uri={this.state.uri}
        backButton={(): void => {
          this.props.navigation.goBack();
        }}
      ></PDFScreen>
    );
  }
}
