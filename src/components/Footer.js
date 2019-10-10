import React, { Component } from 'react'
import { AsyncStorage as storage, TouchableOpacity, StyleSheet, } from 'react-native'
import {  Footer,FooterTab,Icon, Text, } from 'native-base';

const FooterFunction = ({modalFilter,modalSort,filterStatus,sortStatus}) => {
  
  return (
    <Footer>
      <FooterTab>

        <TouchableOpacity onPress={modalFilter}  style={styles.button}>
          <Icon type={"Ionicons"} name={"md-funnel"} style={styles.icon2} />
          <Text style={styles.text2}>Filter Lokasi</Text>
          {
            filterStatus == '' || null ? 
            <Text style={styles.subtextkiri}>belum mencari </Text> :
            <Text style={styles.subtextkiri}>{filterStatus} diterapkan</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPressOut={modalSort}  style={styles.button2}>
          <Icon type={"FontAwesome5"} name={"sort-amount-down"} style={styles.icon3} />
          <Text style={styles.text4}>Urutkan</Text>
          <Text style={styles.subtextkanan}>{sortStatus}</Text>
        </TouchableOpacity>
        
      </FooterTab>
    </Footer>
  )
}

export default FooterFunction


const styles = StyleSheet.create({
  button: {
    top: "0%",
    left: "0%",
    width: "50%",
    height: "100%",
    position: "absolute"
  },
  icon2: {
    left: "9.6%",
    position: "absolute",
    color: "rgba(250,250,250,1)",
    fontSize: 40,
    width: "18.66%",
    height: "71.43%",
    top: "14.28%"
  },
  text2: {
    top: "12.5%",
    left: "33.34%",
    width: "60.26%",
    height: "40%",
    color: "rgba(250,250,250,1)",
    position: "absolute",
    fontSize: 20
  },
  subtextkiri: {
    top: "65%",
    left: "33.34%",
    width: "60.26%",
    height: "28.57%",
    color: "rgba(250,250,250,1)",
    position: "absolute",
    fontSize: 12
  },
  button2: {
    top: "0%",
    left: "50%",
    width: "50%",
    height: "100%",
    position: "absolute",
    backgroundColor:"#1a77df"
  },
  icon3: {
    left: "9.6%",
    position: "absolute",
    color: "rgba(250,250,250,1)",
    fontSize: 40,
    width: "18.66%",
    height: "71.43%",
    top: "14.28%"
  },
  text4: {
    top: "12.5%",
    left: "33.34%",
    width: "60.26%",
    height: "40%",
    color: "rgba(250,250,250,1)",
    position: "absolute",
    fontSize: 20
  },
  subtextkanan: {
    top: "65%",
    left: "33.34%",
    width: "60.26%",
    height: "28.57%",
    color: "rgba(250,250,250,1)",
    position: "absolute",
    fontSize: 12
  },
  FlatList: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "black",
    margin: 15,
    borderRadius: 8,
    elevation: 6,
    width: 145,
    height: 215
  }
});