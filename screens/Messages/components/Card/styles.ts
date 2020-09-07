import styled from 'styled-components/native';
import { Colors } from '@assets/Colors';
import * as Fonts from '@assets/fonts/Fonts';
import * as BaseComponents from '@components/BaseComponents';

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Sender = styled(Fonts.TextBold)`
  font-size: 15px;i
`;

export const EventContainer = styled(Column)`
  margin: 5% 0%;
`;

export const EventCard = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${Colors.brandBlueTrans};
  justify-content: flex-start;
  border-radius: 5px;
  padding: 5%;
`;

export const EventInfo = styled(Row)`
  justify-content: flex-start;
`;

export const EventInfoText = styled(Column)`
  margin: 1.5% 5%;
`;

export const InfoHeader = styled(Fonts.TextBold)<{ check: string }>`
  font-size: 15px;
  text-decoration: ${props => (props.check == 'location' ? 'underline' : 'none')};
`;

export const InfoSubHeader = styled(Fonts.TextRegular)<{ check: string }>`
  font-size: 12px;
  text-decoration: ${props => (props.check == 'location' ? 'underline' : 'none')};
`;

export const Button = styled(BaseComponents.Button)<{
  cardColor: string;
}>`
  background-color: ${props => (props.cardColor === Colors.borderGray ? 'white' : props.cardColor)};
  border-color: ${props => (props.cardColor === Colors.borderGray ? Colors.borderGray : 'white')};
  border-width: 1.5px;
  margin-top: 15px;
`;

export const IconStyle = styled.View`
  margin-left: ${props => (props.check == 'location' ? '2' : '0')};
`;
