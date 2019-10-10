import React, { Component } from 'react'
import {  View, AsyncStorage as storage, TouchableOpacity, StyleSheet ,Dimensions } from 'react-native'
import HeaderComp from '../components/Header'
import { Button,Content, Text, Container, Body, Right,Left, List, ListItem,} from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
const screenWidth = Dimensions.get('window').width

import moment from "moment";
import ListCopmonent from '../components/ListHargaDetail'
export class DetailHarga extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      data: props.navigation.getParam('data'),
    }
  }

  angkaRP = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  };

  render() {
    const item = this.state.data
    const {creator,species,region } = this.state.data
    const data = {
      labels: ['size 50', 'size 60', 'size 70', 'size 80', 'size 90', 'size 100'],
      datasets: [{
        data: [ item.size_50, item.size_60, item.size_70, item.size_80, item.size_90, item.size_100 ],
        color: (opacity = 1) => `rgba(26, 119, 223, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }]
    }
    const chartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2 // optional, default 3
    }
    return (
    <Container>
      <Content>
        <HeaderComp title='Detail Harga ' subtitle="Udang"/>

        <List>
          <ListItem  itemDivider />

          <ListItem>
            <Body>
              <Text note numberOfLines={1}>species : {species.name}</Text>
              {
                region.regency_name == null || '' ? 
                <Text style={{color:'#1a77df'}}>{region.province_name} </Text>  :
                <Text style={{color:'#1a77df'}}>{region.regency_name},{region.province_name} </Text>
              }
              
            </Body>  
          </ListItem>

          <ListItem  itemDivider />

          <ListCopmonent ukuran='100' harga={item.size_100 != null || '' ? this.angkaRP(item.size_100) : 'no data'}/>
          <ListCopmonent ukuran='90'  harga={item.size_90  != null || '' ? this.angkaRP(item.size_90)  : 'no data'}/>
          <ListCopmonent ukuran='80'  harga={item.size_80  != null || '' ? this.angkaRP(item.size_80)  : 'no data'}/>
          <ListCopmonent ukuran='70'  harga={item.size_70  != null || '' ? this.angkaRP(item.size_70)  : 'no data'}/>
          <ListCopmonent ukuran='60'  harga={item.size_60  != null || '' ? this.angkaRP(item.size_60)  : 'no data'}/>
          <ListCopmonent ukuran='50'  harga={item.size_50  != null || '' ? this.angkaRP(item.size_50)  : 'no data'}/>

          <ListItem  itemDivider />

          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />

          <ListItem itemDivider />

          <ListItem  >
            <Body>
              <Text note >Catatan :</Text>
              <Text>Harga dapat berubah sewaktu-waktu</Text>
            </Body>
          </ListItem>

          <ListItem  itemDivider />
          
          <ListItem  >
            <Body>
              <Text note >Di edit pada : </Text>
              <Text>{moment(creator.created_at).format("DD MMMM,YYYY")} oleh {creator.name}</Text>
            </Body>
          </ListItem>
        </List>

      </Content>
    </Container>
    )
  }
}

export default DetailHarga
