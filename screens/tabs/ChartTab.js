/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Chart Tab
*/
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SensorChartTab from './SensorChartTab';
import ControlChartTab from './ControlChartTab';
import { createMaterialTopTabNavigator } from 'react-navigation';

export default class ChartTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, horizontal, tintColor}) => {
            return <Ionicons name='md-analytics' size={horizontal ? 20 : 25} style={{ color: tintColor }} />
        }, 

        tabBarColor: '#1fada6'
    }
    render() {
        return (
            <ChartNavigator />
        );
    }
}

const ChartNavigator = createMaterialTopTabNavigator({
    Sensor: { screen: SensorChartTab },
    Control: { screen: ControlChartTab },
  }, {
    initialRouteName: 'Sensor',
    activeColor: '#fff',
    inactiveColor: 'rgba(255, 255, 255, 0.8)',
    tabBarOptions: {
        labelStyle: {
          fontSize: 13,
        },
        indicatorStyle: {
            backgroundColor: 'white'
        },
        style: {
          backgroundColor: '#1fada6',
        },
      }
  });

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    }, 
    header: {
        height: 50, 
        backgroundColor: '#1fada6', 
        justifyContent: 'center', 
        alignItems: 'center'
      }, 
});