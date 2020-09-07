import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@assets/fonts/Fonts';
import * as BaseComponents from '@components/BaseComponents';
import { Colors } from '@assets/Colors';

interface AnswerKeyProps {
  answerKey: () => void;
}

export default class AnswerKeyButton extends Component<AnswerKeyProps> {
  constructor(props: AnswerKeyProps) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.answerKey}>
          <BaseComponents.Row>
            <Icon name="check" color={Colors.brandRed} size={15} />
            <BaseComponents.ButtonText
              style={{
                color: Colors.brandRed,
                textDecorationLine: 'underline',
                paddingRight: 10,
              }}
            >
              Answers
            </BaseComponents.ButtonText>
          </BaseComponents.Row>
        </TouchableOpacity>
      </View>
    );
  }
}
