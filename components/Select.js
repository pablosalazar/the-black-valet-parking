import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';



const Select = (props) => {
  const {
    name,
    label,
    value,
    items,
    handleChange,
    error,
    editable
  } = props;

  let disabled = false;
  if ( editable === false) {
    disabled = true
  }

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
        value={value}
        mode="dialog"
        style={disabled ? disabledInputStyles : inputStyles}
        useNativeAndroidPickerStyle={false}
        items={items}
        disabled={editable === false ? true : false}
        Icon={() => {
          if(disabled) return null;
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    color: "#969696",
    textTransform: "uppercase",
    fontWeight: 'bold',
  },
  errorText: {
    color: '#c43d4b', 
  },
})

const inputStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#1b191b',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(185,135,0,.6)',
    color: '#fff',
    borderRadius: 10,
  },
  inputAndroid: {
    backgroundColor: '#1b191b',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: 'rgba(185,135,0,.6)',   
    color: '#fff',
    borderRadius: 10,
  },
});

const disabledInputStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#000',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(185,135,0,.6)',
    color: '#fff',
    borderRadius: 10,
  },
  inputAndroid: {
    backgroundColor: '#000',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: 'rgba(185,135,0,.6)',   
    color: '#fff',
    borderRadius: 10,
  },
});

