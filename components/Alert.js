import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const AlertCustom = (props) => {
  const { error, type } = props; 
  return (
    <View style={styles.alertDanger}>
      <Text style={styles.textDanger}>{error}</Text>
    </View>
  );
};

export default AlertCustom;

const styles = StyleSheet.create({
  textDanger: {
    paddingHorizontal: 20,
    color: '#c43d4b',
  },
  alertDanger: {
    backgroundColor: 'rgba(196, 61, 75, .2)',
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#c43d4b1a',
    marginVertical: 20,
  },
})