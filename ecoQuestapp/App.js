import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import VideoScreen from './screens/VideoScreen';
import QuizScreen from './screens/QuizScreen';
import ScoreScreen from './screens/ScoreScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#161B22',
          borderTopColor: '#21262D',
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#8B949E',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: '🏠',
            Learn: '📖',
            Quiz: '❓',
            Settings: '⚙️',
          };
          return (
            <Animated.Text style={{ fontSize: size - 4 }}>
              {icons[route.name]}
            </Animated.Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Video" component={VideoScreen} />
          <Stack.Screen name="Scores" component={ScoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
