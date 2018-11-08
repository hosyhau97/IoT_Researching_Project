/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Main Screen
*/
import React, { Component } from 'react';
import HomeTab from '../screens/tabs/HomeTab';
import ControlTab from '../screens/tabs/ControlTab';
import ChartTab from '../screens/tabs/ChartTab';
import UserTab from '../screens/tabs/UserTab';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import io from 'socket.io-client';

// import createMaterialBottomTabNavigator from 'react-navigation-material-bottom-tabs';

export default class Main extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <MainNavigator />;
    }
}

const MainNavigator = createMaterialBottomTabNavigator({
    Home: { screen: HomeTab },
    Control: { screen: ControlTab },
    Chart: { screen: ChartTab },
    User: { screen: UserTab },
  }, {
    initialRouteName: 'Home',
    activeColor: '#fff',
    inactiveColor: 'rgba(255, 255, 255, 0.8)',
    //barStyle: { backgroundColor: '#64dd17' },
  });