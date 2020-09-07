import React from 'react';
import { Colors } from '@assets/Colors';
import * as Styles from './styles';
import * as BaseComponents from '@components/BaseComponents';
import { MessageRecord, ContactRecord } from '@utils/airtable/interface';
import { sendSMS, mapRedirect, getAddress } from '@utils/helper';

import { GlobalContext } from '@components/ContextProvider';
import { Icon } from '@assets/fonts/Fonts';
import Hyperlink from 'react-native-hyperlink';

interface CardProps {
  record: MessageRecord;
}

export default class MessageCard extends React.Component<CardProps> {
  static contextType = GlobalContext;

  replyAdmin = (sender: ContactRecord, subject: string): void => {
    const { firstName, lastName, cohortName } = this.context.user;
    const greeting = `RE: ${subject}\nHi, this is ${firstName} ${lastName} from ${cohortName}\n\n`;
    sendSMS(sender.phone, greeting);
  };

  createEventInfo = info => {
    return (
      <Styles.EventInfo>
        <Styles.IconStyle check={info.iconName}>
          <Icon name={info.iconName} color={Colors.brandGray} size={22} />
        </Styles.IconStyle>
        <Styles.EventInfoText>
          <Styles.InfoHeader check={info.iconName}>{info.header}</Styles.InfoHeader>
          <Styles.InfoSubHeader check={info.iconName}>{info.subheader}</Styles.InfoSubHeader>
        </Styles.EventInfoText>
      </Styles.EventInfo>
    );
  };

  renderEvent() {
    const { eventDate, eventTime, eventAddress, eventCity, eventState, eventZipcode } = this.props.record;
    const addr = getAddress(eventAddress, eventCity, eventState, eventZipcode);

    const date = {
      iconName: 'time',
      header: eventDate,
      subheader: eventTime,
    };

    const location = {
      iconName: 'location',
      header: eventAddress,
      subheader: addr.csZipcode,
    };

    return (
      <Styles.EventContainer>
        <Styles.EventCard>
          {this.createEventInfo(date)}
          <BaseComponents.MapRedirect onPress={mapRedirect(addr.full)}>
            {this.createEventInfo(location)}
          </BaseComponents.MapRedirect>
        </Styles.EventCard>
      </Styles.EventContainer>
    );
  }

  showButton(cardColor: string): React.ReactElement {
    const { sender, subject } = this.props.record;
    const { name, phone } = sender;

    if (name && phone) {
      return (
        <Styles.Button cardColor={cardColor} onPress={(): void => this.replyAdmin(sender, subject)}>
          <BaseComponents.ButtonText>Message {this.props.record.sender.name}</BaseComponents.ButtonText>
        </Styles.Button>
      );
    } else return <></>;
  }

  render() {
    const { body, sender, subject, isEvent, date } = this.props.record;
    const cardColor = Colors.brandBlue;
    return (
      <BaseComponents.Container borderLeft cardColor={cardColor}>
        {sender ? <Styles.Sender>{sender.name}</Styles.Sender> : null}
        <BaseComponents.Date>{date}</BaseComponents.Date>
        <BaseComponents.Subject>{subject}</BaseComponents.Subject>
        {isEvent ? this.renderEvent() : <></>}
        <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9' }}>
          <BaseComponents.TextBody>{body}</BaseComponents.TextBody>
        </Hyperlink>
        {this.showButton(cardColor)}
      </BaseComponents.Container>
    );
  }
}
