import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as InputREN, Icon } from 'react-native-elements';

const Input = (props) => {
  const { 
    name, 
    label, 
    value,
    lIcon, 
    error, 
    handleChange,
    disabled,
  } = props;

  if(disabled === true) {
    return (
      <InputREN
        label={label}
        name={name}
        value={value}
        onChangeText={handleChange(name)}
        containerStyle={{paddingHorizontal: 0}}
        labelStyle={styles.label}
        inputContainerStyle={styles.containerInput}
        inputStyle={styles.textInput}
        errorStyle={{ color: '#c43d4b' }}
        errorMessage={error}
        disabledInputStyle={{color: '#fff', fontSize: 18}}
        rightIcon={
          <Icon
            name="lock-outline"
            type="material-community"
            size={24}
            color='#969696'
          />
        }
        {...props}
      />
    );
  }


  if(lIcon) {
    return (
      <InputREN
        label={label}
        name={name}
        value={value}
        onChangeText={handleChange(name)}
        containerStyle={{paddingHorizontal: 0}}
        labelStyle={styles.label}
        inputContainerStyle={styles.containerInput}
        placeholderTextColor="#676767"
        inputStyle={styles.textInput}
        errorStyle={{ color: '#c43d4b' }}
        errorMessage={error}
        leftIcon={
          <Icon
            name={lIcon}
            type="material-community"
            size={24}
            color='#969696'
          />
        }
        {...props}
      />
    );
  }

  return (
    <InputREN
      label={label}
      name={name}
      value={value}
      onChangeText={handleChange(name)}
      containerStyle={{paddingHorizontal: 0}}
      labelStyle={styles.label}
      inputContainerStyle={styles.containerInput}
      placeholderTextColor="#676767"
      inputStyle={styles.textInput}
      errorStyle={{ color: '#c43d4b' }}
      errorMessage={error}
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  containerInput: {
    marginVertical: 6,
    borderColor: '#969696',
    backgroundColor: 'rgba(255, 255, 255, .2)',
    borderRadius: 10,
    borderBottomWidth:0,
    paddingRight: 10,
  },
  textInput: {
    textAlignVertical: 'top',
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 0,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom:  Platform.OS === 'ios' ? 14 : 8,
  },
  label: {
    color: "#969696",
    textTransform: "uppercase",
    fontWeight: 'normal',
  },
  errorText: {
    color: '#c43d4b',
    marginBottom: 0,
  },
})