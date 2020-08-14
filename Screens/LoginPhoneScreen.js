import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from "firebase"

export default function App({navigation}) {

    const [getPhoneNumber, setPhoneNumber] = useState("")
    const [getCode, setCode] = useState("")
    const [getIsOtpTextEnabled, setIsOtpTextEnabled] = useState(false)
    const [getIsLoginButtonEnabled, setIsLoginButtonEnabled] = useState(true)

    const sendCodeButtonClicked = () => {
        firebase.auth().signInWithPhoneNumber()
        .then((result) => {

        })
        .catch((error) => {

        })
        setIsOtpTextEnabled(true)
        setIsLoginButtonEnabled(false)
    }
        
    const loginButtonClicked = () => {
        firebase.auth().createUserWithEmailAndPassword(getEmail, getPassword)
        .then(() => {
            navigation.navigate("LoginScreen")
        })
        .catch(() => {
            alert("Error creating user; please try after sometime")
        })
    }
  
    return (
      <View style={styles.container}>
            <Text style={styles.text}>Login with Phone Number</Text>
            <TextInput
                style={styles.textInput}
                keyboardType="default"
                placeholder="Please enter your phone number here"
                onChangeText={value => setPhoneNumber(value)}
                value={getPhoneNumber}
            />
            <Button 
                title="Send Code" 
                onPress={sendCodeButtonClicked}
            />
            <TextInput
                editable={getIsOtpTextEnabled}
                style={styles.textInput}
                keyboardType="default"
                placeholder="Please enter otp here"
                onChangeText={value => setCode(value)}
                value={getCode}
            />
            <Button 
                disabled={getIsLoginButtonEnabled}
                title="Login" 
                onPress={loginButtonClicked}
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
    text: {
        fontSize:30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:20,
    },
    textInput: {
        marginTop:15,
        borderColor: '#000',
        width: '70%',
        padding:5,
        borderWidth: 1.5,
        textAlign:'center',
        marginBottom:15,
    },
  });
