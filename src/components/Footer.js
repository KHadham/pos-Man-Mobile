import React, { Component } from 'react'
import { AsyncStorage as storage, TouchableOpacity, StyleSheet, } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

const FooterFunction = () => {
  
  return (
    <Footer >
    <FooterTab >
      <Button bordered light>
        <Text  >Total</Text>
      </Button>
     
      
    </FooterTab>
  </Footer>
  )
}

export default FooterFunction


const styles = StyleSheet.create({
 
});