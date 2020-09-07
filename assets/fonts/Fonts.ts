import styled from 'styled-components/native';
import { createIconSet } from '@expo/vector-icons';

const glyphMap = {
  jobs: 59650,
  messages: 59651,
  classes: 59648,
  resources: 59649,
  message: 59660,
  coffee: 59657,
  grad: 59658,
  sun: 59653,
  time: 59654,
  check: 59656,
  sad: 59652,
  calendar: 59655,
  location: 59659,
};

export const Icon = createIconSet(glyphMap, '1951-Icons', '@assets/fonts/1951.otf');

export const Fonts = {
  'source-sans-pro-black': require('./SourceSansPro-Black.otf'),
  'source-sans-pro-blackit': require('./SourceSansPro-BlackIt.otf'),
  'source-sans-pro-bold': require('./SourceSansPro-Bold.otf'),
  'source-sans-pro-boldit': require('./SourceSansPro-BoldIt.otf'),
  'source-sans-pro-extralight': require('./SourceSansPro-ExtraLight.otf'),
  'source-sans-pro-extralightit': require('./SourceSansPro-ExtraLightIt.otf'),
  'source-sans-pro-it': require('./SourceSansPro-It.otf'),
  'source-sans-pro-light': require('./SourceSansPro-Light.otf'),
  'source-sans-pro-lightit': require('./SourceSansPro-LightIt.otf'),
  'source-sans-pro-regular': require('./SourceSansPro-Regular.otf'),
  'source-sans-pro-semibold': require('./SourceSansPro-Semibold.otf'),
  'source-sans-pro-semiboldit': require('./SourceSansPro-SemiboldIt.otf'),
  '1951-Icons': require('@assets/fonts/1951.otf'),
};

export const TextBold = styled.Text`
  font-family: source-sans-pro-semibold;
`;

export const TextRegular = styled.Text`
  font-family: source-sans-pro-regular;
`;
