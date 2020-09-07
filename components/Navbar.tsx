import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '@assets/Colors';
import { Icon } from '@assets/fonts/Fonts';
import LoginScreen from '@screens/Login/Login';
import LoadingScreen from '@screens/Loading/Loading';
import { MessagesScreen } from '@screens/Messages/Messages';
import { JobsScreen } from '@screens/Jobs/Jobs';
import { ClassesScreen } from '@screens/Classes/Classes';
import { ResourceScreen } from '@screens/ResourceScreen/ResourceScreen';
import { BrewGuideScreen } from '@screens/BrewGuide/BrewGuide';
import { WorksheetScreen } from '@screens/ResourceScreen/WorksheetScreen/WorksheetScreen';
import { TutorialsScreen } from '@screens/ResourceScreen/TutorialsScreen/TutorialsScreen';
import { InterviewGuideScreen } from '@screens/ResourceScreen/InterviewGuide/InterviewGuide';
import { PDFScreen } from '@screens/PDFScreen/PDFScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ResourcesStack(): React.ReactElement {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Resources" component={ResourceScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="BrewGuide" component={BrewGuideScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Worksheets" component={WorksheetScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Tutorials" component={TutorialsScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="InterviewGuide" component={InterviewGuideScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="PDFScreen" component={PDFScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

function tabIconOption(iconName: string): unknown {
  return {
    tabBarIcon: ({ color }) => <Icon name={iconName} color={color} size={25} />,
  };
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      tabBarOptions={{
        activeTintColor: Colors.navbarBlue,
        inactiveTintColor: Colors.brandGray,
        showLabel: false,
      }}
    >
      <Tab.Screen name="Messages" component={MessagesScreen} options={tabIconOption('messages')} />
      <Tab.Screen name="Jobs" component={JobsScreen} options={tabIconOption('jobs')} />
      <Tab.Screen name="Classes" component={ClassesScreen} options={tabIconOption('classes')} />
      <Tab.Screen name="Resources" component={ResourcesStack} options={tabIconOption('resources')} />
    </Tab.Navigator>
  );
}

export function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" headerMode="none">
        <Stack.Screen name="App" component={MainTabs} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
