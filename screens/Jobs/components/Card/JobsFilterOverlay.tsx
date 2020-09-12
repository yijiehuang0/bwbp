import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Button, Overlay, CheckBox } from 'react-native-elements';
import { OverlayTitle, HoursInput, OverlaySubtitle } from './styles';
import stylesheet from './stylesheet';

export interface Availability {
  hourswk: number;
  [day: string]: any;
}

type OverlayProps = {
  toggleFilter: Function;
  visible: boolean;
  displayJobs: Function;
};

type OverlayState = {
  availability: Availability;
};

export class JobsFilterOverlay extends React.Component<OverlayProps, OverlayState, Availability> {
  constructor(props: OverlayProps) {
    super(props);
    this.state = {
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        hourswk: 0,
      },
    };
    this.clearAvailablity = this.clearAvailablity.bind(this);
    this.updateHoursPerWeek = this.updateHoursPerWeek.bind(this);
  }

  clearAvailablity(): void {
    this.setState(state => {
      return {
        ...state,
        availability: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          hourswk: 0,
        },
      };
    });
  }

  validInputs() : boolean {
      return this.state.availability.hourswk > 0;
  }

  updateHoursPerWeek(text: string): void {
      try {
          const hourswk: number = +text;
          this.setState(state => {return {...state, availability:{...state.availability, hourswk: hourswk}}})
      } catch(e) {
          this.setState(state => {return {...state, availability:{...state.availability, hourswk: 0}}})
      }
  }

  render() {
    return (
      <Overlay
        isVisible={this.props.visible}
        onBackdropPress={() => {
          this.props.toggleFilter();
          this.clearAvailablity();
        }}
        overlayStyle={stylesheet.overlay}
      >
        <Fragment>
          <OverlayTitle> Please Enter Your Availability </OverlayTitle>
          <OverlaySubtitle> Day of the Week</OverlaySubtitle>
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
                return { availability: { ...prev.availability, tuesday: !prev.availability.tuesday } };
              });
            }}
          />
          <CheckBox
            title="Wednesday"
            checked={this.state.availability.wednesday}
            onPress={() => {
              this.setState(prev => {
                return { availability: { ...prev.availability, wednesday: !prev.availability.wednesday } };
              });
            }}
          />
          <CheckBox
            title="Thursday"
            checked={this.state.availability.thursday}
            onPress={() => {
              this.setState(prev => {
                return { availability: { ...prev.availability, thursday: !prev.availability.thursday } };
              });
            }}
          />
          <CheckBox
            title="Friday"
            checked={this.state.availability.friday}
            onPress={() => {
              this.setState(prev => {
                return { availability: { ...prev.availability, friday: !prev.availability.friday } };
              });
            }}
          />
          <OverlaySubtitle> Hours Per Week </OverlaySubtitle>
            <HoursInput onChangeText={(text) => {this.updateHoursPerWeek(text)}} />
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Button
              title="Filter Search"
              containerStyle={{ width: '50%' }}
              onPress={(): void => {
                if(this.validInputs()) {
                    this.props.toggleFilter();
                    this.props.displayJobs(this.state.availability);
                    this.clearAvailablity();
                } else {
                    alert("Please enter a valid number of hours");
                }
              }}
            />
          </View>
        </Fragment>
      </Overlay>
    );
  }
}
export default JobsFilterOverlay;
