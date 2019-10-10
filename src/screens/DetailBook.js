import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';

import {connect} from 'react-redux';;
import {getColor, postKategori} from '../public/redux/actions/kategori';;

class Register extends Component {
  constructor(props) {
    super(props);;
    this.state = {
      data: props.navigation.getParam('data'),
    };;
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.state.data.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{this.state.data.text}</Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>{this.state.data.category_name}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    kategoriP: state.reKategori.ListKategori.result,,
  };;
};;

export default connect(mapStateToProps)(Register);
;
