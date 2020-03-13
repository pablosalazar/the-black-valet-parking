import * as React from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import AppContext from '../AppContext';

import { RESOURCE_URL } from '../constants/Path';

const Profile = () => {
  const { user, signOut } = React.useContext(AppContext);  
  const images = `${RESOURCE_URL}/${user.image}`
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        rounded
        size="xlarge"
        source={{ uri: `${RESOURCE_URL}/${user.image}`}}
        PlaceholderContent={<ActivityIndicator />}
        placeholderStyle={{ backgroundColor: '#000' }}
      />
      <Text style={styles.name}>{user.full_name}</Text>
      <Button
        title="Salir"
        onPress={() => signOut()}
      />
    </View>
  )
}

export default Profile;


const styles = StyleSheet.create({
  name: {
    color: '#ffffff',
    fontSize: 28,
    marginBottom: 30,
  },
})

