import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  const { 
    name, 
    label, 
    value, 
    error, 
    handleChange,
  } = props;


  return (
    <View style={styles.containerInput}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        name={name}
        value={value}
        onChangeText={handleChange(name)}
        style={styles.textInput}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  containerInput: {
    marginVertical: 6,
  },
  textInput: {
    textAlignVertical: 'top',
    backgroundColor: '#1b191b',    
    color: '#fff',
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(185,135,0,.6)',
    fontSize: 16,
    borderRadius: 10,
  },
  label: {
    color: "#969696",
    textTransform: "uppercase",
    fontWeight: 'bold',
  },
  errorText: {
    color: '#c43d4b',
    marginBottom: 0,
  },
})