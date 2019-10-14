import React, { Component, useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAllItem } from '../public/redux/actions/item'

// if (!Array.prototype.flatMap) {
//   Object.defineProperty(Array.prototype, 'flatMap', {
//     configurable: true,
//     writable: true,
//     value: function flatMap(callback, thisArg = undefined) {
//       return this.reduce((array, ...args) => {
//         const element = callback(...args);

//         if (Array.isArray(element)) array.push(...element);
//         else array.push(element);

//         return array;
//       }, []);
//     }
//   });
// }

// export class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       originalArray: [],
//       transformedArray: [],
//       refreshing: false,
//       headerCategory: []
//     }
//   }
//   componentDidMount = async () => {
//     await this.props.dispatch(getAllItem())
//     await this.setState({
//       originalArray: this.props.itemsProps,
//     })
//     await this.setState({
//       transformedArray: this.state.originalArray.flatMap(({ items, ...o }) => [o, ...items])
//     })
//     await this.filterHead()
    
//     }

//   filterHead = () => {
//     let stickyHead = []
//     this.state.transformedArray.map(obj => {
//       if (obj.price == null) {
//         stickyHead.push(this.state.transformedArray.indexOf(obj));
//       }
//     });
//     stickyHead.push(0);
//     this.setState({
//       headerCategory: stickyHead
//     });
//   }

//   angkaRP = (angka) => {
//     var rupiah = '';
//     var angkarev = angka.toString().split('').reverse().join('');
//     for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
//     return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
//   };

//   // _onRefresh = async () => {
//   //   await this.setState({ refreshing: true });
//   //   this.props.dispatch(getAllItem()).then(() => {
//   //     this.setState({ refreshing: false });
//   //   });
//   // }

//   renderItem = ({ item }) => {
//     if (item.price == null) {
//       return (
//         <ListItem itemDivider>
//           <Text>{item.category_name}</Text>
//         </ListItem>
//       );
//     } else {
//       return (
//         <ListItem onPress={() => alert("asd")} thumbnail>
//           <Left >
//             <Thumbnail square source={{ uri: `${item.item_image}` }} />
//           </Left>
//           <Body >
//             <Text>{item.item_name}</Text>
//             <Text note>{this.angkaRP(item.price)}</Text>
//           </Body>
//           <Right  >
//             <Text>=></Text>
//           </Right>
//         </ListItem>
//       );
//     }
//   }

//   render() {
//     console.log('menu state', this.state.transformedArray)
//     console.log('objectsss', this.props.itemsProps)
//     console.log('keHead', this.state.headerCategory)
//     return (
//       <Container>
//         <>
//           <Header title="Menu List" />
//           <FlatList
//             // refreshing={isLoading}
//             // onRefresh={RefreshFunc}
//             data={this.state.transformedArray}
//             renderItem={this.renderItem}
//             keyExtractor={item => item.index}
//             stickyHeaderIndices={this.state.headerCategory}
//           />
//           <Footer />
//         </>
//       </Container>
//     )


//   }
// }

// const mapStateToProps = state => {
//   return {
//     itemsProps: state.reItem.itemList,
//   }
// }

// export default connect(mapStateToProps)(Home)

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  let menuState, transformedArray, stickyHead = []
  menuState = useSelector(state => state.reItem.itemList)
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getAllItem())
  }, [])

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
      .catch((error)=>{
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
        <FlatList
          refreshing={false}
          onRefresh={RefreshFunc}
          data={transformedArray}
          renderItem={renderItem}
          keyExtractor={item => item.index}
          stickyHeaderIndices={stickyHead}
        />
        <Footer />
      </>
    </Container>
  )
}


