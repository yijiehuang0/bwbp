import React from 'react';
import { Alert, View } from 'react-native';

import Collapsible from 'react-native-collapsible';
import * as Styles from './styles';
import { mapRedirect, getAddress } from '@utils/helper';
import { Colors } from '@assets/Colors';
import { JobRecord, UserRecord } from '@utils/airtable/interface';

import * as BaseComponents from '@components/BaseComponents';
import { Icon } from '@assets/fonts/Fonts';
import Hyperlink from 'react-native-hyperlink';

interface CardProps {
  user: UserRecord;
  jobRecord: JobRecord;
  updatefn: Function;
  submitted: boolean;
}

interface CardState {
  isOpen: boolean;
  submitted: boolean;
}

enum Icons {
  Clock = 'time',
  Sun = 'sun',
  Calendar = 'calendar',
  MapPin = 'location',
}

export class JobCard extends React.Component<CardProps, CardState> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      submitted: this.props.jobRecord.users.includes(this.props.user.rid),
    };
  }

  toggleDropdown = (): void => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  addInterestedUser = (): void => {
    if (!this.state.submitted) {
      this.setState({
        submitted: true,
      });
    }
    Alert.alert('Thank you', 'The employment specialist will contact you soon.'); // change when it's somebody else
  };

  eventInfo = (icon, prop) => {
    return (
      <BaseComponents.ListItem>
        <Styles.IconStyle check={icon}>
          <Icon name={icon} color={Colors.iconGray} size={22} />
        </Styles.IconStyle>
        <BaseComponents.ListItemText check={icon}>{prop}</BaseComponents.ListItemText>
      </BaseComponents.ListItem>
    );
  };

  renderInterestButton = () => {
    if (this.state.submitted) {
      return (
        <Styles.StatusWrapper>
          <Styles.Status>Contacted</Styles.Status>
          <Icon name="check" color={Colors.iconGray} size={18} />
        </Styles.StatusWrapper>
      );
    } else {
      return (
        <Styles.InterestButton onPress={this.addInterestedUser}>
          <BaseComponents.ButtonText>I'm Interested</BaseComponents.ButtonText>
        </Styles.InterestButton>
      );
    }
  };

  render() {
    const {
      storeName,
      jobName,
      jobDescription,
      hours,
      schedule,
      timeOfDay,
      address,
      city,
      state,
      zipcode,
    } = this.props.jobRecord;
    const addr = getAddress(address, city, state, zipcode);

    const hourswk: string = hours ? `${hours} hours/week` : '--';
    const scheduleShow: string = schedule ? schedule.join(', ') : '--';
    const timeOfDayShow: string = timeOfDay ? timeOfDay.join(', ') : '--';
    const cardColor: string = this.state.submitted ? Colors.brandGray : Colors.brandOlive;

    return (
      <BaseComponents.Container borderTop cardColor={cardColor}>
        <Styles.Info>{jobName}</Styles.Info>
        <Styles.Header>
          <BaseComponents.SubjectOverflow>{storeName}</BaseComponents.SubjectOverflow>
          <Styles.Info>{addr.cityState}</Styles.Info>
        </Styles.Header>
        <BaseComponents.Line />
        <Styles.EventColumn>
          {this.eventInfo('time', hourswk)}
          {this.eventInfo('sun', scheduleShow)}
          {this.eventInfo('calendar', timeOfDayShow)}
        </Styles.EventColumn>

        <Collapsible collapsed={!this.state.isOpen}>
          <BaseComponents.MapRedirect onPress={mapRedirect(addr.full)}>
            {this.eventInfo(Icons.MapPin, addr.full)}
          </BaseComponents.MapRedirect>
          <View style={{ flex: 1 }}>
            <Hyperlink linkDefault={true} linkStyle={{ height: '100%', color: '#2980b9' }}>
              <Styles.Body>{jobDescription}</Styles.Body>
            </Hyperlink>
          </View>
        </Collapsible>

        <Styles.Buttons>
          {this.state.isOpen ? this.renderInterestButton() : <></>}
          <Styles.ExpandButton submitted={this.state.submitted} onPress={this.toggleDropdown}>
            <Styles.ExpandButtonText submitted={this.state.submitted}>
              {this.state.isOpen ? 'Close' : 'Read More'}
            </Styles.ExpandButtonText>
          </Styles.ExpandButton>
        </Styles.Buttons>
      </BaseComponents.Container>
    );
  }
}
