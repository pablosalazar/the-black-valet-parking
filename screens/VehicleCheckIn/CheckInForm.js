import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, SafeAreaView } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import AppContext from '../../AppContext'

import { Button, Input, Select, Loader, SearcheableSelect, AlertCustom } from '../../components';

//API
import { createCustomer, updateCustomer } from '../../API/CustomerService';
import { createVehicle } from '../../API/VehicleService';
import { createParkingService } from '../../API/ParkingService';
import { getPlaces, getServicePoints } from '../../API/PlaceService';

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
  service_point_id: Yup.string()
    .required('Selecciona un punto de servicio valido'),
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

export default class CheckInForm extends Component {
  static contextType = AppContext

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
        service_point_id: '',
        employee_id: '',
        employee: '',
      },
      user: null,
      isVehicleExisting: vehicleSelected ? true : false,
      isCustomerExisting: customerSelected ? true : false,
      error: null,
      places: [],
      servicePoints: [],
      isLoading: false,
    };
    this.isAlertShowed = false;
  }

  componentDidMount = async () => {
    const { user } = this.context;
    const { data } = this.state;
    try {
      this.setState({ isLoading: true });
      const servicePoints = await getServicePoints();
      const places = await getPlaces();
      this.setState({ 
        data: {
          ...data,
          employee_id: user.employee_id,
        },
        user: user,
        servicePoints,
        places,
      });
    } catch (error) {
      this.setState({ error: 'Se presento un error al cargar los puntos de servicios'})
    } finally {
      this.setState({ isLoading: false });
    }

  }

  handleSubmit = async (data) => {
    const { route: { params: { customerSelected, vehicleSelected }} } = this.props;
    try {
      this.setState({ isLoading: true });
      // REGISTER CUSTOMER
      let customer = {};
      if (customerSelected) {
        customer = await updateCustomer(customerSelected.id, data);
      } else {
        customer = await createCustomer(data);
      }
      // REGISTER VEHICULO
      let vehicle = null;
      if (vehicleSelected) {
        vehicle = vehicleSelected;
      } else {
        vehicle = await createVehicle({
          ...data,
          customer_id: customer.id,
        });
      }

      // REGISTER SERVICE
      let parkingServiceData = {
        customer_id: customer.id,
        vehicle_id: vehicle.id,
        service_point_id: data.service_point_id,
        place_id: data.place_id,
        employee_id: data.employee_id,
      };

      const parkingService = await createParkingService(parkingServiceData);

      Alert.alert(
        'OPERACION EXITOSA',
        'El servicio para ha sido registrado con exito | serial: ' + parkingService.serial,
        [
          {text: 'OK', onPress: () => {
            this.props.navigation.navigate('Services');
          }},
        ],
        {cancelable: false},
      );
      
      
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
          }},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    const { user, isCustomerExisting, isVehicleExisting, data, servicePoints, places, error, isLoading } = this.state;
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView ref='_scrollView' keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, paddingHorizontal: 30 }}>
            {isLoading && <Loader />}
            {user && <Formik
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={values => this.handleSubmit(values)}
              >
                {({ values, errors, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
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
                      disabled={isCustomerExisting ? true : false }
                    />
                    
                    <Input
                      name='document_number'
                      label="Número de documento"
                      value={values.document_number}
                      handleChange={handleChange}
                      error={errors.document_number}
                      disabled={isCustomerExisting ? true : false }
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
                      disabled={isVehicleExisting ? true : false }
                      autoCapitalize="characters"
                    />

                    <Select
                      name='brand'
                      items={brand_list}
                      label="Marca del vehiculo"
                      value={values.brand}
                      handleChange={handleChange}
                      error={errors.brand}
                      disabled={isVehicleExisting ? true : false }
                    />

                    <Input
                      name='color'
                      label="Color del vehículo"
                      value={values.color}
                      handleChange={handleChange}
                      error={errors.color}
                      disabled={isVehicleExisting ? true : false }
                    />

                    <Text style={styles.title}>INFO DEL SERVICIO</Text>

                    <SearcheableSelect
                      label="Sitio al que se dirige el cliente"
                      name="place_id"
                      items={places}
                      error={errors.place_id}
                      handleChange={setFieldValue}
                    />
  
                    <Input
                      label='Observacines'
                      name='observations'
                      multiline
                      numberOfLines={5}
                      value={values.observations}
                      handleChange={handleChange}
                      placeholder="(Opcional)..."
                      error={errors.observations}
                    />
                    
                    <Text style={styles.title}>RESPONSABLE</Text>
                    <SearcheableSelect
                      label="Punto de servicio"
                      name="service_point_id"
                      items={servicePoints}
                      error={errors.service_point_id}
                      handleChange={setFieldValue}
                    />

                    <Input
                      label="Empleado"
                      name='employee'
                      value={user.full_name}
                      handleChange={handleChange}
                      disabled={true}
                    />
                    <Text style={styles.helpText}>Cargo: {user.job_title}</Text>
              
                    <View paddingVertical={5} />
                    {isSubmitting && this.launchAlert(errors)}
                    <Button
                      label="REGISTRAR"
                      handlePress={handleSubmit}
                    />
                   
                    <View paddingVertical={20} />
                  </>
                )}
            </Formik>}
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
  helpText: {
    color: '#969696',
    top: -5,
    // textAlign: "right",
    fontSize: 12,
  }
})

