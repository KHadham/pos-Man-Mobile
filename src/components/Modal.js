import React,{Component} from 'react'
import { View,Image   } from 'react-native'
import Modal from "react-native-modalbox";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {angkaRP} from '../public/helpers/helper'
export class ModalComp extends Component {

  render() {
    return (
      <Modal
          isOpen={this.props.visibility}
          swipeToClose
          onClosed={this.props.toggleModal}
          backButtonClose
          animationDuration={333}
          backdropOpacity={0.5}
          useNativeDriver="true"
          position="bottom"
          style={{
            height: 'auto',
            backgroundColor: '#fff',
          }}
        >

          <View
            style={{
              height: 'auto',
              borderWidth:2
            }}
          >
          <Card style={{borderWidth:6}}>
            <CardItem style={{borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2}}  >
              <Text>{this.props.data.item_name}</Text>
            </CardItem>
            <CardItem style={{borderRightWidth:2,borderLeftWidth:2,justifyContent: "center"}} >
              <Image source={{uri: `${this.props.data.item_image}`}} style={{flex:1, marginVertical:-20,width:250,height:250,resizeMode:"contain"}}/>
             </CardItem>
            <CardItem style={{borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2}} footer >
              <Left style={{borderWidth:2}}><Text>text</Text></Left>
              <Body style={{borderWidth:2}}><Text>text</Text></Body>
              <Right style={{borderWidth:2}}><Text>text</Text></Right>
              {/* {this.props.data.price == null || undefined ?
              <Text>harga</Text>
              :
              <Text>{angkaRP(this.props.data.price)}</Text>
            } */}
            </CardItem>
          </Card>
            {/* <List>
              
              <ListItem>
                <Text style={{ color: 'white' }}>Termahal</Text>
              </ListItem>
            </List> */}
            <Button bordered>
              <Text style={{color:"black"}}>Urutkan</Text>
            </Button>

          </View>
        </Modal>
    )
  }
}

export default ModalComp


