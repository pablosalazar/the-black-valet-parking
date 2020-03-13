import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const WaterMark = () => {
  return (
    <View style={styles.content}>
      <Image
        style={{width: 100, height: 65 }}
        source={require('../assets/images/logo-transparent.png')}
      />
    </View>
  );
};

export default WaterMark;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
})