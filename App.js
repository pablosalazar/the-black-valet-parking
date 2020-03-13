import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import HomeStack from './navigation/Screens';
import AuthStack from './navigation/Auth';

import AppContext from './AppContext';

function SplashScreen() {
  return (
    <View style={[styles.container]} theme={DarkTheme}>
      <ActivityIndicator size="large" color="#b98700" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
})

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };

        case 'LOAD_USER':
          return {
            ...prevState,
            user: action.user,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('access_token');
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      dispatch({ type: 'LOAD_USER', user: JSON.parse(user) });
    };

    bootstrapAsync();
  }, []);

  const appContext = React.useMemo(
    () => ({
      signIn: async () => {
        userToken = await AsyncStorage.getItem('access_token');
        user = await AsyncStorage.getItem('user');
        dispatch({ type: 'SIGN_IN', token: userToken, user });
        dispatch({ type: 'LOAD_USER', user: JSON.parse(user) });
      },
      signOut: () => {
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('user');
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  
  return (
    <AppContext.Provider value={{...appContext, user: state.user}}>
      <NavigationContainer theme={DarkTheme}>
        {state.userToken === null ? (
          <AuthStack />
        ) : (
          <HomeStack />
        )}
      </NavigationContainer>
    </AppContext.Provider>
  )
}


