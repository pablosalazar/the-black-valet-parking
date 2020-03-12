import React from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { StyleSheet, Text } from 'react-native';

const Autocomplete = (props) => {
  const [itemSelected, setItemSelected] = React.useState(null);
  const { 
    name, 
    label, 
    error, 
    handleChange,
    items,
  } = props;
  
  return (
    <>
      <SearchableDropdown
        onItemSelect={(item) => {
          handleChange(name, item.id);
          setItemSelected(item)
        }}
        onFocus={(text) => {
          console.log(text);
        }}
        containerStyle={{ padding: 5 }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: 'gray' }}
        itemsContainerStyle={{ maxHeight: 200, backgroundColor: '#fff', paddingHorizontal: 10, }}
        items={items}
        textInputProps={
          {
            placeholder: "Seleccione una opción...",
            underlineColorAndroid: "transparent",
            style: styles.textInput,
          }
        }
        listProps={
          {
            nestedScrollEnabled: true,
          }
        }
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}

export default Autocomplete;

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
    backgroundColor: '#1b191b',    
    color: '#fff',
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 14 : 8,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#969696',
    fontSize: 16,
    borderRadius: 10,
  },
  errorText: {
    color: '#c43d4b',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
})

