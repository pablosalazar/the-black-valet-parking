import React, { Component } from 'react';
import { Input, Icon, SearchBar, ListItem } from 'react-native-elements';
import { StyleSheet, ScrollView, Modal, Text, TouchableHighlight, View, ActivityIndicator} from 'react-native';

export default class SearcheableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: [],
      itemsFiltered: [],
      isListOpen: false,
      isLoading: false,
      isListShowed: false,
      itemSelected: null,
      ...props,
    };
    
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.setState({
        items: this.props.items,
        itemsFiltered: this.props.items,
        error: this.props.error,
      })
    }
  }

  openList = () => {
    this.setState({ isListOpen: true });
  }

  closeList = () => {
    this.setState({ isListOpen: false });
  }

  updateSearch = search => {
    const { items } = this.state;
    const itemsFiltered = items.filter((item) => item.name.includes(search))
    this.setState({ itemsFiltered, search });
  };

  renderItems = () => {
    const { itemsFiltered, search } = this.state;

    if (itemsFiltered.length === 0) {
      return <Text style={[styles.found, {marginTop: 20}]}>NO ENCONTRARON RESULTADOS</Text>
    }

    return (
      <ScrollView>
        {
          itemsFiltered.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              containerStyle={{ 
                backgroundColor: 'rgba(49,149,165,.4)',
                borderColor: '#3195a5',
              }}
              titleStyle={{ color: '#fff' }}
              onPress={() => this.selectingItem(item.id, item.name)}
              bottomDivider
              chevron
            />
          ))
        }
      </ScrollView>
    )
  }

  selectingItem = (id, value) => {
    const { name, items } = this.state;
    this.setState({ 
      isListShowed: false,
      itemsFiltered: items,
      value, 
      search: ''
    });
    this.props.handleChange(name, id);
    this.closeList();
  }

  render() {
    const { 
      search, label, name, value, error, isListOpen, isListShowed, items
    } = this.state;
    
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
            onShow={() => this.setState({ isLoading: false })}
            disabledInputStyle={{ color: '#fff',opacity:1 }}
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

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          visible={isListOpen}
          hardwareAccelerated={true}
          onRequestClose={() => {
            this.setState({ isListShowed: false, search: '', itemsFiltered: items });
            this.closeList();
          }}
          onShow={() => {
            this.setState({isListShowed: true})
          }}
        >
          <View style={styles.modalBackground}>
            
            <SearchBar 
              placeholder="Buscar..."
              onChangeText={this.updateSearch}
              value={search}
            />
            {!isListShowed && (
              <View style={{marginTop: 40}}>
                <ActivityIndicator size="large" color="#b98700" />
              </View>
            )}
            
            {isListShowed && this.renderItems()}
            
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
    paddingBottom:  Platform.OS === 'ios' ? 14 : 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000'
  },
  found: {
    color: '#969696',
    textAlign: 'center',
    marginBottom: 20,
  },
})

