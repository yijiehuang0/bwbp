import styled from 'styled-components/native';
import { Colors } from '../../assets/Colors';

export const Background = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

export const AnimContainer = styled.View`
  top: 0;
  left: 0;
  width: 100%;
`;

export const Container = styled.View`
  bottom: 0;
  width: 100%;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10;
  height: 100%;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 70%;
`;

export const RightButtonContainer = styled.View`
  padding-right: 20;
  right: 0;
`;
