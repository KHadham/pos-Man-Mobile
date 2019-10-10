import React, { Component } from 'react';
import {  Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Text, View } from 'react-native'
const Ndass = ({ title, subtitle }) => {
  return (
    <Header>
      <Left style={{flex:1}}>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body style={{flex:1}}>
        <Title style={{alignSelf:"center" }}>{title}</Title>
      </Body>
      <Right style={{flex:1}}>
        <Button transparent>
          <Icon name='person' />
        </Button>
      </Right>
    </Header>
  )
}

export default Ndass

