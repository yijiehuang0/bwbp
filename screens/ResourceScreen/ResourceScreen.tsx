import React from 'react';
import { BaseScreen } from '@screens/BaseScreen/BaseScreen';
import { resourceCard } from '@screens/ResourceScreen/ResourceCard/ResourceCard';
import { cardTypes } from '@screens/ResourceScreen/ResourceCard/ResourceCard';
import { TouchableOpacity } from 'react-native';
import * as Styles from './styles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ContactsModal from '@components/ContactsModal/ContactsModal';
import { GlobalContext } from '@components/ContextProvider';
import { Status } from '@screens/StatusScreen/StatusScreen';

import { StatusController } from '@screens/StatusScreen/StatusController';

interface ResourceScreenProps {
  navigation: BottomTabNavigationProp;
}

interface ResourceScreenState {
  title: string;
  cards: Record<string, React.ReactElement>;
}

export class ResourceScreen extends React.Component<ResourceScreenProps, ResourceScreenState> {
  static contextType = GlobalContext;

  constructor(props: ResourceScreenProps) {
    super(props);

    const cards: Record<string, React.ReactElement> = {};
    for (const cardType in cardTypes) {
      cards[cardType] = this.navigationResourceCards(cardType);
    }

    this.state = {
      title: 'Resources',
      cards,
    };
  }

  navigationResourceCards = (cardType: string): React.ReactElement => {
    return <TouchableOpacity>{resourceCard(cardType)}</TouchableOpacity>;
  };

  renderCards = (): React.ReactElement => {
    return (
      <Styles.OuterContainer>
        <Styles.InnerContainer>
          {this.state.cards.BrewGuide}
          {this.state.cards.InterviewGuide}
        </Styles.InnerContainer>
        <Styles.InnerContainer>
          {this.state.cards.Worksheets}
          {this.state.cards.Tutorials}
        </Styles.InnerContainer>
      </Styles.OuterContainer>
    );
  };

  render() {
    return (
      <BaseScreen
        title={'Resources'}
        static="expanded"
        headerRightButton={
          <ContactsModal
            resetTesting={(): void => {
              this.props.navigation.navigate('Login');
            }}
          />
        }
      >
        <StatusController defaultChild={this.renderCards()} status={Status.none} />
      </BaseScreen>
    );
  }
}
