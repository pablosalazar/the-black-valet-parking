import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, SearchBar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 

import { Button, WaterMark } from '../../components';
import { getVehicleByPlate } from '../../API/VehicleService';

export default class SearchVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      spinner: false,
      vehicleList: [],
      customerList: [],
    };

  }

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
    this.props.navigation.navigate('ChooseCustomer', {
      vehicleSelected: vehicleList[index],
      customerList: vehicleList[index].customers,
    });
  }

  goToSearchCustomer = () => {
    const { search } = this.state;
    this.props.navigation.navigate('SearchCustomer', {
      plate: search,
    });
  }

  render() {
    const { search, spinner, vehicleList } = this.state;
  
    return (
      <View style={{flex: 1, paddingHorizontal: 30 }}>
        <Text style={styles.title}>BUSCAR VEHICULO</Text>
        <SearchBar
          placeholder="Digite la placa..."
          onChangeText={this.updateSearch}
          value={search}
          showLoading={spinner}
          autoCapitalize='characters'
        />

        <Text style={styles.plate}>{search}</Text>
        {search.length === 0 && <WaterMark />}
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
                      containerStyle={{ 
                        backgroundColor: 'rgba(49,149,165,.4)',
                        borderColor: '#3195a5',
                      }}
                      titleStyle={{ color: '#fff', textTransform: 'uppercase' }}
                      subtitleStyle={{ textTransform: 'uppercase', color: '#b5e6ed' }}
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
            handlePress={this.goToSearchCustomer}
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
    textAlign: 'center',
    marginVertical: 10,
    textTransform: 'uppercase'
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
  }
})

