import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Accueil from '../screens/Accueil';
import Recos from '../screens/Recos';
import Reseau from '../screens/Reseau';
import Notifications from '../screens/Notifications';
import Profil from '../screens/Profil';
import RecommendationDetail from '../screens/RecommendationDetail';
import ListingBiens from '../screens/ListingBiens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = '#1A237E';
const INACTIVE_COLOR = '#7A7F87';

// Custom Tab Icons
function HomeIcon({ focused }) {
  return (
    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        position: 'absolute', top: 7, left: 6, width: 20, height: 0,
        borderTopWidth: 2.5, borderLeftWidth: 2.5, borderRightWidth: 2.5,
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
        borderRadius: 2, transform: [{ rotate: '-8deg' }],
      }} />
      <View style={{
        position: 'absolute', top: 14, left: 10, width: 12, height: 10,
        borderWidth: 2.5, borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
        borderRadius: 2, backgroundColor: 'transparent',
      }} />
    </View>
  );
}

function RecosIcon({ focused }) {
  return (
    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        position: 'absolute', top: 7, left: 8, width: 16, height: 18,
        borderWidth: 2, borderRadius: 3, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', left: 11, top: 12, width: 10, height: 2,
        borderRadius: 1, backgroundColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', left: 11, top: 16, width: 10, height: 2,
        borderRadius: 1, backgroundColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
    </View>
  );
}

function ReseauIcon({ focused }) {
  return (
    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        position: 'absolute', top: 8, left: 6, width: 8, height: 8,
        borderRadius: 4, borderWidth: 2, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', top: 16, left: 2, width: 16, height: 8,
        borderRadius: 4, borderWidth: 2, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', top: 8, left: 22, width: 8, height: 8,
        borderRadius: 4, borderWidth: 2, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', top: 16, left: 18, width: 16, height: 8,
        borderRadius: 4, borderWidth: 2, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
    </View>
  );
}

function NotificationsIcon({ focused }) {
  return (
    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        position: 'absolute', top: 8, left: 8, width: 16, height: 14,
        borderWidth: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8,
        borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
        backgroundColor: 'transparent', borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', top: 22, left: 14, width: 4, height: 4,
        borderRadius: 2, backgroundColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
    </View>
  );
}

function ProfilIcon({ focused }) {
  return (
    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        position: 'absolute', top: 8, left: 12, width: 8, height: 8,
        borderRadius: 4, borderWidth: 2, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
      <View style={{
        position: 'absolute', top: 16, left: 8, width: 16, height: 10,
        borderRadius: 5, borderWidth: 2, backgroundColor: 'transparent',
        borderColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
      }} />
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 84,
          backgroundColor: '#F8F9FA',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOpacity: 0.10,
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 16,
          elevation: 16,
          paddingBottom: 18,
          paddingTop: 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
      }}
    >
      <Tab.Screen 
        name="Accueil" 
        component={Accueil}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Recos" 
        component={Recos}
        options={{
          tabBarIcon: ({ focused }) => <RecosIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Réseau" 
        component={Reseau}
        options={{
          tabBarIcon: ({ focused }) => <ReseauIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => <NotificationsIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Profil" 
        component={Profil}
        options={{
          tabBarIcon: ({ focused }) => <ProfilIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="RecommendationDetail" component={RecommendationDetail} />
        <Stack.Screen name="ListingBiens" component={ListingBiens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
