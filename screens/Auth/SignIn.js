import * as React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import * as Yup from 'yup'
import { Formik } from 'formik';
import { Input, Button, Loader, AlertCustom, Link } from '../../components/index';
import AppContext from '../../AppContext';
import { loginUser } from '../../API/AuthService';

import theBlackTheme from '../../constants/Theme';

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
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior="padding" enabled>
      <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>

        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: 180, height: 117, marginBottom: 10 }}
            source={require('../../assets/images/logo.png')}
          />
        </View>
        <Text style={styles.title}>INICIAR SESIÓN</Text>
        {error && <AlertCustom error={error} />}
        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={values => { handleSubmit(values) }}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, handleSubmit, errors }) => (
            <>
              {isLoading &&
                <Loader loading={isLoading} />
              }
              <Input
                name="login"
                value={values.login}
                placeholder="Usuario o correo electrónico"
                autoCapitalize='none'
                handleChange={handleChange}
                lIcon="account-outline"
                error={errors.login}
              />

              <Input
                name="password"
                value={values.password}
                placeholder="Contraseña"
                autoCapitalize='none'
                secureTextEntry
                handleChange={handleChange}
                lIcon="lock-outline"
                error={errors.password}
              />

              <Link
                text="¿Olvidaste tu contraseña?"
                goTo="RecoverPassword"
              />

              <Button
                label="ENTRAR"
                handlePress={handleSubmit}
              />

              <Text style={styles.text}>©2020 The Black</Text>

            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: theBlackTheme.COLORS.PRIMARY,
    marginVertical: 10,
    fontSize: 20,
  },
  text: {
    marginTop: 30,
    color: "#969696",
    textAlign: 'center',
    fontSize: 11,
  }
})