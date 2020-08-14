import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from "firebase";

export default function App({navigation}) {

  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")

  const loginButtonClicked = () => {
    firebase.auth().signInWithEmailAndPassword(getEmail, getPassword)
    .then(() => {
        navigation.navigate("HomeScreen", {email: getEmail})
    })
    .catch(() => {
        alert("Please check the login details!")
    });
  }

  return (
    <View style={styles.container}>
        <Image 
            style={styles.image}
            resizeMode="contain"
            source={require('../images/logo.png')}
        />
        <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="Please enter your email here"
            onChangeText={value => setEmail(value)}
            value={getEmail}
        />
        <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            keyboardType="default"
            placeholder="Please enter your password here"
            onChangeText={value => setPassword(value)}
            value={getPassword}
        />
        <Button 
            title="Login" 
            onPress={loginButtonClicked}
        />
        <Button 
            title="Login with Phone Number" 
            onPress={() => {navigation.push("LoginPhoneScreen")}}
        />
        <Button 
            title="New User? Create an account" 
            onPress={() => {navigation.push("SignupScreen")}}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    height: 250,
    marginBottom: 20,
    marginTop: 20,
  },
  textInput: {
    borderColor: '#000',
    width: '70%',
    padding:5,
    borderWidth: 1.5,
    textAlign:'center',
    marginBottom:15,
  },
});
