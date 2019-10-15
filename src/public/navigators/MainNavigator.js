import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../../screens/Home'
import Sider from '../../screens/Drawer'
import Detail from '../../screens/DetailHarga'
import Ndass from '../../components//Header'

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
    Ndass: {
      screen: Ndass,
      navigationOptions: { header: null }
    },
  }
)
const drawer = createDrawerNavigator(
  { AppNavigator }, { contentComponent: Sider }

)

export default createAppContainer(createSwitchNavigator({ drawer }))
