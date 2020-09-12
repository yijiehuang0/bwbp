import styled from 'styled-components/native';
import { Colors } from '@assets/Colors';
import * as BaseComponents from '@components/BaseComponents';
import {CheckBox} from 'react-native-elements';

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.View`
  display: flex;
  flex-direction: column;
`;

// Move eventcolumn to basecomponents
export const EventColumn = styled(Column)`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Info = styled.Text`
  font-size: 12px;
  color: ${Colors.fontGray};
  width: 90;
`;

export const OverlayTitle= styled.Text`
  font-size: 30;
  color: ${Colors.fontGray};
  textAlign: center;
  fontWeight: bold;
  paddingTop: 15;
  paddingBottom: 15;
`;

export const OverlaySubtitle = styled.Text`
  font-size: 15;
  color: ${Colors.brandOlive};
  textAlign: left;
  fontWeight: bold;
  paddingLeft: 10;
`;

export const HoursInput = styled.TextInput`
  border-color: ${Colors.brandGray};
  border-radius: 5;
  border-width: 2;
  padding-horizontal: 5%;
  alignSelf: center;
  font-size: 15;
  width: 93%;
  height: 5%;
`;

export const Status = styled.Text`
  font-size: 12px;
  color: ${Colors.fontGray};
  margin-right: 5px;
`;

export const StatusWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
`;

export const BoldInfo = styled(BaseComponents.TextBold)`
  font-size: 12px;
  flex-grow: 1;
  color: ${Colors.fontGray};
`;

export const Body = styled(BaseComponents.TextBody)`
  margin-top: 12px;
`;

export const Expanded = styled.View<{ visible: boolean }>`
  display: ${props => (props.visible ? 'flex' : 'none')};
`;

/* Buttons */
export const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  padding: 4px;
  align-self: center;
`;

// BUG with flex changing heights
export const InterestButton = styled(BaseComponents.Button)`
  flex: 1;
  border: 1px ${Colors.darkOlive} solid;
  margin-right: 5%;
`;

export const ExpandButton = styled(BaseComponents.Button)<{ submitted: boolean }>`
  flex: 1;
  border: 1px ${props => (props.submitted ? Colors.brandGray : Colors.darkOlive)} solid;
  background-color: ${props => (props.submitted ? 'white' : Colors.darkOlive)};
`;

export const ExpandButtonText = styled(BaseComponents.ButtonText)<{ submitted: boolean }>`
  color: ${props => (props.submitted ? 'black' : 'white')};
  padding: 5px;
`;

export const InterestButtonText = styled(BaseComponents.ButtonText)`
  color: ${Colors.darkOlive};
`;

export const IconStyle = styled.View`
  margin-left: ${props => (props.check == 'location' ? '3.5' : props.check == 'calendar' ? '2' : '0')};
`;
