import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView } from 'react-native'
import { Form, Item, Header, Left, Body, Right, Title, Subtitle, Input, Button, Text, Icon, Label, Container, Toast, Row, Picker, Textarea, View } from 'native-base'
import ImagePicker from 'react-native-image-picker'

// import redux
import { connect } from 'react-redux'
import { getKategory } from '../public/redux/actions/kategori'
import { postNote } from '../public/redux/actions/note'


class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: '',
            title:'',
            id_category: '',
            selected: undefined,
            kategoriS:[]
        }
    }

    componentDidMount = async () => {
			await this.props.dispatch( getKategory() )
			
			this.setState({	kategoriS: this.props.kategoriP })
		}
		
    Post =() => {
      var text = this.state.text
      var title = this.state.title
      var id_category = this.state.id_category
      var data = {
        text,title,id_category
      }

      this.props.dispatch(postNote(data))

      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
        ],
        {cancelable: false},
      );
     
      
    }


    render() {
      console.log("text",this.state.text)
      console.log("title",this.state.title)
      console.log("id_category",this.state.id_category)
      return (
        <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add note</Title>
            <Subtitle>Add note juga</Subtitle>
          </Body>
          <Right>
            <Button onPress={() => this.Post()} transparent>
              <Icon name='checkmark-circle-outline' />
            </Button>
          </Right>
        </Header>
      
        <View style={styles.root} >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Form style={{ marginHorizontal: 20, marginVertical: 20 }}>
              <Item  regular>
              
                <Input style={{  color: 'black' }} onChangeText={title => this.setState({ title: title })} placeholder=" add title" />
              </Item>

              <Textarea style={{ marginTop: 10 }} onChangeText={text => this.setState({ text: text })} rowSpan={12} bordered placeholder=" add deskripsion" />

              <Item regular style={{ marginTop: 10 }}>
								<Picker
									mode="dropdown"
									placeholder="Pilih kategori..."
									placeholderStyle="black"
									placeholderIconColor="black"
									style={{ paddingLeft: 20, color: 'black' }}
									selectedValue={this.state.id_category}
									onValueChange={(selected) => {
                    this.setState({
                        id_category: selected
                    })
									}}
							  >
									{
										this.state.kategoriS.map(item => (
													<Picker.Item label={'category ' +item.category_name } value={item.id_category} />
											))
									}
								</Picker>
              </Item>

              <Button  style={{ marginTop: 10,backgroundColor:'white' }} >
                <Text style={{ width: '100%', textAlign: 'center', }}></Text>
              </Button>
            </Form>
          </ScrollView>
        </View>
        </Container>
      )
    }
}

const mapStateToProps = state => {
    return {
        kategoriP: state.reKategori.ListKategori.result
    }
}

export default connect(mapStateToProps)(Register)
const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  staticImage:{
    width: "100%",
    height:200,
    marginTop: 10,
		justifyContent: 'center',
    alignItems: 'center',
  }
})
