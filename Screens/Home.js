import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import firebase from "firebase"
import Meal from './Meal'

export default function App({ route, navigation }) {

  const [getMealList, setMealList] = useState([])
  const email = route.params.email

  const generateMeal = ({item}) => (
      <Meal data = {item} buttonClicked={buttonClicked} />   
  )

  const buttonClicked = (meal) => {
      navigation.push("OrderSummaryScreen", { meal: JSON.stringify(meal), email:email})
  }

  useEffect(() => {
    firebase.firestore().collection("meals").get()
    .then(querySnapshot => {
      const mealList = []
      querySnapshot.forEach(documentSnapshot => {
        mealList.push({
          mealId: documentSnapshot.id,
          mealName: documentSnapshot.data().mealName,
          mealDescription: documentSnapshot.data().mealDescription,
          mealImage: documentSnapshot.data().mealImage,
          mealPrice: documentSnapshot.data().mealPrice,
          mealCalorie: documentSnapshot.data().mealCalorie,
        })
      })
      setMealList(mealList)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <Button 
            title="View Past Orders" 
            onPress={() => {navigation.push("OrderHistoryScreen", {email:email})}}
        />
        <FlatList
            data={getMealList}
            renderItem={generateMeal}
            keyExtractor={meal => meal.mealId}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
});
