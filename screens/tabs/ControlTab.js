/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Control Tab
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Switch } from 'react-native-switch';
import Orientation from 'react-native-orientation';

export default class ControlTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ horizontal, tintColor }) => {
            return <Ionicons name='md-switch' size={horizontal ? 20 : 25} style={{ color: tintColor }} />
        }, 
        tabBarColor: '#1b9891', 
        tabBarOnPress: ({navigation, defaultHandler}) => {
            Orientation.lockToPortrait();
            defaultHandler();
        }
    }    
    constructor(props) {
        super(props);
        this.state = {
            lightState: false, 
            wateringState: false, 
            ventilationState: false, 
            roofState: false
        }
    }

    _onLightSwitch = () => {
        this.setState(prevState => ({
           lightState: !prevState.lightState, 
        }))
    }

    _onWateringSwitch = () => {
        this.setState(prevState => ({
            wateringState: !prevState.wateringState, 
        }))
    }

    _onVentilationSwitch = () => {
        this.setState(prevState => ({
            ventilationState: !prevState.ventilationState, 
        }))
    }

    _onRoofSwitch = () => {
        this.setState(prevState => ({
            roofState: !prevState.roofState, 
        }))
    }

    render() {
        const lightSource = 
            this.state.lightState ? 
            require('../../images/bulb_on.gif') : 
            require('../../images/light_off.png');
        const wateringSource = 
            this.state.wateringState ? 
            require('../../images/watering_on.gif') : 
            require('../../images/watering_off.png');
        const ventilationSource = 
            this.state.ventilationState ? 
            require('../../images/ventilation_on.gif') : 
            require('../../images/ventilation_off.png');
        const roofSource = 
            this.state.roofState ? 
            require('../../images/roof_on.gif') : 
            require('../../images/roof_off.png');
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(15, 87, 83, 0.8)"
                    // barStyle="light-content"
                />
                <View style={styles.header}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Điều khiển</Text>
                </View>
                <ScrollView>
                    <View style={styles.controlContainer}>
                        <View style={styles.ColumnOne}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    Hệ thống đèn:
                                </Text>
                                <Text style={{fontSize: 18, 
                                color: this.state.lightState ? 'green' : 'red'}}>
                                    {this.state.lightState ? ' Bật' : ' Tắt'}
                                </Text>    
                            </View>
                            <View style={styles.imageAndControl}>
                                <Image source={lightSource}
                                style={styles.image}></Image>
                                <Switch
                                    value={this.state.lightState}
                                    onValueChange={this._onLightSwitch}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={25}
                                    barHeight={30}
                                    circleBorderWidth={0}
                                    backgroundActive={'#1b9891'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#fff'}
                                    circleInActiveColor={'#fff'}
                                    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                    innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
                                    outerCircleStyle={{}} // style for outer animated circle
                                    renderActiveText={false}
                                    renderInActiveText={false}
                                    switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                    switchRightPx={1.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                    switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                                />
                            </View>
                        </View>
                        <View style={styles.ColumnOne}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    Hệ thống tưới nước:
                                </Text>
                                <Text style={{fontSize: 18, 
                                color: this.state.wateringState ? 'green' : 'red'}}>
                                    {this.state.wateringState ? ' Bật' : ' Tắt'}
                                </Text>   
                            </View>
                            <View style={styles.imageAndControl}>
                                <Image source={wateringSource}
                                style={styles.image}></Image>
                                <Switch
                                    value={this.state.wateringState}
                                    onValueChange={this._onWateringSwitch}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={25}
                                    barHeight={30}
                                    circleBorderWidth={0}
                                    backgroundActive={'#1b9891'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#fff'}
                                    circleInActiveColor={'#fff'}
                                    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                    innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
                                    outerCircleStyle={{}} // style for outer animated circle
                                    renderActiveText={false}
                                    renderInActiveText={false}
                                    switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                    switchRightPx={1.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                    switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                                />
                            </View>
                        </View>
                        <View style={styles.ColumnOne}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    Hệ thống quạt thông gió:
                                </Text>
                                <Text style={{fontSize: 18, 
                                color: this.state.ventilationState ? 'green' : 'red'}}>
                                    {this.state.ventilationState ? ' Bật' : ' Tắt'}
                                </Text>  
                            </View>
                            <View style={styles.imageAndControl}>
                                <Image source={ventilationSource}
                                style={styles.image}></Image>
                                <Switch
                                    value={this.state.ventilationState}
                                    onValueChange={this._onVentilationSwitch}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={25}
                                    barHeight={30}
                                    circleBorderWidth={0}
                                    backgroundActive={'#1b9891'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#fff'}
                                    circleInActiveColor={'#fff'}
                                    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                    innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
                                    outerCircleStyle={{}} // style for outer animated circle
                                    renderActiveText={false}
                                    renderInActiveText={false}
                                    switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                    switchRightPx={1.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                    switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                                />
                            </View>
                        </View>
                        <View style={styles.ColumnOne}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    Hệ thống mái che:
                                </Text>
                                <Text style={{fontSize: 18, 
                                color: this.state.roofState ? 'green' : 'red'}}>
                                    {this.state.roofState ? ' Bật' : ' Tắt'}
                                </Text>
                            </View>
                            <View style={styles.imageAndControl}>
                                <Image source={roofSource}
                                style={styles.image}></Image>
                                <Switch
                                    value={this.state.roofState}
                                    onValueChange={this._onRoofSwitch}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={25}
                                    barHeight={30}
                                    circleBorderWidth={0}
                                    backgroundActive={'#1b9891'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#fff'}
                                    circleInActiveColor={'#fff'}
                                    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                    innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
                                    outerCircleStyle={{}} // style for outer animated circle
                                    renderActiveText={false}
                                    renderInActiveText={false}
                                    switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                    switchRightPx={1.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                    switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    controlContainer: {
        flex: 1,
        flexDirection: 'column', 
        paddingVertical: 10
    }, 

    ColumnOne: {
        height: 200, 
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        flex: 1, 
        flexDirection: 'column', 
        marginHorizontal: 20, 
        marginVertical: 10, 
        elevation: 2
    }, 

    titleContainer: {
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 

    imageAndControl: {
        flex: 2, 
        flexDirection: 'row', 
        alignItems: 'center'
    }, 

    image: {
        width: 100, 
        height: 100, 
        marginLeft: 30, 
        marginRight: 100
    }, 

    title: {
        fontSize: 18
    }, 

    toggleButton: {
        marginRight: 40
    }
});