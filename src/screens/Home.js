import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import Header from '../components/Header'
import { getAllItem } from '../public/redux/actions/item'

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItem())
  }, [])
  const menuState = useSelector(state => state.reItem.itemList)

  return (
    <Container>
      <Header title="Menu List" />
      <Content>
        <List>

          <FlatList
            data={menuState}
            keyExtractor={item => item.id_item}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity >
                  {item.id_category == 1 ?
                    <ListItem itemDivider>
                      <Text>Makanan</Text>
                    </ListItem>:
                    item.id_category == 2 ?
                    <ListItem itemDivider>
                      <Text>Minuman</Text>
                    </ListItem>:
                    <ListItem itemDivider>
                    <Text>Cemilan</Text>
                  </ListItem>
                }
                  <ListItem onPress={() => this.props.navigation.navigate('DetailHarga', { data: item })} thumbnail>
                    <Left>
                      <Thumbnail square source={{ uri: `${item.item_image}` }} />
                    </Left>
                    <Body>
                      <Text>{item.item_name}</Text>
                    </Body>
                    <Right>
                      <Text>{item.price}</Text>
                    </Right>
                  </ListItem>
                </TouchableOpacity>
              );
            }}
          />
        </List>
      </Content>
    </Container>
  )
}







