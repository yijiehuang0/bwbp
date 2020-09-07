import styled from 'styled-components/native';
import * as BaseComponents from '@components/BaseComponents';
import { Colors } from '@assets/Colors';

export const ResourceHeader = styled(BaseComponents.TextBold)`
  font-size: 12px;
  color: ${Colors.fontGray};
  top: 40;
`;

export const ResourceContainer = styled.View`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 164;
  width: 149;
  padding-left: 20;
  margin-top: 15;
`;

export const ResourceImage = styled.Image`
  flex: 1;
  flex-direction: row;
  top: 20;
  width: 104;
  margin-top: 20;
  align-items: center;
`;
