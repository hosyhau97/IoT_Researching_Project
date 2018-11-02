import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HomeTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
        return <Ionicons name='md-home' size={horizontal ? 20 : 25} style={{ color: tintColor }} />
    }, 
    tabBarColor: '#17827d'
  }
  constructor(props) {
    super(props);

    this.state = { 
      temperature: 30, 
      light: 100, 
      co2: 288, 
      humidity: 60, 
      soil_moiture: 30, 
      oxygen: 288
    }
  }
  render() {
    let infor = this.state;
    console.log(JSON.stringify(infor));
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="rgba(15, 87, 83, 0.9)"
            // barStyle="light-content"
          />
          <View style={styles.header}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Trang chủ</Text>
          </View>
          <View style={styles.containerContent}>
          <View style={styles.colOne}>
            <View style={styles.rowOne}>
              <View style={styles.topic}>
                {/* <Text style={styles.title}>Nhiệt độ</Text> */}
                <Image source={require('../../images/temperature.png')}
                style={styles.icon}></Image>
              </View>
              <View style={styles.content}>
                  <ProgressCircle
                      percent={30}
                      radius={50}
                      borderWidth={4}
                      color="red"
                      shadowColor="#d6d6d6"
                      bgColor="#fff"
                  >
                      <Text style={{ fontSize: 16, color: 'red' }}>
                        {`${infor.temperature}°C`}
                        </Text>
                  </ProgressCircle>
              </View>
            </View>
            <View style={styles.rowOne}>
              <View style={styles.topic}>
                {/* <Text style={styles.title}>Ánh sáng</Text> */}
                <Image source={require('../../images/light.png')}
                style={styles.icon}></Image>
              </View>
              <View style={styles.content}>
                <ProgressCircle
                  percent={infor.light}
                  radius={50}
                  borderWidth={4}
                  color="orange"
                  shadowColor="#d6d6d6"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 16, color: 'orange' }}>
                    {`${infor.light}%`}
                  </Text>
                </ProgressCircle>
              </View>
            </View>
            <View style={styles.rowOne}>
            <View style={styles.topic}>
                {/* <Text style={styles.title}>CO2</Text> */}
                <Image source={require('../../images/co2.png')}
                style={styles.icon}></Image>
              </View>
              <View style={styles.content}>
                <ProgressCircle
                  percent={infor.co2/1000 * 100}
                  radius={50}
                  borderWidth={4}
                  color="black"
                  shadowColor="#d6d6d6"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 16, color: 'gray' }}>
                    {`${infor.co2}ppm`}
                  </Text>
                </ProgressCircle>
              </View>
            </View>
          </View>
          <View style={styles.colOne}>
            <View style={styles.rowOne}>
              <View style={styles.topic}>
                  {/* <Text style={styles.title}>Độ ẩm không khí</Text> */}
                  <Image source={require('../../images/humidity.png')}
                  style={styles.icon}></Image>
                </View>
                <View style={styles.content}>
                  <ProgressCircle
                    percent={infor.humidity}
                    radius={50}
                    borderWidth={4}
                    color="blue"
                    shadowColor="#d6d6d6"
                    bgColor="#fff"
                  >
                    <Text style={{ fontSize: 16, color: 'blue' }}>
                      {`${infor.humidity}%`}
                    </Text>
                  </ProgressCircle>
                </View>
            </View>
            <View style={styles.rowOne}>
            <View style={styles.topic}>
                {/* <Text style={styles.title}>Độ ẩm đất</Text> */}
                <Image source={require('../../images/soil_moiture.png')}
                style={styles.icon}></Image>
              </View>
              <View style={styles.content}>
                <ProgressCircle
                  percent={infor.soil_moiture}
                  radius={50}
                  borderWidth={4}
                  color="limegreen"
                  shadowColor="#d6d6d6"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 16, color: 'limegreen' }}>
                    {`${infor.soil_moiture}%`}
                  </Text>
                </ProgressCircle>
              </View>
            </View>
            <View style={styles.rowOne}>
            <View style={styles.topic}>
                {/* <Text style={styles.title}>O2</Text> */}
                <Image source={require('../../images/oxygen.png')}
                style={styles.icon}></Image>
              </View>
              <View style={styles.content}>
              <ProgressCircle
                  percent={infor.oxygen/1000 * 100}
                  radius={50}
                  borderWidth={4}
                  color="green"
                  shadowColor="#d6d6d6"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 16, color: 'green' }}>
                    {`${infor.oxygen}ppm`}
                  </Text>
                </ProgressCircle>
              </View>
            </View>
          </View>
          </View>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
  }, 

  colOne: {
    flex: 1, 
    //backgroundColor: 'red', 
    flexDirection: 'column', 
    padding: 1
  }, 

  rowOne: {
    flex: 1, 
    flexDirection: 'column', 
    backgroundColor: 'white', 
    alignItems: 'center', 
    borderColor: 'lightseagreen', 
    elevation: 1,
    borderWidth: 1, 
    borderRadius: 5, 
    margin: 1
  }, 

  icon: {
    width: 36, 
    height: 36, 
    margin: 5
  }, 

  topic: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 

  content: {
    flex: 3, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 

  header: {
    height: 50, 
    backgroundColor: '#17827d', 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 

  containerContent: {
    flex: 1,
    flexDirection: 'row'
  }
});