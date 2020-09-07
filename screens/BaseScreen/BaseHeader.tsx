import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import * as Styles from './styles';
import { Colors } from '../../assets/Colors';
import { Feather } from '@expo/vector-icons';

interface BaseHeaderProps {
  title: string;
  backgroundColor?: Animated.AnimatedInterpolation | string;
  height?: Animated.AnimatedInterpolation;
  shadowOpacity?: Animated.AnimatedInterpolation;
  fontSize?: Animated.AnimatedInterpolation;
  backButton?: () => void;
  rightButton?: React.Component;
  static?: string; // 'collapsed' or 'expanded'
}

export const headerConstants = {
  headerExpandedHeight: 140,
  headerCollapsedHeight: 110,
  titleMaxFont: 36,
  titleMinFont: 28,
};

export class BaseHeader extends React.Component<BaseHeaderProps> {
  render() {
    let height = this.props.height;
    let fontSize = this.props.fontSize;
    let backgroundColor = this.props.backgroundColor;
    let shadowOpacity = this.props.shadowOpacity;

    if (this.props.static == 'collapsed') {
      height = new Animated.Value(headerConstants.headerCollapsedHeight);
      fontSize = new Animated.Value(headerConstants.titleMinFont);
      backgroundColor = 'white';
      shadowOpacity = new Animated.Value(0.1);
    } else if (this.props.static == 'expanded') {
      height = new Animated.Value(headerConstants.headerExpandedHeight);
      fontSize = new Animated.Value(headerConstants.titleMaxFont);
      backgroundColor = Colors.backgroundGray;
      shadowOpacity = new Animated.Value(0);
    }

    return (
      <Styles.AnimContainer>
        <Animated.View
          style={{
            backgroundColor: backgroundColor,
            height: height,
            shadowOpacity: shadowOpacity,
            shadowRadius: 40,
          }}
        >
          <Styles.Container>
            <Styles.HeaderContainer>
              <Styles.TitleContainer>
                {this.props.backButton ? (
                  <TouchableOpacity onPress={this.props.backButton}>
                    <Feather name="chevron-left" color="black" size={35} />
                  </TouchableOpacity>
                ) : null}

                <Animated.Text numberOfLines = {1} ellipsizeMode = 'tail' style={{ width: 250, fontSize: fontSize, fontFamily: 'source-sans-pro-semibold', paddingLeft: 20 }}>
                  {this.props.title}
                </Animated.Text>
              </Styles.TitleContainer>
              <Styles.RightButtonContainer>{this.props.rightButton}</Styles.RightButtonContainer>
            </Styles.HeaderContainer>
          </Styles.Container>
        </Animated.View>
      </Styles.AnimContainer>
    );
  }
}
