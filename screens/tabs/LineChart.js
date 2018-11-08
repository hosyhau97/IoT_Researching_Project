/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Sensor Day Chart
*/
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const labels = this.props.labels;
      const data = this.props.data;
      return(
        <View style={styles.container}>
          <LineChart
            data={{
              labels: labels,
              datasets: [{
                data: data
              }]
            }}
            width={Dimensions.get('window').width - 20} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#669999',
              backgroundGradientTo: '#94b8b8',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 5,
              borderRadius: 8
            }}
          />
    
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