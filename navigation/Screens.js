import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

// SCREENS
import Services from "../screens/Services";
// Entry vehicle
import Entries from "../screens/EntryVehicles/Entries";
import SearchCustomer from "../screens/EntryVehicles/SearchCustomer";
import ChooseCustomer from "../screens/EntryVehicles/ChooseCustomer";
import EntryForm from "../screens/EntryVehicles/EntryForm";

import Profile from "../screens/Profile";


const EntriesStack = createStackNavigator();

function EntriesStackScreen() {
  return (
    <EntriesStack.Navigator
      initialRouteName="Entries"
    >
      <EntriesStack.Screen name="Entries" component={Entries} options={{ title: 'Buscar vehículo' }}/>
      <EntriesStack.Screen name="SearchCustomer" component={SearchCustomer} options={{ title: 'Buscar cliente' }}/>
      <EntriesStack.Screen name="ChooseCustomer" component={ChooseCustomer} options={{ title: 'Elige al cliente' }}/>
      <EntriesStack.Screen name="EntryForm" component={EntryForm} options={{ title: 'Ingreso vehículo' }}/>

    </EntriesStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator 
      initialRouteName="Services"
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
      <Tab.Screen name="Entries" component={EntriesStackScreen} options={{ title: 'Ingresar' }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }}/>
    </Tab.Navigator>
  )
}