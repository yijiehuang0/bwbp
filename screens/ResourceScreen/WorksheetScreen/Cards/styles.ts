import styled from 'styled-components/native';
import * as BaseComponents from '@components/BaseComponents';
import { Colors } from '@assets/Colors';

export const WorksheetCardContainer = styled.View`
  border-color: ${Colors.fontGray};
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  align-items: center;
  height: 80px;
  width: 90%;
  border-radius: 5px;
  padding: 30px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const WorksheetTextContainer = styled.View`
  border-color: ${Colors.fontGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 90%;
`;

export const WorksheetHeader = styled(BaseComponents.TextBold)`
  font-size: 18px;
  color: ${Colors.fontGray};
  text-align: left;
  width: 100%;
  padding: 0;
  margin: 0;
`;
