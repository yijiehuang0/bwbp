import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { BaseHeader } from '../BaseScreen/BaseHeader';
import { LoadingView } from '@components/BaseComponents';
import AnswerKey from '../ResourceScreen/WorksheetScreen/AnswerKeyButton';

interface PDFScreenProps {
  title: string;
  uri: string;
  backButton: () => void;
  answerKey: string;
}

export class PDFScreen extends React.Component<PDFScreenProps> {
  constructor(props: PDFScreenProps) {
    super(props);
  }

  renderRefresh = (): React.ReactElement => (
    <LoadingView>
      <ActivityIndicator size="large" />
    </LoadingView>
  );

  showAnswerKey = (title: string, answerKey: string) => {
    return () => this.props.navigation.push('PDFScreen', { title: title, uri: answerKey });
  };

  render() {
    let backButton, title, uri, answerKey;
    if (this.props.backButton) {
      backButton = this.props.backButton;
    } else if (this.props.navigation.goBack) {
      backButton = this.props.navigation.goBack;
    }

    if (this.props.title) {
      title = this.props.title;
    } else if (this.props.route && this.props.route.params.title) {
      title = this.props.route.params.title;
    }

    if (this.props.uri) {
      uri = this.props.uri;
    } else if (this.props.route && this.props.route.params.uri) {
      uri = this.props.route.params.uri;
    }

    uri = Platform.select({
      ios: uri,
      android: `https://drive.google.com/viewerng/viewer?embedded=true&url=${uri}`,
    });

    if (this.props.answerKey) {
      answerKey = this.props.answerKey;
    } else if (this.props.route && this.props.route.params.answerKey) {
      answerKey = this.props.route.params.answerKey;
    }

    return (
      <>
        <BaseHeader
          title={title}
          static="collapsed"
          backButton={backButton}
          rightButton={answerKey ? <AnswerKey answerKey={this.showAnswerKey(title, answerKey)} /> : <></>}
        />
        <WebView
          source={{ uri }}
          startInLoadingState={true}
          renderLoading={this.renderRefresh}
          originWhitelist={['*']}
        />
      </>
    );
  }
}
