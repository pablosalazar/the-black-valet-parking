import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator
} from 'react-native';

const Loader = props => {
  const { loading } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View>
            <ActivityIndicator
              size="large"
              animating={loading} 
              color="#b98700"
              style={{marginBottom: 5}}
            />
            <Text>Procesando ...</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#ffffff',
    height: 100,
    width: '50%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;