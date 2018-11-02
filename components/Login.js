/*
Author: Phan Hong Nam
Email: idlogin97@gmail.com
University: Ha Noi University Of Industry
Green House Login Screen
*/
import React, { Component } from 'react';
import {
    StyleSheet, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Alert
} from 'react-native';
import { Container, Header, Content, Toast, Button, Text } from 'native-base';
import { LoginToServer } from '../networking/Server';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '', 
            password: ''
        }
    }

    _onLoginPressed = () => {
        if (this.state.user.length === 0 || this.state.password.length === 0)
        Toast.show({
            text: "Enter username/email and password",
            buttonText: "Okay",
            duration: 3000
          })
        else {
            var user = this.state.user, password = this.state.password;
            var callbackFunc = this.props.saveInfo;
            var prom = new Promise(function(resolve, recject) {
                resolve(LoginToServer(user, password));
            })
            prom.then(function(loginInfo) {
                if (loginInfo.code === 400)
                    Alert.alert('Login failed');
                else if (loginInfo.code === 200) {
                    console.log('Login sucess');
                    callbackFunc(loginInfo);
                }  
            }).catch(function(reason) {
                // rejection
                console.log(reason);
             });
        }
    }

    _onChangeTextUser = (username) => {
        this.setState({
            user: username
        });
    }

    _onChangeTextPwd = (pwd) => {
        this.setState({
            password: pwd
        });
    }

    render() {
        return (
                <SafeAreaView style={styles.container}>
                <View style= {styles.container}>
                    <KeyboardAvoidingView keyboardVerticalOffset={-300} behavior='padding' style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container} 
                                onPress={Keyboard.dismiss}>
                            <View style={styles.logoContainer}>
                                <View style={styles.infoContainer}>
                                    <View style={styles.logoContainer}>
                                        <Image style={styles.logo}
                                            source={require('../images/logo.png')}>
                                        </Image>
                                    </View>
                                    <TextInput style={styles.input}
                                        onChangeText = {this._onChangeTextUser}
                                        placeholder="Enter username/email"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        selectionColor={'white'}
                                        autoCorrect={false}
                                        value={this.state.user}
                                        onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                    />
                                    <TextInput style={styles.input} 
                                        onChangeText={this._onChangeTextPwd}
                                        placeholder="Enter password"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        secureTextEntry
                                        selectionColor={'white'}
                                        autoCorrect={false}
                                        ref={"txtPassword"}
                                        value={this.state.password}
                                    />
                                    <TouchableOpacity onPress={this._onLoginPressed}
                                    style={styles.buttonContainer}>
                                        <Text style={styles.buttonText}>SIGN IN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView> 
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 400,
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'black',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color :'white',
        fontWeight: 'bold',
        fontSize: 18
    }
})