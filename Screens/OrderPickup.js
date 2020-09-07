import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"
import { getDistance } from 'geolib';
import moment from "moment";
import firebase from "firebase"

export default function App({route, navigation}) {

  const [getMyCurrentLocation, setMyCurrentLocation] = useState({
    "latitude": 0,
    "longitude": 0,
  })
  const STORE_LOCATION = {"latitude": 43.7022, "longitude":-79.5290}
  const [getIsButtonDisabled, setIsButtonDisabled] = useState(true)
  const [getStatus, setStatus] = useState("")
  const [getStatusColor, setStatusColor] = useState("red")
  let startTimer

  const subscribeToLocationChanges = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
    else {
      await Location.watchPositionAsync({}, locationChangesCallback)
    }
  }

  const locationChangesCallback = (location) => {
    setMyCurrentLocation({"latitude": location.coords.latitude, "longitude": location.coords.longitude,})
  }

  const calculateDistance = () => {
    const myLocation = {"latitude": getMyCurrentLocation.latitude, "longitude":getMyCurrentLocation.longitude}
    let distance = getDistance({latitude: myLocation.latitude, longitude: myLocation.longitude}, {latitude: STORE_LOCATION.latitude, longitude: STORE_LOCATION.longitude}, 1)
    if (distance<=100) {    
      setStatusColor("red")
      setStatus("You can pickup order after 15 minutes")
      startTimer = setTimeout(() => {
        setStatusColor("green")
        setStatus("You order is ready to pickup")
        setIsButtonDisabled(false)
      }, (1000 * 15 * 60))
    }
    else {
      setStatus("")
      setIsButtonDisabled(true)
    }
  }

  const saveData = () => {
    clearInterval(startTimer)
    const email = route.params.email
    const orderNumber = route.params.orderNumber
    const total = route.params.total
    const date = moment(new Date()).format("MM-DD-YYYY")
    firebase.firestore().collection("orders").add({
      email: email,
      orderNumber: orderNumber,
      total:total,
      orderDate:date,
    })
    .then(() => {
      navigation.navigate("HomeScreen", {email:email})
    })
  }

  useEffect(() => { 
    subscribeToLocationChanges()
  }, [])

  useEffect(() => { 
    calculateDistance()
  }, [getMyCurrentLocation])

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapView}
        region={{
          latitude:getMyCurrentLocation.latitude,
          longitude:getMyCurrentLocation.longitude,
          latitudeDelta:0.01,
          longitudeDelta:0.01
        }}
        showsUserLocation={true}
      >
       <Marker
          coordinate={{latitude:STORE_LOCATION.latitude, longitude:STORE_LOCATION.longitude}}
          title={"Store Location"}
          description={"This is LiveFitFood Store"}
       /> 
      </MapView>
      <Text
        style={{color:getStatusColor, fontSize:18}}
      >{getStatus}</Text>
      <Button 
        title="Order Picked" 
        disabled={getIsButtonDisabled}
        onPress={saveData}
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView:{
    flex:1,
    width:'100%',
    marginBottom:10,
  },
});
