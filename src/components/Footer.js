import React, { Component } from 'react'
import { AsyncStorage as storage, TouchableOpacity, StyleSheet, } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

const FooterFunction = ({modalTrigger}) => {
  
  return (
    <Footer style={{backgroundColor:"white" ,borderWidth:1}} >
    <FooterTab style={{backgroundColor:"white"}} >
      <Button onPress={modalTrigger}  iconRight>
        <Text style={{color:"black"}}  >Total</Text>
      </Button>
    </FooterTab>
  </Footer>
  )
}

export default FooterFunction


const styles = StyleSheet.create({
 
});