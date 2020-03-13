import * as React from 'react';
import { View, Text, Button } from 'react-native';
import AppContext from '../AppContext';

const Profile = () => {
  const { user, signOut } = React.useContext(AppContext);  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color: '#ffffff'}}>{user.full_name}</Text>
      <Button
        title="Salir"
        onPress={() => signOut()}
      />
    </View>
  )
}

export default Profile;

