import styled from 'styled-components/native';
import { Colors } from '@assets/Colors';
import * as BaseComponents from '@components/BaseComponents';

export const Flex = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 8px 0px 0px;
  justify-content: space-between;
`;

export const EventInfoText = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 0px;
`;

export const BoldInfo = styled(BaseComponents.TextBold)`
  font-size: 12px;
  margin-left: 10px;
  color: ${Colors.fontGray};
`;

export const IconStyle = styled.View`
  margin-left: ${props => (props.check == 'Open House' ? '3.5' : '0')};
`;
