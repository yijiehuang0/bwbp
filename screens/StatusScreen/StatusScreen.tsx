import React from 'react';
import * as BaseComponents from '@components/BaseComponents';

import { Button, Header, BodyText, Row } from './styles';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@assets/Colors';

export enum Status {
  jobLocked = 'joblocked',
  noConnection = 'noconnection',
  noContent = 'nocontent',
  login = 'login',
  none = 'none',
}

type StatusScreenProps = {
  name: Status;
  action?: () => void;
};

type StatusType = {
  icon: string;
  subjectText: string;
  bodyText: string;
  buttonText: string;
  showButton: boolean;
  showSubject: boolean;
};

function getStatusType(name: Status): StatusType {
  const types = {
    [Status.jobLocked]: {
      icon: 'lock',
      subjectText: '',
      bodyText: 'You will have access to job postings once you have completed the training program.',
      buttonText: '',
      showButton: false,
      showSubject: false,
    },
    [Status.noConnection]: {
      icon: 'wifi-off',
      subjectText: 'No Connection',
      bodyText: 'Please check your connection and try again.',
      buttonText: 'Try again',
      showButton: true,
      showSubject: true,
    },
    [Status.noContent]: {
      icon: 'slash',
      subjectText: '',
      bodyText: 'There is nothing new to display. Check back later for updates.',
      buttonText: '',
      showButton: false,
      showSubject: false,
    },
    [Status.login]: {
      icon: 'user',
      subjectText: '',
      bodyText: 'Please login to view other content',
      buttonText: 'Login',
      showButton: true,
      showSubject: false,
    },
    [Status.none]: {
      icon: '',
      subjectText: '',
      bodyText: '',
      buttonText: '',
      showButton: false,
      showSubject: false,
    },
  };
  return types[name];
}

export function StatusScreen(props: StatusScreenProps): React.ReactElement {
  const status = getStatusType(props.name);
  const { icon, subjectText, bodyText, buttonText, showButton, showSubject } = status;

  const subject = <Header>{subjectText}</Header>;
  const button = (
    <Button onPress={props.action}>
      <BaseComponents.ButtonText>{buttonText}</BaseComponents.ButtonText>
    </Button>
  );

  return (
    <Row>
      <BaseComponents.Column>
        <Feather name={icon} color={Colors.iconGray} size={60} />
        {showSubject ? subject : null}
        <BodyText>{bodyText}</BodyText>
        {showButton ? button : null}
      </BaseComponents.Column>
    </Row>
  );
}
