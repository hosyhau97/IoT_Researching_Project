/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House User Tab
*/
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UserTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, horizontal, tintColor}) => {
            return <Ionicons name='md-contact' size={horizontal ? 20 : 25} style={{ color: tintColor }} />
        }, 
        tabBarColor: '#22c3bb'
    }    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(15, 87, 83, 0.8)"
                    //barStyle="light-content"
                />
                <View style={styles.header}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                    Người dùng</Text>
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
        backgroundColor: '#22c3bb', 
        justifyContent: 'center', 
        alignItems: 'center'
      }, 
});