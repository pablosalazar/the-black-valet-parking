import React, { Component, Fragment} from 'react';
import { 
  Image,
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements'
import * as Yup from 'yup'
import { Formik } from 'formik';

import AppContext from '../AppContext';
import { loginUser } from '../API/AuthService';

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .label('Login')
    .required('Ingresa tu usuario o correo electrónico'),
  password: Yup.string()
    .label('Password')
    .required('Ingresa tu contraseña')
    .min(4, 'la contraseña debe tener al menos 6 letras')
})

export default function SignIn() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { signIn } = React.useContext(AppContext);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginUser(values);
      signIn();
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Error inesperado');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{flexGrow: 1 }} behavior="padding" enabled>
      <View style={{flex: 1, justifyContent: 'center', padding: 30}}>

        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 180, height: 117 }}
            source={require('../assets/images/logo.png')}
          />
        </View> 
        <Text style={styles.title}>INGRESAR</Text>
        {error && (
          <View style={styles.alertDanger}>
            <Text style={styles.textDanger}>{error}</Text>
          </View>
        )}
        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={values => {handleSubmit(values)}}
          validationSchema={validationSchema}
          validateOnChange={false}
        >
          {({ handleChange, values, handleSubmit, errors }) => (
            <Fragment>
              <TextInput 
                name="login"
                value={values.login}
                placeholder="Ingresa tu usuario o correo electrónico"
                autoCapitalize='none'
                onChangeText={handleChange('login')}
                style={styles.textInput}
              />
              <Text style={styles.errorText}>{errors.login}</Text>
              <TextInput
                name="password"
                value={values.password}
                placeholder="Enter password"
                autoCapitalize='none'
                secureTextEntry
                onChangeText={handleChange('password')}
                style={styles.textInput}
              />
              <Text style={styles.errorText}>{errors.password}</Text>
              {isLoading &&
                  <Text style={styles.textPrimary}>Procesando ...</Text>
              }
              {!isLoading &&
                <Button
                  buttonStyle={styles.buttonPrimary}
                  title="ENTRAR"
                  onPress={handleSubmit}
                />
              }
            </Fragment>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
  
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#b98700',
    marginVertical: 20,
    fontSize: 20,
  },
  textInput: {
    height: 40,
    color: '#969696',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#b98700',
  },
  buttonPrimary: {
    backgroundColor: "#b98700",
    marginTop: 10,
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