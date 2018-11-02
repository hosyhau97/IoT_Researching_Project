/*
Author: Phan Hong Nam
Email: idlogin97@gmail.com
University: Ha Noi University Of Industry
Green House Home Tab
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ControlTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ horizontal, tintColor }) => {
            return <Ionicons name='md-switch' size={horizontal ? 20 : 25} style={{ color: tintColor }} />
        }, 

        tabBarColor: '#1b9891'
    }    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(15, 87, 83, 0.8)"
                    // barStyle="light-content"
                />
                <View style={styles.header}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Điều khiển</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    }, 
    header: {
        height: 50, 
        backgroundColor: '#1b9891', 
        justifyContent: 'center', 
        alignItems: 'center'
      }, 
});