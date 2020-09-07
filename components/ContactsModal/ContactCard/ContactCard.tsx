import React from 'react';
import { ContactCardButton } from './styles';
import { ListItem } from 'react-native-elements';
import { sendSMS } from '@utils/helper';
import { Platform } from 'react-native';
import { UserRecord } from '@utils/airtable/interface';
export interface ContactCardProps {
  name: string;
  phone: string;
  role: string;
  imageRef: string;
  user: UserRecord;
}

export class ContactCard extends React.Component<ContactCardProps> {
  onPress(name, phone, firstName, lastName, cohortName) {
    //logic to open up to text
    const msg = `Hi ${name}. This is ${firstName} ${lastName} from ${cohortName}.\n\n`;
    if (phone) {
      sendSMS(phone, msg);
    }
  }

  getSMSDivider(): string {
    return Platform.OS === 'ios' ? '&' : '?';
  }

  render() {
    const { name, role, imageRef, phone, user } = this.props;
    return (
      <ContactCardButton onPress={() => this.onPress(name, phone, user.firstName, user.lastName, user.cohortName)}>
        <ListItem
          containerStyle={containerStyle}
          title={name}
          leftAvatar={{ source: { uri: imageRef } }}
          subtitle={phone}
          bottomDivider
        />
      </ContactCardButton>
    );
  }
}

const containerStyle = {
  backgroundColor: '#EEEEEE',
  borderColor: 'white',
  borderRadius: 5,
};
