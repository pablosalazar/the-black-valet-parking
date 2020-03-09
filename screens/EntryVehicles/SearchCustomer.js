import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, SearchBar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 

import { Button } from '../../components';
import { getCustomerByDocumentNumber } from '../../API/CustomerService';
import { ProgressViewIOSComponent } from 'react-native';

export default class SearchCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      spinner: false,
      customerList: [],
      vehicleSelected: props.route.params.vehicleSelected,
      plate: props.route.params.plate,
    };
  }

  updateSearch = search => {
    this.setState({ search });
    if (search.length >= 2) {
      this.searchByDocumentNumber(search);
    } else {
      this.setState({ spinner: false, error: null })
    }
  };

  searchByDocumentNumber = async (search) => {
    this.setState({spinner: true});
    try {
      response = await getCustomerByDocumentNumber(search.trim());
      this.setState({
        customerList: response.data,
      })
    } catch (error) {
      this.setState({error, customerList: [] });
    } finally {
      this.setState({spinner: false});
    }
  }

  handleSelectCustomer = (index) => {
    const { plate, vehicleSelected, customerList } = this.state;
    this.props.navigation.navigate('EntryForm', {
      customerSelected: customerList[index],
      plate,
      vehicleSelected,
    });
  }

  goToForm = () => {
    const { plate, vehicleSelected, search } = this.state;
    this.props.navigation.navigate('EntryForm', {
      document_number: search,
      plate,
      vehicleSelected,
    });
  }

  render() {
    const { plate, search, spinner, customerList } = this.state;
  
    return (
      <View style={{flex: 1, paddingHorizontal: 30 }}>
        <Text style={styles.title}>PASO 2 - PLACA {plate}</Text>
        <SearchBar
          placeholder="Número de documento..."
          onChangeText={this.updateSearch}
          value={search}
          showLoading={spinner}
          inputStyle={styles.textUppercase}
        />

        <Text style={styles.plate}>{search}</Text>
        {search.length > 2 && (
          customerList.length === 0 ? (
            <>
              <Text style={styles.found}>NO SE ENCONTRARON RESULTADOS</Text>
              {search.length < 5 && <Text style={styles.found}>Escribe al menos 5 caracteres para continuar...</Text>}
            </>
          ) : (
            <>
              <Text style={styles.found}>SE ENCONTRO {customerList.length} PERSONAS</Text>
              <ScrollView>
                {
                  customerList.map((item, index) => (
                    <ListItem
                      key={index}
                      Component={TouchableScale}
                      friction={90}
                      tension={100}
                      activeScale={0.95}
                      title={item.name}
                      containerStyle={{ 
                        backgroundColor: 'rgba(49,149,165,.4)',
                        borderColor: '#3195a5',
                      }}
                      titleStyle={{ color: '#fff' }}
                      subtitleStyle={{ textTransform: 'uppercase', color: '#b5e6ed' }}
                      subtitle={`${item.document_type} - ${item.document_number}`}
                      leftIcon={
                        <Avatar
                          size="medium"
                          overlayContainerStyle={{backgroundColor: '#b98700'}}
                          rounded 
                          icon={{ name: 'account', color: '#000', type: 'material-community' }} 
                        />
                      }
                      onPress={() => this.handleSelectCustomer(index)}
                      bottomDivider
                      chevron
                    />
                  ))
                }
              </ScrollView>
              <View style={{marginBottom: 30}} />
            </>
          )
        )}
        {search.length > 4 && customerList.length === 0 && (
          <Button
            label="Continuar"
            handlePress={this.goToForm}
          />
        )}
      </View>
    )
  }    
  
}

const styles = StyleSheet.create({
  title: {
    color: '#b98700',
    marginVertical: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#b98700',
  },
  plate: {
    color: '#b98700',
    fontWeight: "400",
    fontSize: 36,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 10,
  },
  found: {
    color: '#969696',
    textAlign: 'center',
    marginBottom: 20,
  },
  numberText: {
    backgroundColor: '#b98700',
    color: '#fff',
    width: 100,
    height: 40,
    fontSize: 20,
    
  },
  textUppercase: {
    textTransform: 'uppercase',
    color: '#ffffff'
  }
})

