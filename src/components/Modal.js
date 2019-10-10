import React,{Component} from 'react'
import { View,  } from 'react-native'
import Modal from 'react-native-modal'
import { Button,Icon, Text, Container,Header, Item, Input,Footer, FooterTab,List,ListItem,} from 'native-base';

export class ModalComp extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      searchKey:'',
      riwayat:[]
    }
  }

  sendData = (data) => {
    this.props.parentCallback(data)
  }

  searchData = (data) => {
    this.props.searchCallback(data)
  }

  render() {
    return (
      <Modal
      onSwipeComplete={this.props.toggleModal}
      onBackdropPress={this.props.toggleModal}
      isVisible={this.props.visibility}
      swipeDirection='down'
      style={{
        justifyContent: 'flex-end',
        margin: 0
      }}
    >
      {this.props.buttonID == 'filter' ?
        <>
          <View 
            style={{ 
              height: '80%',
              backgroundColor: '#0050ac',
              padding: 16
            }}
          >
      
          <View style={{ height: '10%' }} />
            <Container >
              <Header style={{backgroundColor:"white"}} searchBar rounded>

                <Item>
                  <Input value={this.state.searchKey} onChangeText={searchKey => this.setState({ searchKey: searchKey })} placeholder="Search" />
                  <Icon name="ios-search" />
                </Item>
                <Button transparent>
                  <Text>Cari provinsi</Text>
                </Button>

              </Header>

              <List>
                <ListItem onPress={()=>this.sendData('Terdekat')}>
                  <Text style={{color:'white'}}>Terdekat</Text>
                </ListItem>
              </List>
            </Container>
          </View>

          <Footer>
            <FooterTab>
              <Button onPress={()=>this.searchData('')} bordered light>
                <Text>reset filter</Text>
              </Button>
              <Button onPress={()=>this.searchData(this.state.searchKey)} bordered light >
                <Text>filter lokasi</Text>
              </Button>
            </FooterTab>
          </Footer>
          </>
          :
          <View 
            style={{ 
              height: '33%',
              backgroundColor: '#0050ac',
            }}
          >
            <List>
              <ListItem onPress={()=>this.sendData('Terdekat')}>
                <Text style={{color:'white'}}>Terdekat</Text>
              </ListItem>
              <ListItem>
                <Text onPress={()=>this.sendData('asc')} style={{color:'white'}}>Termurah</Text>
              </ListItem>
              <ListItem>
                <Text onPress={()=>this.sendData('desc')} style={{color:'white'}}>Termahal</Text>
              </ListItem>
            </List>
          
          <Button onPress={this.props.toggleModal} bordered full light>
            <Text>Urutkan</Text>
          </Button>

        </View>
        }
      </Modal>
    )
  }
}

export default ModalComp


