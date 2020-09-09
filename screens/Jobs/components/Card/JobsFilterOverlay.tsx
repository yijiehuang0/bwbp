import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Button, Overlay, CheckBox } from 'react-native-elements';
import { OverlayTitle } from './styles';

export interface Availability {
  [day: string]: boolean;
}

type OverlayProps = {
  callback: Function;
};
type OverlayState = {
  visible: boolean;
  availability: Availability;
};

// TODO: Design decison, to have an overlay that is rendered conditionally, or to render conditonally itself
// TODO: FLEXBOX THE FUCK OUT OF THE CHECKBOX
export class JobsFilterOverlay extends React.Component<OverlayProps, OverlayState, Availability> {
  constructor(props: OverlayProps) {
    super(props);
    this.state = {
      visible: false,
      availability: { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false },
    };
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.clearAvailablity = this.clearAvailablity.bind(this);
  }

  toggleOverlay(): void {
    const { visible } = this.state;
    this.setState(prev => {
      return { ...prev, visible: !visible };
    });
  }

  clearAvailablity(): void {
    this.setState(prev => {
      return {
        ...prev,
        availability: { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false },
      };
    });
  }
  componentWillUnmount(): void {
    console.log('unmounted now');
  }
  componentDidMount(): void {}

  render() {
    return (
      <Fragment>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Button title="Filter Search" containerStyle={{ width: '50%' }} onPress={this.toggleOverlay} />
        </View>
        <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
          <Fragment>
            <OverlayTitle> Which days work best for you?</OverlayTitle>
            <CheckBox
              title="Monday"
              checked={this.state.availability.monday}
              onPress={() => {
                this.setState(prev => {
                  return { ...prev, availability: { ...prev.availability, monday: !prev.availability.monday } };
                });
              }}
            />
            <CheckBox
              title="Tuesday"
              checked={this.state.availability.tuesday}
              onPress={() => {
                this.setState(prev => {
                  return { ...prev, availability: { ...prev.availability, tuesday: !prev.availability.tuesday } };
                });
              }}
            />
            <CheckBox
              title="Wednesday"
              checked={this.state.availability.wednesday}
              onPress={() => {
                this.setState(prev => {
                  return { ...prev, availability: { ...prev.availability, wednesday: !prev.availability.wednesday } };
                });
              }}
            />
            <CheckBox
              title="Thursday"
              checked={this.state.availability.thursday}
              onPress={() => {
                this.setState(prev => {
                  return { ...prev, availability: { ...prev.availability, thursday: !prev.availability.thursday } };
                });
              }}
            />
            <CheckBox
              title="Friday"
              checked={this.state.availability.friday}
              onPress={() => {
                this.setState(prev => {
                  return { ...prev, availability: { ...prev.availability, friday: !prev.availability.friday } };
                });
              }}
            />
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Button
                title="Filter Search"
                containerStyle={{ width: '50%' }}
                onPress={(): void => {
                  this.props.callback(this.state.availability);
                  this.toggleOverlay();
                  this.clearAvailablity();
                }}
              />
            </View>
          </Fragment>
        </Overlay>
      </Fragment>
    );
  }
}
export default JobsFilterOverlay;
