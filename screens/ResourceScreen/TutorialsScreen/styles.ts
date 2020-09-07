import styled from 'styled-components/native';
import * as BaseComponents from '@components/BaseComponents';
import { Colors } from '@assets/Colors';

export const VideoCardContainer = styled.TouchableOpacity`
  border-color: ${Colors.fontGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  align-items: center;
  height: 140px;
  width: 90%;
  border-radius: 5px;
  margin: 20px auto 0px;
`;

export const VideoContainer = styled.View`
  border-color: ${Colors.fontGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 110px;
`;

export const horizontalFlex = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const TextContainer = styled.View`
  border-color: ${Colors.fontGray};
  display: flex;
  flex-direction: column;
  width: 200;
  height: 80;
  padding-left: 10;
`;

export const VideoHeader = styled(BaseComponents.TextBold)`
  font-size: 18px;
  color: ${Colors.fontGray};
  text-align: left;
  width: 80%;
  padding: 0;
  margin: 0;
`;

export const VideoText = styled(BaseComponents.TextBody)`
  margin-top: 5px;
  margin-left: 0;
  width: 100%;
  text-align: left;
`;
