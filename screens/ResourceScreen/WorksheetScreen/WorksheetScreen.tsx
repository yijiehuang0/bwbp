import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native';
import * as Styles from '../../BaseScreen/styles';
import { BaseHeader } from '../../BaseScreen/BaseHeader';
import { PDFRecord } from '@utils/airtable/interface';
import { getWorksheets } from '@utils/airtable/requests';
import { WorksheetCard } from './Cards/WorksheetCard';

interface WorksheetScreenState {
  title: string;
  worksheets: PDFRecord[];
}

interface WorksheetsScreenProps {
  navigation: StackNavigationProp;
}
export class WorksheetScreen extends React.Component<{}, WorksheetScreenState> {
  constructor(props: WorksheetsScreenProps) {
    super(props);

    this.state = {
      title: 'Worksheets',
      worksheets: [],
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', this.fetchRecords);
  }

  fetchRecords = async () => {
    const worksheets: PDFRecord[] = await getWorksheets();
    this.setState({ worksheets });
  };

  showWorksheet = (worksheet: PDFRecord) => {
    return () =>
      this.props.navigation.push('PDFScreen', {
        title: worksheet.name,
        uri: worksheet.url,
        answerKey: worksheet.answerKey,
      });
  };

  render() {
    return (
      <Styles.Background>
        <BaseHeader title={this.state.title} static="collapsed" backButton={this.props.navigation.goBack} />
        <ScrollView>
          {this.state.worksheets.map((worksheet, key) => (
            <TouchableOpacity onPress={this.showWorksheet(worksheet)} key={key}>
              {WorksheetCard(worksheet.name, worksheet.url)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Styles.Background>
    );
  }
}
