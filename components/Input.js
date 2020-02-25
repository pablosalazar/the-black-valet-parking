import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  const { 
    name, 
    label, 
    value, 
    error, 
    handleChange, 
  } = props;

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        name={name}
        value={value}
        onChangeText={handleChange(name)}
        style={styles.textInput}
        {...props}
      />
      <Text style={styles.errorText}>{error}</Text>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    color: '#969696',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#b98700',
    fontSize: 16,
  },
  label: {
    color: "#fff",
    marginTop: 14,
    marginBottom: 5,
    textTransform: "uppercase",
    fontWeight: 'bold',
  },
  errorText: {
    color: '#c43d4b',
    marginBottom: 5, 
  },
})