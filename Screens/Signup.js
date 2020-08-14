import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from "firebase";

export default function App({navigation}) {

    const [getEmail, setEmail] = useState("")
    const [getPassword, setPassword] = useState("")

    const signUpButtonClicked = () => {
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
            <Text style={styles.text}>Signup to access account</Text>
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
                title="Register" 
                onPress={signUpButtonClicked}
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
        borderColor: '#000',
        width: '70%',
        padding:5,
        borderWidth: 1.5,
        textAlign:'center',
        marginBottom:15,
    },
  });
