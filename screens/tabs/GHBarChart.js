/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Sensor Day Chart
*/
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

export default class GHBarChart extends React.PureComponent {
    render() {
 
        const data = [ 50, 10, 40, 14, 32, 43, 45, 54, 100, 33, 1, 5, 24, 66, 98,
            50, 10, 40, 14, 32, 43, 45, 54, 100, 33, 1, 5, 24, 66, 98 ]
            const CUT_OFF = 20
            const Labels = ({ x, y, bandwidth, data }) => (
                data.map((value, index) => (
                    <Text
                        key={ index }
                        x={ x(index) + (bandwidth / 2) }
                        y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                        fontSize={ 14 }
                        fill={ value >= CUT_OFF ? 'white' : 'black' }
                        alignmentBaseline={ 'middle' }
                        textAnchor={ 'middle' }
                    >
                        {value}
                    </Text>
                ))
            )
            return (
                <View style={{ height: 200, padding: 20 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        gridMin={0}
                        svg={{ fill: 'rgb(134, 65, 244)' }}
                    >
                    {/* <Grid direction={Grid.Direction.HORIZONTAL}/> */}
                        <Labels/>
                    </BarChart>
                    <XAxis
                        style={{ marginTop: 10 }}
                        data={ data }
                        scale={scale.scaleBand}
                        formatLabel={ (value, index) => index }
                        labelStyle={ { color: 'black' } }
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