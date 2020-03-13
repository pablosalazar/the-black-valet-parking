import React, { Component } from 'react';
import { Input, Icon, SearchBar, ListItem } from 'react-native-elements';
import { StyleSheet, ScrollView, Modal, Image, TouchableHighlight, View, Alert} from 'react-native';
import Loader from './Loader';
import WaterMark from './WaterMark';
// import SearchableDropdown from 'react-native-searchable-dropdown';

export default class SearcheableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: [],
      resultsItems:props.items,
      isListOpen: false,
      isLoading: false,
      ...props,
    };
  }

  openList = () => {
    this.setState({ isListOpen: true });
  }

  closeList = () => {
    this.setState({ isListOpen: false });
  }

  updateSearch = search => {
    this.setState({ search });
  };

  getListItems = () => {
    return (
      <ScrollView>
        {
          resultsItems.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              containerStyle={{ 
                backgroundColor: 'rgba(49,149,165,.4)',
                borderColor: '#3195a5',
              }}
              titleStyle={{ color: '#fff' }}
              // onPress={() => (index)}
              bottomDivider
              chevron
            />
          ))
        }
      </ScrollView>
    )
  }

  render() {
    const { search, label, name, value, error, resultsItems, isListOpen, isLoading } = this.state;

    return (
      <>
        <TouchableHighlight onPress={this.openList}>
          <Input
            label={label}
            name={name}
            value={value}
            placeholder="Seleccion una opción"
            containerStyle={{paddingHorizontal: 0}}
            labelStyle={styles.label}
            inputContainerStyle={styles.containerInput}
            placeholderTextColor="#676767"
            inputStyle={styles.textInput}
            disabled={true}
            errorStyle={{ color: '#c43d4b' }}
            errorMessage={error}
            onShow={() => this.setState({isLoading: false})}
            rightIcon={
              <Icon
                name={isListOpen ? 'minus' : 'plus' }
                type="material-community"
                size={24}
                color='#969696'
              />
            }
          />
        </TouchableHighlight>

        <Loader loading={isLoading} />
        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          visible={isListOpen}
          hardwareAccelerated={true}
          onRequestClose={() => {
            this.closeList();
          }}
          onShow={() => {
            // Alert.alert('Modal has been showed.');
          }}
        >
          <View style={styles.modalBackground}>
            
            <SearchBar 
              placeholder="Buscar..."
              onChangeText={this.updateSearch}
              value={search}
            />

            {search.length === 0 && <WaterMark />}
            
            
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: "#969696",
    textTransform: "uppercase",
    fontWeight: 'normal',
  },
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
  modalBackground: {
    flex: 1,
    backgroundColor: '#000'
  },
})

