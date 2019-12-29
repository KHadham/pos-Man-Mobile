import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Icon, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Content } from 'native-base';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModalComp from '../components/Modal'
import { getAllItem } from '../public/redux/actions/item'
import { angkaRP } from '../public/helpers/helper'
import { cartTotalPrice, cartOperator, cartQty, cartInternal, cartTransFormedArray } from '../public/redux/actions/cart';

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(false);
  const [allPrice, setAllPrice] = useState(false);
  const [stateCart, setStateCart] = useState([]);
  const [menuState, setMenuState] = useState([]);

  // let reduxCart, transformedArray, stickyHead = []
  const reduxCart = useSelector(state => state.reCart)
  const dispatch = useDispatch();
  let baru =[]

  useEffect(() => {
    setMenuState(reduxCart.TransformedArray)
  }, [])
    
  baru = reduxCart.TransformedArray.filter(menu=> menu.quantity > 0 )
  console.log('reduxCart', reduxCart.TransformedArray)
  console.log('baru', baru)
  // transformedArray = reduxCart.itemList.flatMap(({ items, ...o }) => [o, ...items])

  const RefreshFunc = async () => {
    dispatch(cartQty(0))
    dispatch(cartOperator("cancel"))
    await setIsLoading(true);

    dispatch(getAllItem())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
        alert(error)
      })
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const modalHandle = (data) => {
    setIsModalVisible(!isModalVisible)
    setDataModal(data)
  }

  // transformedArray.map(obj => {
  //   if (obj.price == null) {
  //     stickyHead.push(transformedArray.indexOf(obj));
  //   }
  // });
  // stickyHead.push(0);

  const increment = async (item) => {
    var id = stateCart.indexOf(item)
    setAllPrice(allPrice - (item.price * (item.quantity - 1))) + (item.price * item.quantity)
    dispatch(cartQty(+1))
    dispatch(cartInternal("inc", id))
    dispatch(cartTotalPrice(allPrice))
    dispatch(cartTransFormedArray(transformedArray))
  }

  const decrement = async (item) => {
    var id = stateCart.indexOf(item)
    setAllPrice(allPrice - item.price)
    dispatch(cartQty(-1))
    dispatch(cartTotalPrice(allPrice))
    dispatch(cartInternal("dec", id))
    dispatch(cartTransFormedArray(transformedArray))
  }

  const nambahKeranjang = async (item) => {

    let index = reduxCart.CartList.indexOf(item)

    if (index === -1) {
      dispatch(cartQty(+1))
      stateCart.push(item)
      item.quantity = 1
      setAllPrice(allPrice + (item.quantity * item.price))
    } else {
      dispatch(cartQty(-item.quantity))
      stateCart.splice(index, 1)
      setAllPrice(allPrice - (item.quantity * item.price))
      item.quantity = 0
    }

    dispatch(cartTotalPrice(allPrice))
    dispatch(cartOperator(stateCart))
  }

  const cancel = () => {
    stateCart.splice(0, [stateCart.length])
    dispatch(cartQty(0))
    dispatch(cartOperator("cancel"))
    dispatch(cartTotalPrice(0))
    transformedArray.map(data => {
      if (data.quantity > 0 ) {
           data.quantity = 0 
      }
  });

  }
  const renderItem = ({ item }) => {
      return (
        <ListItem thumbnail>
          <Left style={{ marginLeft: "-2%" }}  >
            <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
              <Thumbnail square source={{ uri: `${item.item_image}` }} />
            </TouchableOpacity>
          </Left>
          <Body  >
            <TouchableOpacity onPress={() => modalHandle(item)}>
              <Text>{item.item_name}</Text>
              <Text note>{angkaRP(item.price)}</Text>
            </TouchableOpacity>
          </Body>
          <Right  >
            <View style={{ marginVertical: -15 }} >
              {item.quantity == 0 ?
                <View style={{ right: "-10%" }}>
                  <Button onPress={() => nambahKeranjang(item)} style={{ height: 20 }} small success>
                    <Text>tambah</Text>
                  </Button>
                </View> :
                <>
                  <View >
                    <Text style={{ flexDirection: 'row', marginRight: -10, alignSelf: "flex-end" }}>{angkaRP(item.quantity * item.price)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginRight: -10, marginBottom: 0 }}>
                    <Button onPress={() => increment(item)} style={{ margin: 2 }} small success>
                      <Icon name='add' />
                    </Button>
                    <Button style={{ margin: 2 }} small disabled >
                      <Text>{item.quantity}</Text>
                    </Button>
                    <Button onPress={item.quantity == 1 ? () => nambahKeranjang(item) : () => decrement(item)} style={{ margin: 2 }} small success>
                      {item.quantity == 1 ?
                        <Icon name='trash' /> :
                        <Icon name='remove' />
                      }
                    </Button>
                  </View>
                </>
              }
            </View>
          </Right>
        </ListItem>
      )
  }
  return (
    <>
      <Container>
        <Header buttonFunc={() => navigation.toggleDrawer()} title="chart" />
        {/* {
          reduxCart.isLoading ?
            <>
              <ActivityIndicator style={{ marginTop: "10%" }} size="large" color="#0000ff" />
              <ScrollView />
            </>
            :
            // <Text>hello</Text>
            <FlatList
              refreshing={isLoading}
              onRefresh={RefreshFunc}
              data={baru}
              renderItem={renderItem}
              // keyExtractor={item => item.index}
            />
        } */}
        <FlatList
              refreshing={isLoading}
              onRefresh={RefreshFunc}
              data={baru}
              renderItem={renderItem}
              keyExtractor={item => item.index}
            />
        <Footer nav={() => navigation.navigate('Detail')} current={"detail"} hapus={() => cancel()}/>
      </Container>
      <ModalComp data={dataModal} toggleModal={() => toggleModal()} visibility={isModalVisible} />
    </>
  )
}
