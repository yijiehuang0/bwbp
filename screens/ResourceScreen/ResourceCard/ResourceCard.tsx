import React from 'react';
import * as Styles from './styles';
import { View } from 'react-native';

export const cardTypes: Record<string, Record<string, string>> = {
  BrewGuide: {
    image: require('@assets/imgs/brew-guide.png'),
    subjectText: 'Brew guide',
  },
  InterviewGuide: {
    image: require('@assets/imgs/interview-guide.png'),
    subjectText: 'Interview guide',
  },
  Worksheets: {
    image: require('@assets/imgs/worksheets.png'),
    subjectText: 'Worksheets',
  },
  Flashcards: {
    image: require('@assets/imgs/flash-cards.png'),
    subjectText: 'Flash cards',
  },
  Tutorials: {
    image: require('@assets/imgs/tutorials.png'),
    subjectText: 'Tutorials',
  },
};

export function resourceCard(resource: string): Element {
  const cardType = cardTypes[resource];

  return (
    <Styles.ResourceContainer>
      <Styles.ResourceImage source={cardType.image} resizeMode="contain"></Styles.ResourceImage>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
        <Styles.ResourceHeader>{cardType.subjectText}</Styles.ResourceHeader>
      </View>
    </Styles.ResourceContainer>
  );
}
