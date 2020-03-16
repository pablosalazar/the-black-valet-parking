import React from 'react';
import { Button as ButtonRNE } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const Button = (props) => {
  const { label, handlePress } = props; 
  return (
    <ButtonRNE
      buttonStyle={styles.primaryButton}
      title={label}
      onPress={handlePress}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#b98700",
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 50,
  },
})