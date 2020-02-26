import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Input, Select } from '../components';

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
  // plate: Yup.string()
  //   .label('Placa')
  //   .required('Este campo es requerido'),
  // brand: Yup.string()
  //   .label('Marca')
  //   .required('Este campo es requerido'),
  // color: Yup.string()
  //   .label('Color')
  //   .required('Este campo es requerido'),
})

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        document_type: '',
        // document_number: '',
        // phone: '',
        // plate: '',
        // brand: '',
        // color: '',
      },
      error: null
    };
  }

  handleSubmit = (data) => {
    console.log(data);
  }

  render() {
    const { data, error, isLoading } = this.state;
    return (
      <View style={{flex: 1, paddingHorizontal: 30 }}>
        {error && <Text>{error}</Text>}
        <Formik
            initialValues={data}
            onSubmit={values => {this.handleSubmit(values)}}
            validationSchema={validationSchema}
          >
            {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
              <>
                <Input
                  name='name'
                  label="Nombre del cliente"
                  value={values.name}
                  handleChange={handleChange}
                  error={errors.name}
                />

                <Select
                  name='document_type'
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

                {/* <Text>Ingrese la placa</Text>
                <TextInput
                  name="plate"
                  value={values.plate}
                  onChangeText={handleChange('plate')}
                  onBlur={handleBlur('plate')}
                  style={styles.textInput}
                />
                <ErrorMessage errorValue={touched.plate && errors.plate} />

                <Text>Elija la marca</Text>
                <TextInput 
                  name="brand"
                  value={values.brand}
                  onChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  style={styles.textInput}
                />
                <ErrorMessage errorValue={touched.brand && errors.brand} />

                <Text>Digite el color</Text>
                <TextInput 
                  name="color"
                  value={values.color}
                  onChangeText={handleChange('color')}
                  onBlur={handleBlur('color')}
                  style={styles.textInput}
                />
                <ErrorMessage errorValue={touched.color && errors.color} /> */}
                <View paddingVertical={5} />
                <Button
                  label="REGISTRAR"
                  handleSubmit={handleSubmit}
                  // disabled={isLoading}
                />
              </>
            )}
        </Formik>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#b98700',
    marginVertical: 20,
    fontSize: 20,
  },
  textInput: {
    height: 50,
    color: '#969696',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#b98700',
    fontSize: 16,
  },
  selectInput: {
    color: '#969696',
    height: 50,
    borderWidth: 1,
  },
  label: {
    color: "#fff",
    marginTop: 14,
    marginBottom: 5,
    textTransform: "uppercase",
    fontWeight: 'bold',
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

