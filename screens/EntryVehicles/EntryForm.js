import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, SafeAreaView } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Button, Input, Select, Loader, Autocomplete } from '../../components';

//API
import { createCustomer, updateCustomer } from '../../API/CustomerService';
import { createVehicle } from '../../API/VehicleService';

const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('Este campo es requerido'),
  document_type: Yup
    .string()
    .required('Este campo es requerido'),
  document_number: Yup
    .number()
    .typeError('Ingrese solo números')
    .positive('No ingrese simbolos')
    .min(12)
    .required('Este campo es requerido'),
  phone: Yup.string()
    .label('Telefono')
    .required('Este campo es requerido'),
  plate: Yup.string()
    .label('Placa')
    .required('Este campo es requerido'),
  brand: Yup.string()
    .label('Marca')
    .required('Este campo es requerido'),
  color: Yup.string()
    .label('Color')
    .required('Este campo es requerido'),
})

const document_type_list = [
  { label: 'CC - Cédula de ciudadanía', value: 'CC' },
  { label: 'TI - Tarjeta de identidad', value: 'TI' },
  { label: 'CE - Cédula de extranjería', value: 'CE' },
];

const brand_list = [
  { label: 'KIA', value: 'KIA' },
  { label: 'CHEVROLET', value: 'CHEVROLET' },
  { label: 'MAZDA', value: 'MAZDA' },
  { label: 'TOYOTA', value: 'TOYOTA' },
]

export default class Entries extends Component {
  constructor(props) {
    super(props);
    const { route: { params: { plate, vehicleSelected, customerSelected, document_number }} } = props;
    
    this.state = {
      data: {
        name: customerSelected ? customerSelected.name : '',
        document_type: customerSelected ? customerSelected.document_type : '',
        document_number: customerSelected ? customerSelected.document_number : (document_number ? document_number : ''),
        phone: customerSelected ? customerSelected.phone : '',
        plate: vehicleSelected ? vehicleSelected.plate.toUpperCase() : (plate.toUpperCase() ? plate.toUpperCase(): ''),
        brand: vehicleSelected ? vehicleSelected.brand : '',
        color: vehicleSelected ? vehicleSelected.color : '',
      },
      isVehicleExisting: vehicleSelected ? true : false,
      isCustomerExisting: customerSelected ? true : false,
      error: null,
      isLoading: false,
    };
    this.isAlertShowed = false;
  }


  handleSubmit = async (data) => {
    const { route: { params: { customerSelected }} } = this.props;
    try {
      this.setState({ isLoading: true });
      let customer = {};
      if (customerSelected) {
        customer = await updateCustomer(customerSelected.id, data);
      } else {
        customer = await createCustomer(data);
      }
      
      // const vehicle = await createVehicle({
      //   ...data,
      //   customer_id: customer.id,
      // });
      
    } catch (error) {
      this.setState({ error }, () => this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true}));
    } finally {
      this.setState({ isLoading: false });
    }
  }

  launchAlert = (errors) => {
    const keysErrors = Object.keys(errors);
    if (keysErrors.length && !this.isAlertShowed) {
      this.isAlertShowed = true;
      Alert.alert(
        'INFO',
        'Algunos campos presentan conflicto',
        [
          {text: 'OK', onPress: () => {
            this.isAlertShowed = false;
            this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true})
          }},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    const { isCustomerExisting, isVehicleExisting, data, error, isLoading } = this.state;
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView ref='_scrollView'>
          <View style={{flex: 1, paddingHorizontal: 30 }}>
            {isLoading && <Loader />}
            <Formik
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={values => this.handleSubmit(values)}
              >
                {({ values, errors, handleChange, handleSubmit, isSubmitting  }) => (
                  <>
                    {error &&  <AlertCustom error={error} />}
                    <Text style={styles.title}>INFO CLIENTE</Text>
                    <Input
                      name='name'
                      label="Nombre del cliente"
                      value={values.name}
                      handleChange={handleChange}
                      error={errors.name}
                    />

                    <Select
                      name='document_type'
                      items={document_type_list}
                      label="Tipo de documento"
                      value={values.document_type}
                      handleChange={handleChange}
                      error={errors.document_type}
                      editable={isCustomerExisting ? false : true }
                    />
                    
                    <Input
                      name='document_number'
                      label="Número de documento"
                      value={values.document_number}
                      handleChange={handleChange}
                      error={errors.document_number}
                      editable={isCustomerExisting ? false : true }
                    />

                    <Input
                      name='phone'
                      label="Teléfono del cliente"
                      value={values.phone}
                      handleChange={handleChange}
                      error={errors.phone}
                    />

                    <Text style={styles.title}>INFO VEHÍCULO</Text>

                    <Input
                      name='plate'
                      label="Placa del vehículo"
                      value={values.plate}
                      handleChange={handleChange}
                      error={errors.plate}
                      editable={isVehicleExisting ? false : true }
                      autoCapitalize="characters"
                    />

                    <Select
                      name='brand'
                      items={brand_list}
                      label="Marca del vehiculo"
                      value={values.brand}
                      handleChange={handleChange}
                      error={errors.brand}
                      editable={isVehicleExisting ? false : true }
                    />

                    <Input
                      name='color'
                      label="Color del vehículo"
                      value={values.color}
                      handleChange={handleChange}
                      error={errors.color}
                      editable={isVehicleExisting ? false : true }
                    />

                    <Text style={styles.title}>PUNTO DE SERVICIO</Text>
                    <Autocomplete />
                    
                    <Text style={styles.title}>OBSERVACIONES</Text>
                    <Input
                      name='observations'
                      multiline
                      numberOfLines={5}
                      value={values.observations}
                      handleChange={handleChange}
                      error={errors.observations}
                    />

              
                    <View paddingVertical={5} />
                    {isSubmitting && this.launchAlert(errors)}
                    <Button
                      label="REGISTRAR"
                      handlePress={handleSubmit}
                    />
                   
                    <View paddingVertical={20} />
                  </>
                )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  textInput: {
    height: 50,
    color: '#969696',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#b98700',
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: "#b98700",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  errorText: {
    color: '#c43d4b',
    marginBottom: 5, 
  },
  textDanger: {
    paddingHorizontal: 20,
    color: '#c43d4b',
  },
  alertDanger: {
    backgroundColor: 'rgba(196, 61, 75, .2)',
    marginBottom: 20,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#c43d4b1a',
  },
  textPrimary: {
    color: '#b98700',
    textAlign: 'center'
  },
})

