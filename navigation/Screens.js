import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

// screens
import Services from "../screens/Services";
import Entries from "../screens/Entries";
import Profile from "../screens/Profile";


const EntriesStack = createStackNavigator();

function EntriesStackScreen() {
  return (
    <EntriesStack.Navigator>
      <EntriesStack.Screen name="Entries" component={Entries} options={{ title: 'Entradas' }}/>
    </EntriesStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator 
      initialRouteName="Entries"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Services') {
            iconName = 'format-list-checks';
          } else if (route.name === 'Entries') {
            iconName = 'car';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          }

          return <Icon 
            name={iconName}
            type="material-community"
            size={size} 
            color={color} 
          />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#b98700',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Services" component={Services} options={{ title: 'Servicios' }}/>
      <Tab.Screen name="Entries" component={EntriesStackScreen} options={{ title: 'Entradas' }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }}/>
    </Tab.Navigator>
  )
}