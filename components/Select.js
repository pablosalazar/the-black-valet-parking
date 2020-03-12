import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from './index';


const Select = (props) => {
  const {
    name,
    label,
    value,
    items,
    handleChange,
    error,
    disabled
  } = props;

  
  if (disabled === true) {
    const labelValue = items.filter(item => item.value === value )[0].label;
    return (
      <Input
        label={label}
        name={name}
        value={labelValue || value}
        handleChange={handleChange}
        disabled
      />
    )
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
        style={inputStyles}
        useNativeAndroidPickerStyle={false}
        items={items}
        Icon={() => {
          if(disabled) return null;
          return (
            <View
              style={{
                backgroundColor: 'transparent',
                borderTopWidth: 6,
                borderTopColor: '#969696',
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
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
})

const inputStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: 'rgba(255, 255, 255, .2)',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 10,
  },
  inputAndroid: {
    backgroundColor: 'rgba(255, 255, 255, .2)',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 11,   
    color: '#fff',
    borderRadius: 10,
  },
});
