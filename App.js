import React, { Component } from 'react'
import Navigator from './src/public/navigators/MainNavigator'
import axios from 'axios';
import store from './src/public/redux/store'
import { Provider as StoreProvider } from 'react-redux'

export default class App extends Component {
  render() {
    axios.defaults.headers.common["authorization"] = "wikwik"

    return (
    
       <StoreProvider store={store}>
        <Navigator  />
      </StoreProvider>
    )
  }
}

