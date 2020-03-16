import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const textAlign = "right";

const Link = (props) => {
  const { text, align, goTo } = props;
  const navigation = useNavigation();

  const handlePress = () => {
    
    navigation.navigate(goTo);
  }

  return (
    <TouchableHighlight onPress={handlePress}>
      <Text 
        style={styles.textLink}
      >
        {text}
      </Text>
    </TouchableHighlight>
    
  );
};

export default Link;

const styles = StyleSheet.create({
  textLink: {
    color: "#FFFFFF",
    textAlign: textAlign,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
})