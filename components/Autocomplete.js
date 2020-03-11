import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: null,
    }
  }

  render() {
    const { selectedItems } = this.state;
    console.log("items", selectedItems);
    return (
      // <SafeAreaView style={{ flex: 1 }}>
      //   <ScrollView>
          <SearchableDropdown
            onItemSelect={(item) => {
              this.setState({ selectedItems: item });
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
                onTextChange: text => console.log(text)
              }
            }
            // listProps={
            //   {
            //     nestedScrollEnabled: true,
            //   }
            // }
          />
      //   </ScrollView>
      // </SafeAreaView>
    );
  }
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
})

