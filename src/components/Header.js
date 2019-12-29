import React, { Component } from 'react';
import {  Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

const Ndass = ({ title, buttonFunc,personIcon }) => {
  return (
    <Header style={{backgroundColor:"white"}}>
      <Left style={{flex:1}}>
        <Button bordered onPress={buttonFunc} transparent>
          <Icon style={{color:"black"}} name='menu' />
        </Button>
      </Left>
      <Body style={{flex:1}}>
        <Title style={{alignSelf:"center",color:"black" }}>{title}</Title>
      </Body>
      <Right  style={{flex:1}}>
        <Button onPress={personIcon} transparent>
          <Icon style={{color:"black"}} name='person' />
        </Button>
      </Right>
    </Header>
  )
}

export default Ndass

