import React, { Component, useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAllItem } from '../public/redux/actions/item'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadings, setIsLoadings] = useState(true);

  let menuState, transformedArray, stickyHead = []
  menuState = useSelector(state => state.reItem.itemList)
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getAllItem())
  }, [])

  setTimeout(() => {
    setIsLoadings(false);
  }, 3000);

  transformedArray = menuState.flatMap(({ items, ...o }) => [o, ...items])
  const angkaRP = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  };

  const RefreshFunc = async () => {
    await setIsLoading(true);
    dispatch(getAllItem())
      .then(() => {
        setIsLoading(false);
        // menuState = useSelector(state => state.reItem.itemList)
      })
      .catch((error) => {
        alert(error)
      })
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
        <ListItem itemDivider>
          <Text>{item.category_name}</Text>
        </ListItem>
      );
    } else {
      return (
        <ListItem onPress={() => alert("asd")} thumbnail>
          <Left >
            <Thumbnail square source={{ uri: `${item.item_image}` }} />
          </Left>
          <Body >
            <Text>{item.item_name}</Text>
            <Text note>{angkaRP(item.price)}</Text>
          </Body>
          <Right  >
            <Text>=></Text>
            <Text>=></Text>
          </Right>
        </ListItem>
      );
    }
  }
  return (
    <Container>
      <>
        <Header title="Menu List" />
        {
          isLoadings == true ?
            <ActivityIndicator size="large" color="#0000ff" /> :
            <FlatList
              refreshing={false}
              onRefresh={RefreshFunc}
              data={transformedArray}
              renderItem={renderItem}
              // keyExtractor={item => item.index}
              stickyHeaderIndices={stickyHead}
            />
        }

        <Footer />
      </>
    </Container>
  )
}

