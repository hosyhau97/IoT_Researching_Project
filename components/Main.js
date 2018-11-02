/*
Author: Phan Hong Nam
Email: idlogin97@gmail.com
University: Ha Noi University Of Industry
Green House Main Screen
*/
import React, { Component } from 'react';
import { View, Icon } from 'react-native';
// import HomeTab from '../screens/tabs/HomeTab';
import HomeTab from '../screens/tabs/HomeTab';
import ControlTab from '../screens/tabs/ControlTab';
import ChartTab from '../screens/tabs/ChartTab';
import UserTab from '../screens/tabs/UserTab';
import { createBottomTabNavigator} from 'react-navigation';
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


// createMaterialBottomTabNavigator(RouteConfigs, MaterialBottomTabNavigatorConfig);
// const MainNavigator = createBottomTabNavigator ({
//     HomeTab: {
//         screen: HomeTab
//     },
//     ControlTab: {
//         screen: ControlTab
//     }, 
//     ChartTab: {
//         screen: ChartTab
//     },
//     UserTab: {
//         screen: UserTab
//     }
// }, {
//     initialRouteName: 'HomeTab', 
//     tabBarOptions: {
//         showLabel : false, 
//         showIcon: true, 
//         style: {
//             backgroundColor: '#64dd17',
//         }, 
//         indicatorStyle: {
//             backgroundColor: 'limegreen', 
//             width: 1
//         },
//         activeTintColor: 'white', 
//         inactiveTintColor: 'rgba(256, 256, 256, 0.76)', 
//         activeBackgroundColor: '#64dd17', 
//         inactiveBackgroundColor: '#64dd17'
//     }
// });
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