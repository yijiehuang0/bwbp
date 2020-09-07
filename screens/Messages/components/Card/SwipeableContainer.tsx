import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@assets/Colors';

interface SwipeProps {
  index: number;
  leftAction: Function;
  rightAction: Function;
}
export default class SwipeableContainer extends React.Component<SwipeProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const leftContent = (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="check-circle" color={Colors.iconGray} size={60} />
          <Text>Mark as Read</Text>
        </View>
      </View>
    );

    const rightContent = (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="x-circle" color={Colors.iconGray} size={60} />
          <Text>Mark as Unread</Text>
        </View>
      </View>
    );

    return (
      <Swipeable
        leftContent={leftContent}
        rightContent={rightContent}
        onLeftActionRelease={() => {
          this.props.leftAction(this.props.index);
        }}
        onRightActionRelease={() => {
          this.props.rightAction(this.props.index);
        }}
      >
        {this.props.children}
      </Swipeable>
    );
  }
}
