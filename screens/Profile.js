import * as React from 'react';
import { View, Text, Button } from 'react-native';
import AppContext from '../AppContext';

export default function Profile() {
  const { signOut } = React.useContext(AppContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color: '#ffffff'}}>Profile Screen</Text>
      <Button
        title="Salir"
        onPress={() => signOut()}
      />
    </View>
  )
}
