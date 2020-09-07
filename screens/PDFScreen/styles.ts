import styled from 'styled-components/native';

export const TextBold = styled.Text`
  font-family: source-sans-pro-semibold;
  margin: 0%;
`;

export const TitleContainer = styled.View`
  margin: 0% 5% 5% 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(TextBold)`
  font-size: 30px;
`;

export const Container = styled.View`
  display: flex;
  margin-top: 2.5%;
`;
