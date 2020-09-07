import styled from 'styled-components/native';
import { Colors } from '@assets/Colors';
import * as Fonts from '@assets/fonts/Fonts';

interface ContainerProps {
  borderLeft?: boolean;
  borderTop?: boolean;
  cardColor: string;
}

/* Refreshing */
export const LoadingView = styled.View`
  flex: 1;
  flex-basis: 100%;
  justify-content: center;
  align-self: center;
  position: relative;
  height: 100%;
`;

export const RefreshScrollView = styled.ScrollView`
  height: 90%;
`;

/* Base Card */
export const Container = styled.View<ContainerProps>`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  border-color: ${props => props.cardColor};
  elevation: 3;
  ${props => (props.borderLeft ? 'border-left-width: 7.5px;' : '')}
  ${props => (props.borderTop ? 'border-top-width: 7.5px;' : '')}
`;

export const Text = styled.Text.attrs({
  selectable: true,
})``;

export const TextBody = styled(Text)`
  font-size: 13.5px;
`;

export const TextBold = styled(Text)`
  font-family: source-sans-pro-semibold;
`;

export const OverflowText = styled(Text)`
  width: 215px;
`;

export const Subject = styled(Text)`
  font-size: 18px;
  font-family: source-sans-pro-semibold;
  flex-grow: 3;
`;

export const SubjectOverflow = styled(OverflowText)`
  font-size: 18px;
  font-family: source-sans-pro-semibold;
  flex-grow: 3;
`;

export const SubTitle = styled(Text)`
  font-size: 12px;
  color: ${Colors.fontGray};
`;

export const Date = styled(Fonts.TextRegular)`
  font-size: 11px;
  margin-bottom: 10px;
  color: ${Colors.brandGray};
`;

export const Line = styled.View`
  display: flex;
  border-top-color: ${Colors.iconGray};
  border-top-width: 1;
  margin: 8px 0px;
`;

/* Base Buttons */
export const Button = styled.TouchableOpacity`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: source-sans-pro-semibold;
  padding: 2.5%;
`;

/* List */
export const ListContainer = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ListItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
`;

export const ListItemText = styled(TextBody)<{ check: string }>`
  margin-left: 15px;
  text-decoration: ${props => (props.check == 'location' ? 'underline' : 'none')};
`;

export const LinkText = styled(TextBody)`
  text-decoration: underline;
`;

// Centering Containers
export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Column = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FullColumn = styled(Column)`
  height: 85%;
`;

export const MapRedirect = styled.TouchableOpacity``;
