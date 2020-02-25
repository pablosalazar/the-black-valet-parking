import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Picker, Button, Icon, Platform } from 'react-native';
import SelectInput from 'react-native-select-input-ios';
import RNPickerSelect from 'react-native-picker-select';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Input from '../components/Input';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Nombre')
    .required('Este campo es requerido'),
  // document_type: Yup.string()
  //   .label('Tipo de documento')
  //   .required('Este campo es requerido'),
  // document_number: Yup.string()
  //   .label('Número de documento')
  //   .required('Este campo es requerido'),
  // phone: Yup.string()
  //   .label('Telefono')
  //   .required('Este campo es requerido'),
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
                {/* <Text style={styles.label}>Nombre del cliente</Text>
                <TextInput
                  name="name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>{errors.name}</Text>
                <Text style={styles.label}>Tipo de documento</Text>
                
                <RNPickerSelect
                  onValueChange={handleChange('document_type')}
                  placeholder={{
                    label: 'Seleccione una opción...',
                    value: '',
                    color: '#9EA0A4',
                  }}
                  mode="dialog"
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  items={[
                      { label: 'CC - Cédula de ciudadanía', value: 'CC' },
                      { label: 'TI - Tarjeta de identidad', value: 'TI' },
                      { label: 'CE - Cédula de extranjería', value: 'CE' },
                  ]}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderTopWidth: 6,
                          borderTopColor: '#b98700',
                          borderRightWidth: 6,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 6,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                          top: 23,
                          right: 10,
                        }}
                      />
                    );
                  }}
                />
                <Text style={styles.errorText}>{errors.document_type}</Text> */}
                
                {/* <View style={styles.formGroup}>
                  <Picker
                    selectedValue={this.state.language}
                    placeholder="Select your SIM"
                    style={styles.selectInput}
                    mode="dialog"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Seleccione una opcion" value="" />
                    <Picker.Item label="Java" value="java" />
                    
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View> */}

            
                {/* <TextInput
                  name="document_type"
                  value={values.document_type}
                  onChangeText={handleChange('document_type')}
                  onBlur={handleBlur('document_type')}
                  style={styles.textInput}
                /> */}
                {/* <ErrorMessage errorValue={touched.document_type && errors.document_type} /> */}

                {/*<Text>Número de documento</Text>
                <TextInput 
                  name="document_number"
                  value={values.document_number}
                  onChangeText={handleChange('document_number')}
                  onBlur={handleBlur('document_number')}
                  style={styles.textInput}
                />
                <ErrorMessage errorValue={touched.document_number && errors.document_number} />

                <Text>Teléfono</Text>
                <TextInput 
                  name="phone"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  style={styles.textInput}
                />
                <ErrorMessage errorValue={touched.phone && errors.phone} />

                <Divider style={{ backgroundColor: '#000' }} /> */}

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
                  buttonStyle={styles.buttonPrimary}
                  title="REGISTRAR"
                  onPress={handleSubmit}
                  disabled={isLoading}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#b98700',
    color: '#969696',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#b98700',   
    color: '#969696',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
