import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SearchBar, ListItem, Badge } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 
import { Avatar } from 'react-native-elements';

import { Button } from '../components';
import { getVehicleByPlate } from '../API/VehicleService';

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      step: 1,
      spinner: false,
      vehicleList: [],
      customerList: [],
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  updateSearch = search => {
    this.setState({ search });
    if (search.length >= 2) {
      this.searchByPlate(search);
    } else {
      this.setState({ spinner: false, error: null })
    }
  };

  searchByPlate = async (search) => {
    this.setState({spinner: true});
    try {
      response = await getVehicleByPlate(search.trim());
      this.setState({
        vehicleList: response.data,
      })
    } catch (error) {
      this.setState({error, vehicleList: [] });
    } finally {
      this.setState({spinner: false});
    }
  }

  handleSelectVehicle = (index) => {
    const { vehicleList } = this.state;
    this.setState({
      plateSelected: vehicleList[index].plate,
      customerList: vehicleList[index].customers,
      step: 2,
    })
  }

  render() {
    const { step, search, spinner, vehicleList, customerList } = this.state;
    
    if (step === 1) {
      return (
        <View style={{flex: 1, paddingHorizontal: 30 }}>
          <Text style={styles.title}>PASO 1</Text>
          <SearchBar
            placeholder="Digite la placa..."
            onChangeText={this.updateSearch}
            value={search}
            showLoading={spinner}
            inputStyle={styles.textUppercase}
          />
  
          <Text style={styles.plate}>{search}</Text>
          {search.length > 2 && (
            vehicleList.length === 0 ? (
              <>
                <Text style={styles.found}>NO SE ENCONTRARON RESULTADOS</Text>
                {search.length < 5 && <Text style={styles.found}>Escribe al menos 5 caracteres para continuar...</Text>}
              </>
            ) : (
              <>
                <Text style={styles.found}>SE ENCONTRO {vehicleList.length} VEHICULOS</Text>
                <ScrollView>
                  {
                    vehicleList.map((item, index) => (
                      
                      <ListItem
                        key={index}
                        Component={TouchableScale}
                        friction={90}
                        tension={100}
                        activeScale={0.95}
                        title={item.plate}
                        titleStyle={{ fontWeight: 'bold' }}
                        subtitleStyle={{ textTransform: 'uppercase' }}
                        subtitle={`${item.brand} - ${item.color}`}
                        disabled={spinner}
                        leftIcon={
                          <Avatar
                            size="medium"
                            overlayContainerStyle={{backgroundColor: '#000'}}
                            rounded 
                            icon={{ name: 'car', color: '#b98700', type: 'material-community' }} 
                          />
                        }
                        onPress={() => this.handleSelectVehicle(index)}
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
          {search.length > 4 && vehicleList.length === 0 && (
            <Button
              label="Continuar"
              // handleSubmit={handleSubmit}
              // disabled={isLoading}
            />
          )}
        </View>
      )
    }

    if (step === 2) {
      return (
        <View style={{flex: 1, paddingHorizontal: 30 }}>
          <Text style={styles.title}>PASO 2</Text>
          <Text style={styles.found}>SE ENCONTRO {customerList.length} CLIENTES</Text>
          <ScrollView>
            {
              customerList.map((item, i) => (
                <ListItem
                  key={i}
                  Component={TouchableScale}
                  friction={90}
                  tension={100}
                  activeScale={0.95}
                  title={item.name}
                  titleStyle={{ fontWeight: 'bold' }}
                  subtitleStyle={{ textTransform: 'uppercase' }}
                  subtitle={`${item.document_type} - ${item.document_number}`}
                  disabled={spinner}
                  leftIcon={
                    <Avatar
                      size="medium"
                      overlayContainerStyle={{backgroundColor: '#b98700'}}
                      rounded 
                      icon={{ name: 'account', color: '#000', type: 'material-community' }} 
                    />
                  }
                  bottomDivider
                  chevron
                />
              ))
            }
          </ScrollView>
          <View style={{marginBottom: 30}} />
        </View>
      )
    }
    
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

