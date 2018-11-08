/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Sensor Day Chart
*/
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default class PieChart extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const labels = this.props.labels;
      const data = this.props.data;
      return(
        <View style={styles.container}>
          
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 5, 
    paddingVertical: 5
  } 
});