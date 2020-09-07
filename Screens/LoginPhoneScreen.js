import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from '../FirebaseConfig'

export default function App({navigation}) {
    const [getPhoneNumber, setPhoneNumber] = useState("")
    const [getCode, setCode] = useState("")
    const [getIsOtpTextEnabled, setIsOtpTextEnabled] = useState(false)
    const [getIsLoginButtonEnabled, setIsLoginButtonEnabled] = useState(true)
    const recaptchaVerifier = React.useRef(null);
    const [getVerificationId, setVerificationId] = React.useState();

    const sendCodeButtonClicked = async () => {
        try {
            const phoneAuthProvider = new firebase.auth.PhoneAuthProvider()
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(getPhoneNumber, recaptchaVerifier.current);
            setVerificationId(verificationId);
        } catch (error) {
            alert("Cannot send OTP")
        }
        setIsOtpTextEnabled(true)
        setIsLoginButtonEnabled(false)
    }

    const confirmCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(getVerificationId, getCode)
            await firebase.auth().signInWithCredential(credential);
            try{
                navigation.push("HomeScreen", {email:getPhoneNumber})
                setPhoneNumber("")
                setCode("")
            } catch(error){
                console.log(error);
            }
            
          } catch (error) {
            console.log(error);
            alert("Incorrect code!");
          }
    }
        
    return (
      <View style={styles.container}>
          <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
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
                placeholder="Please enter otp here"
                onChangeText={value => setCode(value)}
                value={getCode}
            />
            <Button 
                disabled={getIsLoginButtonEnabled}
                title="Login" 
                onPress={confirmCode}
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
