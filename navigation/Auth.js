import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

// screens
import SignIn from "../screens/SignIn";


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  )
}