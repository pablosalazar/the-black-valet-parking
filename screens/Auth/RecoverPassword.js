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

import theBlackTheme from '../../constants/Theme';

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required('Ingresa tu correo electrónico')
    .email('Ingresa un correo valido'),
})

export default function RecoverPassword() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { signIn } = React.useContext(AppContext);
  
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      
    } catch (error) {
     
      setIsLoading(false);
    } 
  }

  return (
    <KeyboardAvoidingView style={{flexGrow: 1 }} behavior="padding" enabled>
      <View style={{flex: 1, justifyContent: 'center', padding: 30}}>

        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 180, height: 117 }}
            source={require('../../assets/images/logo.png')}
          />
        </View> 
        <Text style={styles.title}>RECUPERAR CONTRASEÑA</Text>
        {error && <AlertCustom error={error} />}
        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={values => {handleSubmit(values)}}
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
                lIcon="email-outline"
                error={errors.login}
              />

              <Link
                text="Volver al inicio de sesión"
                goTo="SignIn"
              />

              <Button
                label="ENVIAR"
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
    marginVertical: 20,
    fontSize: 20,
  },
  text: {
    marginTop: 30,
    color: "#969696",
    textAlign: 'center',
    fontSize: 11
  }
})