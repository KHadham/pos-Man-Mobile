import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Icon, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Content } from 'native-base';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModalComp from '../components/Modal'
import { getAllItem } from '../public/redux/actions/item'
import { angkaRP } from '../public/helpers/helper'

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(false);

  let menuState, transformedArray, stickyHead = []
  menuState = useSelector(state => state.reItem)
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllItem())
    }
    getData()
  }, [])

  transformedArray = menuState.itemList.flatMap(({ items, ...o }) => [o, ...items])

  const RefreshFunc = async () => {
    await setIsLoading(true);
    dispatch(getAllItem())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
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
  transformedArray.map(obj => {
    if (obj.price == null) {
      stickyHead.push(transformedArray.indexOf(obj));
    }
  });
  stickyHead.push(0);
  console.log('menu state', menuState)
  console.log('objectsss', transformedArray)
  console.log('keHead', stickyHead)

  const renderItem = ({ item }) => {
    if (item.price == null) {
      return (
        <ListItem style={{ borderWidth: 1, borderColor: "black", height: 20 }} itemDivider>
          <Text>{item.category_name}</Text>
        </ListItem>
      );
    } else {
      return (
        <ListItem  thumbnail>
          <Left style={{ marginLeft: "-2%" }} onPress={() => alert("asd")} >
            <Thumbnail square source={{ uri: `${item.item_image}` }} />
          </Left>
          <Body  >
            <TouchableOpacity onPress={() => modalHandle(item)}>
              <Text>{item.item_name}</Text>
              <Text note>{angkaRP(item.price)}</Text>
            </TouchableOpacity>
          </Body>
          <Right  >
            <View style={{ marginVertical: -15 }} >
              {/* <View >
                <Text style={{ flexDirection: 'row',marginRight: -10,alignSelf: "flex-end" }}>Total price : xxxxx</Text>
              </View>
              <View style={{ flexDirection: 'row', marginRight: -10, marginBottom: 0 }}>
                <Button style={{ margin: 2 }} small success>
                  <Icon name='add' />
                </Button>
                <Button style={{ margin: 2 }} small disabled >
                  <Text>10</Text>
                </Button>
                <Button style={{ margin: 2 }} small success>
                  <Icon name='remove' />
                </Button>
              </View> */}
              <View style={{right:"-10%"}}>
                <Button style={{height:20}} small success>
                  <Text>tambah</Text>
                </Button>
              </View>
            </View>
          </Right>
        </ListItem>
      );
    }
  }
  return (
    <>
      <Container>
          <Header buttonFunc={() => navigation.toggleDrawer()} title="Menu List" />
          {
            menuState.isLoading ?
              <>
                <ActivityIndicator style={{ marginTop: "10%" }} size="large" color="#0000ff" />
                <ScrollView />
              </>
              :
              // <Text>hello</Text>
              <FlatList
                refreshing={isLoading}
                onRefresh={RefreshFunc}
                data={transformedArray}
                renderItem={renderItem}
                // keyExtractor={item => item.index}
                stickyHeaderIndices={stickyHead}
              />
          }
          <Footer modalTrigger={() => modalHandle()} />
      </Container>
      <ModalComp data={dataModal} toggleModal={() => toggleModal()} visibility={isModalVisible} />
    </>
  )
}
