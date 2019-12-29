import React, { useState, useEffect } from 'react';
import { AsyncStorage as storage, Animated, StyleSheet, Easing } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'

const FooterFunction = ({ nav, hapus, current }) => {
  const [value] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      value,
      {
        toValue: 1,
        duration: 5000,
        easing : Easing.bounce
      }
    ).start();
  }, [])

  let bottom = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-1000, 0],
  });
  const cartState = useSelector(state => state.reCart)
  console.log('objectfoot', cartState)
  if (cartState.CartQty == 0) {
    return (
      <></>
    )
  } else {
    if (current == "detail") {
      return (
        <Footer style={{ backgroundColor: "white", borderWidth: 1 }} >
          <FooterTab style={{ backgroundColor: "white" }} >
            <Button onPress={nav} iconRight>
              <Animated.Text style={{ color: "red", opacity: value, }}  >Bayar {cartState.CartQty }</Animated.Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    } else {
      return (
          <Footer  >
            <FooterTab style={{ borderWidth: 2 ,backgroundColor:'white'}} >
              <Button onPress={nav} iconRight>
                <Text style={{ color: "black" }}  >Total : {cartState.CartQty}</Text>
              </Button>

              <Button onPress={hapus} iconRight>
                <Text style={{ color: "black" }}  >cancel </Text>
              </Button>

            </FooterTab>
          </Footer>
      )
    }
  }
}


export default FooterFunction


const styles = StyleSheet.create({

});