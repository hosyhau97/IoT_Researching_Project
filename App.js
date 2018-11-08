/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House App Tab
*/
 import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
import { Text, View } from 'react-native';
import { AsyncStorage } from "react-native"
import Login from './components/Login';
import Main from './components/Main';
import io from 'socket.io-client';
import SocketIO from './networking/SocketIO';

class WelcomeScreen extends Component {
  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'green', fontSize: 28}}>Welcome</Text>
      </View>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'onInit',
      isLogin: false, 
      token: ''
    }
    
    this._retrieveData();
    // this._retrieveData();
    
  }

  saveUserInfo = (info) => {
    this._storeData(info);
    this.setState({
        status: 'onMain',
        isLogin: true, 
        tokken: info.token
    })
  }

  _storeData = async (info) => {
    try {
      await AsyncStorage.setItem('token', info.token);
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        this.setState({
          status: 'onMain',
          isLogin: true, 
          token: value
        });
        console.log(value);
      } else {
        this.setState({
          status: 'onLogin',
          isLogin: false, 
          token: ''
        });
      }
     } catch (error) {
       // Error retrieving data
        this.setState({
          status: 'onLogin',
          isLogin: false, 
          token: ''
        });
     }
  }

  render() {
    const currentScreen = this.state;
    let MainScreen;
    if (currentScreen.status == 'onInit')
      MainScreen = <WelcomeScreen />
    else {
      if (currentScreen.isLogin == true)
        MainScreen = <Main />
      else
        MainScreen = <Login saveInfo={this.saveUserInfo}/>
    }
    return MainScreen;
  }
}
