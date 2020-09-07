import { Linking } from 'expo';
import * as SMS from 'expo-sms';

export const mapRedirect = (query: string): Function => {
  const url = `http://maps.google.com/?daddr=${query}`;
  return (): Function => Linking.openURL(url);
};

export const getAddress = (
  str: string,
  c: string,
  s: string,
  z: string,
): { cityState: string; csZipcode: string; full: string } => {
  const city: string = c ? `${c}, ` : '';
  const state: string = s ? `${s}` : '';
  const street: string = str ? `${str}, ` : '';
  const zipcode: string = z ? ` ${z}` : '';

  const cityState: string = city + state;
  const csZipcode: string = cityState + zipcode;
  let fullAddress: string = street + cityState + zipcode;
  fullAddress = fullAddress || '--';

  const address: { cityState: string; csZipcode: string; full: string } = {
    cityState: cityState,
    csZipcode: csZipcode,
    full: fullAddress,
  };
  return address;
};

export const sendSMS = async (phone: string, body: string): Promise<void> => {
  try {
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      await SMS.sendSMSAsync([phone], body);
    }
  } catch (err) {
    alert('Texting is not available. Please turn it on in settings.');
  }
};
