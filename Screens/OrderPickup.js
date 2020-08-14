import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"

export default function App({navigation}) {

  const [getCurrentLocation, setCurrentLocation] = useState({
    "latitude": 43.7022,
    "longitude": -79.5290,
    "latitudeDelta": 0.01,
    "longitudeDelta": 0.01,
  })
  const [getIsButtonDisabled, setIsButtonDisabled] = useState(true)
  const [changing, setChanging] = useState("")

  const subscribeToLocationChanges = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
    else {
      await Location.watchPositionAsync({timeInterval:1000}, locationChangesCallback);
    }
  }

  const locationChangesCallback = (location) => {
    alert("Done")
    setChanging(location.latitude)
    setCurrentLocation({"latitude": 45.44, "longitude": 45.45, "latitudeDelta": 0.009, "longitudeDelta": 0.001,})
  }

  const calculateDistance = () => {
    setCurrentLocation({"latitude": 45.44, "longitude": 45.45, "latitudeDelta": 0.009, "longitudeDelta": 0.001,})
  }

  useEffect(() => {
    subscribeToLocationChanges()
  }, [])

  useEffect(() => {
    calculateDistance()
  },[getCurrentLocation])

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude:getCurrentLocation.latitude,
          longitude:getCurrentLocation.longitude,
          latitudeDelta:getCurrentLocation.latitudeDelta,
          longitudeDelta:getCurrentLocation.longitudeDelta
        }}
      >
       <Marker
          coordinate={{latitude:getCurrentLocation.latitude, longitude:getCurrentLocation.longitude}}
          title={"Store Location"}
          description={"This is LiveFitFood Store"}
       /> 
      </MapView>
      <Text>{changing}</Text>
      <Button 
        title="Order Picked" 
        disabled={getIsButtonDisabled}
        onPress={() => {navigation.navigate("HomeScreen")}}
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
  }
});
