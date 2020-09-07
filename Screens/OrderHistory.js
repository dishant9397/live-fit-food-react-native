import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import Order from './Order'
import firebase from "firebase"

export default function App({route, navigation}) {

  const [getOrderList, setOrderList] = useState([])
  const email = route.params.email

  const generateOrder = ({item}) => (
    <Order data = {item}/>   
  )

  useEffect(() => {
    firebase.firestore().collection("orders").where("email", "==", email).get()
    .then(querySnapshot => {
      const orderList = []
      querySnapshot.forEach(documentSnapshot => {
        orderList.push({
          orderId:documentSnapshot.id,
          orderNumber: documentSnapshot.data().orderNumber,
          email: documentSnapshot.data().email,
          total: documentSnapshot.data().total,
          orderDate: documentSnapshot.data().orderDate,
        })
        setOrderList(orderList)
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
            data={getOrderList}
            renderItem={generateOrder}
            keyExtractor={order => order.orderId}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
