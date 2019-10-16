import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

export default function Navbar ({title}){
	const counter = useSelector(state => state.reCart.CartQty)
	
  return (
		<View >
      <Text>Home</Text>
    </View>
	)
}







