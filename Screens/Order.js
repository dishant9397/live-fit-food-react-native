import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

export default function Order(props) {

    return (
        <View style={styles.container}>
            <View
                style={styles.separator}
            >
                <Text style={styles.orderNumber}>#{props.data.orderNumber}</Text>
                <Text style={styles.total}>${props.data.total}</Text>
            </View>
            <View
                style={styles.separator}
            >
                <Text style={styles.orderDate}>{props.data.orderDate}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection:'row',
    },
    separator: {
        width:'50%',
        color:'#000',
        marginLeft:10,
        flexDirection:'column',
    },
    orderNumber: {
       fontSize: 20, 
       color:'#000',
       fontWeight:'bold',
    },
    total: {
        marginTop:5,
        fontSize: 15, 
        color:'green',
        fontWeight:'bold',
    },
    orderDate: {
        textAlign:'right',
        marginRight:20,
        fontSize: 20, 
        color:'red'
    }
  });
