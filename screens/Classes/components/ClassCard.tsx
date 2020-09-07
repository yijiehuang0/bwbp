import React from 'react';
import { Colors } from '@assets/Colors';
import * as BaseComponents from '@components/BaseComponents';
import * as Styles from './styles';
import { ClassRecord } from '@utils/airtable/interface';
import { mapRedirect } from '@utils/helper';
import { Icon } from '@assets/fonts/Fonts';

interface CardProps {
  classRecord: ClassRecord;
}

export class ClassCard extends React.Component<CardProps> {
  renderClassEvents = (classEvent, index) => {
    const { eventType, date, startTime, endTime } = classEvent;
    return (
      <BaseComponents.ListItem key={index}>
        <Styles.IconStyle check={eventType}>
          <Icon name={eventType === 'Open House' ? 'coffee' : 'grad'} color={Colors.iconGray} size={20} />
        </Styles.IconStyle>
        <Styles.BoldInfo>{classEvent.eventType}: </Styles.BoldInfo>
        <BaseComponents.TextBody>{`${date}, ${startTime} - ${endTime}`}</BaseComponents.TextBody>
      </BaseComponents.ListItem>
    );
  };

  renderEventInfo = (iconStr, eventInfo) => {
    return (
      <Styles.EventInfoText>
        <Icon name={iconStr} color={Colors.iconGray} size={22} />
        <Styles.BoldInfo>{eventInfo}</Styles.BoldInfo>
      </Styles.EventInfoText>
    );
  };

  render() {
    const { name, address, startDate, endDate, classStartTime, classEndTime, classEvents } = this.props.classRecord;
    return (
      <BaseComponents.Container borderLeft cardColor={Colors.brandYellow}>
        <BaseComponents.Subject>{name}</BaseComponents.Subject>
        <BaseComponents.MapRedirect onPress={mapRedirect(address)}>
          <BaseComponents.LinkText>{address}</BaseComponents.LinkText>
        </BaseComponents.MapRedirect>

        <Styles.Flex>
          {this.renderEventInfo('calendar', `${startDate} - ${endDate}`)}
          {this.renderEventInfo('time', `${classStartTime} - ${classEndTime}`)}
        </Styles.Flex>

        <BaseComponents.Line />

        <BaseComponents.ListContainer>
          {classEvents.map((event, index) => this.renderClassEvents(event, index))}
        </BaseComponents.ListContainer>
      </BaseComponents.Container>
    );
  }
}
