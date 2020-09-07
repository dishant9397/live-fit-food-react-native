import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import firebase from "firebase"

import LoginScreen from './Screens/Login'
import LoginPhoneScreen from './Screens/LoginPhoneScreen'
import SignupScreen from './Screens/Signup'
import HomeScreen from './Screens/Home'
import OrderSummaryScreen from './Screens/OrderSummary'
import OrderPickupScreen from './Screens/OrderPickup'
import OrderHistoryScreen from './Screens/OrderHistory'
import { firebaseConfig } from './FirebaseConfig';

const Stack = createStackNavigator()

export default function App() {
  firebase.initializeApp(firebaseConfig)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title:"Login"}}/>
        <Stack.Screen name="LoginPhoneScreen" component={LoginPhoneScreen} options={{title:"Login with Phone"}}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{title:"Register"}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title:"Meals"}}/>
        <Stack.Screen name="OrderSummaryScreen" component={OrderSummaryScreen} options={{title:"Order Summary"}}/>
        <Stack.Screen name="OrderPickupScreen" component={OrderPickupScreen} options={{title:"Order Pickup"}}/>
        <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} options={{title:"Past Orders"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
