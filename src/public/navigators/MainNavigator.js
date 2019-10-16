import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../../screens/Home'
import Sider from '../../screens/Drawer'
import Detail from '../../screens/DetailHarga'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        gesturesEnabled: true,
      },
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        header: null,
        gesturesEnabled: true,
      },
    },
    Sider: {
      screen: Sider,
      navigationOptions: { header: null }
    },
  
  }
)
const drawer = createDrawerNavigator(
  { AppNavigator },{ contentComponent: Detail,
      drawerWidth:200,drawerPosition: "left" }
) 
const right = createDrawerNavigator(
  { drawer },{ contentComponent: Sider,
    drawerWidth:200,drawerPosition: "right" }
)
export default createAppContainer(createSwitchNavigator({ right }))
