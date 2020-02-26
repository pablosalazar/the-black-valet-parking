import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';

const Select = (props) => {
  const {
    name,
    label,
    handleChange,
    error
  } = props;

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
        onValueChange={handleChange(name)}
        placeholder={{
          label: 'Seleccione una opción...',
          value: '',
          color: '#9EA0A4',
        }}
        mode="dialog"
        style={styles}
        useNativeAndroidPickerStyle={false}
        items={[
            { label: 'CC - Cédula de ciudadanía', value: 'CC' },
            { label: 'TI - Tarjeta de identidad', value: 'TI' },
            { label: 'CE - Cédula de extranjería', value: 'CE' },
        ]}
        Icon={() => {
          return (
            <View
              style={{
                backgroundColor: 'transparent',
                borderTopWidth: 6,
                borderTopColor: '#b98700',
                borderRightWidth: 6,
                borderRightColor: 'transparent',
                borderLeftWidth: 6,
                borderLeftColor: 'transparent',
                width: 0,
                height: 0,
                top: 23,
                right: 10,
              }}
            />
          );
        }}
      />
      {/* <Text style={styles.errorText}>{error}</Text> */}
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 'bold',
  },
  errorText: {
    color: '#c43d4b', 
  },
  inputIOS: {
    backgroundColor: '#232223',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#b98700',
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: '#232223',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#b98700',   
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
