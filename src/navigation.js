import React, {useRef, Fragment} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home/HomeScreen';
import {MyWeb} from './screens/web';
import {createStackNavigator} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {useRootStore} from './stores/root';
import LoginScreen from './screens/Login/LoginScreen';
import ChatScreen from './screens/Chat/ChatScreen';
import NotificationsScreen from './screens/Notifications/NotificationsScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import {CheckIcon, QuestionIcon, SearchIcon} from 'native-base';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Index"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Index" component={HomeScreen} />
  </Stack.Navigator>
);
const NotificationsStack = () => (
  <Stack.Navigator
    initialRouteName="Notifications"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);
const SettingsStack = () => (
  <Stack.Navigator
    initialRouteName="Settings"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const TabStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        title: 'Home',
        tabBarIcon: ({color, size}) => <CheckIcon color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="NotificationsTab"
      component={NotificationsStack}
      options={{
        title: 'Notifications',
        tabBarIcon: ({color, size}) => <SearchIcon color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="SettingsTab"
      component={SettingsStack}
      options={{
        title: 'Settings',
        tabBarIcon: ({color, size}) => (
          <QuestionIcon color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = observer(() => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const {authStore} = useRootStore();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // await Analytics.setCurrentScreen(currentRouteName);
          console.log(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {authStore.isLogin ? (
          <Fragment>
            <Stack.Screen name="Tab" component={TabStack} />
            <Stack.Screen name="Web" component={MyWeb} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
