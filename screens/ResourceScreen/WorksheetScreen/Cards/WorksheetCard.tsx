import React from 'react';
import * as Styles from './styles';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@assets/Colors';

export function WorksheetCard(worksheetName: string, worksheetUrl: string) {
  return (
    <>
      <Styles.WorksheetCardContainer>
        <Styles.WorksheetTextContainer>
          <Styles.WorksheetHeader>{worksheetName}</Styles.WorksheetHeader>
        </Styles.WorksheetTextContainer>
        <Feather name={'arrow-right'} color={Colors.brandRed} size={20} style={{ marginLeft: 30 }} />
      </Styles.WorksheetCardContainer>
    </>
  );
}
