import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

// screens
import SignIn from "../screens/Auth/SignIn";
import RecoverPassword from "../screens/Auth/RecoverPassword";


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    </Stack.Navigator>
  )
}