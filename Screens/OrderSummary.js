import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, SegmentedControlIOS } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function App({ route, navigation }) {
  
  const meal = JSON.parse(route.params.meal)
  const email = route.params.email

  const [getRandomNumber, setRandomNumber] = useState(0)
  const [getTipIndex, setTipIndex] = useState(-1)
  const [getIsDisabled, setIsDisabled] = useState(false)
  const [getTip, setTip] = useState(0)
  const [getTotal, setTotal] = useState(meal.mealPrice*1.13)

  const generateRandomNumber = () => {
      setRandomNumber(Math.floor(Math.random()*1000000)+1)
  }

  const changeText = (value) => {
    const total = meal.mealPrice*1.13
    setTip(value)
    setTotal(total+(total*value/100))
  }

  const changeSelectedIndex = (event) => {
    const selectedIndex = event.nativeEvent.selectedSegmentIndex
    const total = meal.mealPrice*1.13
    if(selectedIndex === 3) {
      setIsDisabled(true)
      setTotal(total)
    }
    else {
      setIsDisabled(false)   
      setTip(parseInt(event.nativeEvent.value))
      setTotal(total+(total*parseInt(event.nativeEvent.value)/100))
    }
    setTipIndex(selectedIndex)
  }

  useEffect(() => {
    generateRandomNumber()
  },[])

  return (  
    <View style={styles.container}>
      <Text style={styles.orderDetail}> Order Receipt</Text>
      <Text style={styles.orderNumber}>Order Number: {getRandomNumber}</Text>
      <Text style={styles.details}>Meal Name: {meal.mealName}</Text>
      <Text style={styles.details}>Price: ${meal.mealPrice}</Text>
      <Text style={styles.details}>Tax: ${(meal.mealPrice * 0.13).toFixed(2)}</Text>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.details}>Tip(%):</Text>
        <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={value => changeText(value)}
            value={getTip}
            editable={getIsDisabled}
      />
      </View>
      <SegmentedControlIOS
        style={styles.tipSegment}
        values={['10', '15', '20', 'Other']}
        selectedIndex={getTipIndex}
        onChange={(event) => changeSelectedIndex(event)}
      />
      <Text style={styles.totalAmount}>Total: ${getTotal.toFixed(2)}</Text>
      <Button 
        title="Pickup Order" 
        onPress={() => {navigation.push("OrderPickupScreen")}}
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderDetail: {
    textAlign:'center',
    fontSize:35,
    fontWeight:'bold',
    marginTop:10,
  },
  orderNumber: {
    fontWeight:'bold',
    fontSize:25,
    color:'green',
    marginTop:10,
    marginLeft:20,
  },
  details: {
    fontSize:20,
    marginTop:5,
    marginLeft:20,
  },
  totalAmount: {
    fontWeight:'bold',
    fontSize:40,
    marginTop:10,
    marginLeft:20,
  },
  tipSegment: {
    marginTop:8,
    marginLeft:20,
    marginRight:20,
  },
  textInput: {
    flex:1,
    borderColor: '#000',
    padding:5,
    borderWidth: 1.5,
    textAlign:'center',
    marginLeft:5,
    marginRight:20,
    marginTop:5,
},
});
