import React from 'react';
import * as Styles from './styles';
import { Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@assets/Colors';
import * as BaseComponents from '@components/BaseComponents';
import { VideoRecord } from '@utils/airtable/interface';
import { Linking } from 'expo';

export function videoCard(videoRecord: VideoRecord, index: int): React.ReactElement {
  return (
    <View key={index}>
      <Styles.VideoCardContainer onPress={() => Linking.openURL(videoRecord.link)}>
        <Styles.VideoContainer>
          <Image
            source={{ uri: videoRecord.thumbnailUrl }}
            style={{ width: 78, height: 78, overflow: 'hidden', borderRadius: 5, marginLeft: 0 }}
          />
          <Styles.TextContainer>
            <Styles.horizontalFlex>
              <Styles.VideoHeader>{videoRecord.name}</Styles.VideoHeader>
              <Feather name={'external-link'} color={Colors.iconGray} size={20} style={{ marginLeft: 20 }} />
            </Styles.horizontalFlex>
            <Styles.VideoText>{videoRecord.description}</Styles.VideoText>
          </Styles.TextContainer>
        </Styles.VideoContainer>
      </Styles.VideoCardContainer>
    </View>
  );
}
