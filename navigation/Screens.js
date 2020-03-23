import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

// SCREENS
import Services from "../screens/Services";
// Entry vehicle
import SearchVehicle from "../screens/VehicleCheckIn/SearchVehicle";
import SearchCustomer from "../screens/VehicleCheckIn/SearchCustomer";
import ChooseCustomer from "../screens/VehicleCheckIn/ChooseCustomer";
import CheckInForm from "../screens/VehicleCheckIn/CheckInForm";

import Profile from "../screens/Profile";


const CheckInStack = createStackNavigator();

function EntriesStackScreen() {
  return (
    <CheckInStack.Navigator
      initialRouteName="SearchVehicle"
    >
      <CheckInStack.Screen name="SearchVehicle" component={SearchVehicle} options={{ title: 'Buscar vehículo' }}/>
      <CheckInStack.Screen name="SearchCustomer" component={SearchCustomer} options={{ title: 'Buscar cliente' }}/>
      <CheckInStack.Screen name="ChooseCustomer" component={ChooseCustomer} options={{ title: 'Elige al cliente' }}/>
      <CheckInStack.Screen name="CheckInForm" component={CheckInForm} options={{ title: 'Ingreso vehículo' }}/>

    </CheckInStack.Navigator>
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
          } else if (route.name === 'CheckIn') {
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
      <Tab.Screen name="CheckIn" component={EntriesStackScreen} options={{ title: 'Recepciones' }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }}/>
    </Tab.Navigator>
  )
}