import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  const { 
    name, 
    label, 
    value, 
    error, 
    handleChange,
    editable,
  } = props;

  return (
    <View style={styles.containerInput}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        name={name}
        value={value}
        onChangeText={handleChange(name)}
        placeholderTextColor='#969696'
        style={editable !== false ? styles.textInput : [ styles.textInput, styles.readOnly]}
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
    paddingBottom:  Platform.OS === 'ios' ? 14 : 8,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#969696',
    fontSize: 16,
    borderRadius: 10,
  },
  readOnly: {
    // backgroundColor: '#000',    
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