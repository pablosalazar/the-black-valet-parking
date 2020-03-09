import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TouchableScale from 'react-native-touchable-scale'; 
import { Avatar, ListItem } from 'react-native-elements';

export default ChooseCustomer = ({route, navigation}) => {
  const { vehicleSelected, customerList } = route.params;

  const handleSelectCustomer = (index) => {
   navigation.navigate('EntryForm', {
    vehicleSelected,
    customerSelected: customerList[index],
   });
  }

  const goToSearchCustomer = () => {
    navigation.navigate('SearchCustomer', {
      vehicleSelected,
     });
  }
  
  return (
    <View style={{flex: 1, paddingHorizontal: 30 }}>
      <Text style={styles.title}>PASO 2</Text>
      <Text style={styles.found}>SE ENCONTRO {customerList.length} CLIENTES</Text>
      <Text style={styles.text}>Elije una opción:</Text>
      <ScrollView>
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          containerStyle={{ 
            backgroundColor: 'rgba(49,149,165,.4)',
            borderColor: '#3195a5',
          }}
          title="EL CLIENTE NO ESTA EN LA LISTA"
          titleStyle={{ color: '#fff' }}
          leftIcon={
            <Avatar
              size="medium"
              overlayContainerStyle={{backgroundColor: '#fff'}}
              rounded 
              icon={{ name: 'plus', color: '#b98700', type: 'material-community' }} 
            />
          }
          onPress={goToSearchCustomer}
          bottomDivider
          chevron
        />
        <View>
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
                onPress={() => handleSelectCustomer(index)}
                bottomDivider
                chevron
              />
            ))
          }
        </View>
      </ScrollView>
      <View style={{marginBottom: 30}} />
    </View>
  );
};

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
  text: {
    color: '#969696',
    marginBottom: 10,
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
