import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

export default function Meal(props) {

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => props.buttonClicked(props.data)}>
            <View>
                <Image
                    source={{url: props.data.mealImage}}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View
                style={styles.separator}
            >
                <Text style={styles.mealName}>{props.data.mealName}</Text>
                <Text style={styles.mealPrice}>${props.data.mealPrice}</Text>
                <Text style={styles.mealCalorie}>{props.data.mealCalorie} Calories</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection:'row',
    },
    image: {
        width:100,
        height:100,
    },
    separator: {
        marginLeft:10,
    },
    mealName: {
       fontSize: 28, 
       color:'#000',
       fontWeight:'bold',
    },
    mealPrice: {
        marginTop:7,
        fontSize: 25, 
        color:'green',
        fontWeight:'bold',
    },
    mealCalorie: {
        marginTop:7,
        fontSize: 20, 
        color:'red'
    }
  });
