import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Button, Input, Select, Loader } from '../../components';

//API
import { registerCustomer } from '../../API/CusotmerService';
import { registerVehicle } from '../../API/VehicleService';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Este campo es requerido'),
  document_type: Yup.string()
    .required('Este campo es requerido'),
  document_number: Yup.string()
    .label('Número de documento')
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
  { label: 'Chevrolet', value: 'Chevrolet' },
  { label: 'Mazda', value: 'Mazda' },
]

export default class Entries extends Component {
  constructor(props) {
    super(props);
    const { route: { params: { customerSelected }} } = props;
    this.state = {
      data: {
        name: customerSelected ? customerSelected.name : '',
        document_type: customerSelected ? customerSelected.document_type : '',
        document_number: customerSelected ? customerSelected.document_number : '',
        phone: customerSelected ? customerSelected.phone : '',
        plate: '',
        brand: '',
        color: '',
      },
      error: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { data } = this.state;
    const { route: { params: { customerSelected }} } = this.props;
    console.log(customerSelected);
    this.setState({
      data: {
        ...data,
        name: customerSelected.name,
        document_type: customerSelected.document_type,
        document_number: customerSelected.document_number,
        phone: customerSelected.phone,
      },
      isLoading: false,
    })
  }

  handleSubmit = async (data) => {
    try {
      this.setState({ isLoading: true });
      const customer = await registerCustomer(data);
      const vehicle = await registerVehicle({
        ...data,
        customer_id: customer.id,
      });
      
    } catch (error) {
      this.setState( error );
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data, error, isLoading } = this.state;
    
    return (
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 30 }}>
          {isLoading && <Loader />}
          {error && <Text>{error}</Text>}
          <Formik
              initialValues={data}
              onSubmit={values => {this.handleSubmit(values)}}
              validationSchema={validationSchema}
            >
              {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
                <>
                  {error && <Text style={styles.title}>{error}</Text>}
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
                  />
                  
                  <Input
                    name='document_number'
                    label="Número de documento"
                    value={values.document_number}
                    handleChange={handleChange}
                    error={errors.document_number}
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
                  />

                  <Select
                    name='brand'
                    items={brand_list}
                    label="Marca del vehiculo"
                    value={values.brand}
                    handleChange={handleChange}
                    error={errors.brand}
                  />

                  <Input
                    name='color'
                    label="Color del vehículo"
                    value={values.color}
                    handleChange={handleChange}
                    error={errors.color}
                  />

                  {/* <Text style={styles.title}>ESTADO VEHÍCULO</Text>

                  <Input
                    name='plate'
                    label="Color del vehículo"
                    multiline
                    numberOfLines={5}
                    value={values.plate}
                    handleChange={handleChange}
                    error={errors.plate}
                  /> */}

             
                  <View paddingVertical={5} />
                  <Button
                    label="REGISTRAR"
                    handleSubmit={handleSubmit}
                    // disabled={isLoading}
                  />
                  <View paddingVertical={20} />
                </>
              )}
          </Formik>
        </View>
      </ScrollView>
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

