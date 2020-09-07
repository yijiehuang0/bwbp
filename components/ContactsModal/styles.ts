import styled from 'styled-components/native';

export const ContactSectionTitle = styled.Text`
  font-family: source-sans-pro-semibold;
  font-size: 15px;
  margin: 15px 0px;
`;

export const ContactSectionContainer = styled.ScrollView`
  margin: 5%;
`;

export const ContactModalView = styled.View`
  position: relative;
  background-color: white;
  border-radius: 10px;
  width: 80%;
  height: 80%;
`;

export const ModalButtonBackground = styled.View`
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 15px;
  padding: 11px;
`;

export const CloseButton = styled.TouchableOpacity`
  margin: 15px;
  align-self: flex-end;
`;

export const ModalBackground = styled.View`
  background-color: #202020;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
