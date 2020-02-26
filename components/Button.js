import React from 'react';
import { Button as ButtonRNE } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = (props) => {
  const { label, handleSubmit } = props; 
  return (
    <ButtonRNE
      buttonStyle={styles.buttonPrimary}
      title={label}
      onPress={handleSubmit}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: "#b98700",
    marginTop: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: '60%',
  },
})