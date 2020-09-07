import styled from 'styled-components/native';
import * as BaseComponents from '@components/BaseComponents';
import { Colors } from '@assets/Colors';

export const Header = styled(BaseComponents.Subject)`
  font-size: 20px;
  margin-top: 5%;
`;

export const BodyText = styled(BaseComponents.TextBody)`
  text-align: center;
  max-width: 80%;
  margin-top: 5%;
`;

export const Button = styled(BaseComponents.Button)`
  background-color: white;
  border: 1.5px ${Colors.brandGray} solid;
  margin-top: 10;
`;

export const Row = styled(BaseComponents.Row)`
  height: 550px;
`;
