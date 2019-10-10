import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

import React from 'react'

const ListHargaDetail = ({ukuran,harga}) => {
  return (
    <ListItem  >
      <Left>
        <Text>ukuran {ukuran}</Text>
      </Left>
      <Body>
        <Text style={{textAlign: 'right'}}>{harga}</Text>
      </Body>
    </ListItem>
  )
}

export default ListHargaDetail
