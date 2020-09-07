import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { GlobalContext } from '../ContextProvider';
import { Feather } from '@expo/vector-icons';
import {
  ModalButtonBackground,
  ContactSectionContainer,
  ContactModalView,
  CloseButton,
  ModalBackground,
  ContactSectionTitle,
} from './styles';
import { ContactCard } from './ContactCard/ContactCard';
import { Status } from '@screens/StatusScreen/StatusScreen';
import { StatusController } from '@screens/StatusScreen/StatusController';

interface ContactsModalState {
  modalVisible: boolean;
}

interface ContactsModalProps {
  resetTesting?: () => void;
}

export default class ContactsModal extends Component<ContactsModalProps, ContactsModalState> {
  static contextType = GlobalContext;

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    const { resetTesting } = this.props;
    if (resetTesting) {
      resetTesting();
    }
  }

  toggleState() {
    return () => {
      this.setModalVisible(!this.state.modalVisible);
    };
  }

  createContactSections(contactGroups) {
    const sections = [];
    let index = 0;
    for (const role in contactGroups) {
      sections.push(this.createContactSection(role, contactGroups[role], index));
      index += 1;
    }
    return <ContactSectionContainer>{sections}</ContactSectionContainer>;
  }

  createContactSection(role, contactGroup, index) {
    return (
      <View key={index}>
        <ContactSectionTitle key={index}>{role}</ContactSectionTitle>
        {contactGroup.map((poc, index) => (
          <ContactCard
            key={index}
            name={poc.name}
            phone={poc.phone}
            role={poc.role}
            imageRef={poc.image}
            user={this.context.user}
          />
        ))}
      </View>
    );
  }

  render() {
    if (typeof this.context.pocs === 'undefined') {
      return null;
    }
    return (
      <View>
        <ModalButtonBackground>
          <TouchableOpacity onPress={this.toggleState()}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </ModalButtonBackground>

        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <ModalBackground>
            <ContactModalView>
              <CloseButton onPress={this.toggleState()}>
                <Feather name="x" color="black" size={30} />
              </CloseButton>
              <StatusController defaultChild={this.createContactSections(this.context.pocs)} status={Status.none} />
            </ContactModalView>
          </ModalBackground>
        </Modal>
      </View>
    );
  }
}
