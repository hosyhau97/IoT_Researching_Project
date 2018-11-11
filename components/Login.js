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
    KeyboardAvoidingView, Text, NetInfo, BackAndroid, 
    ToastAndroid, BackHandler, ActivityIndicator
} from 'react-native';
import { LoginToServer } from '../networking/Server';

class WaitingScreen extends Component {
    render () {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Đang đăng nhập</Text>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWaiting: false,
            user: '', 
            password: ''
        }
    }

    componentDidMount = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected == false) {
                ToastAndroid.showWithGravity(
                    'Không có kết nối Internet. Vui lòng kiểm tra lại kết nối Internet',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setTimeout( () => {
                    BackHandler.exitApp();
                }, 1000);
            }
        });
    }

    _onWaiting = (waiting) => {
        this.setState({isWaiting: waiting});
    }

    _onLoginPressed = () => {
        let waiting = this._onWaiting;
        if (this.state.user.length === 0 || this.state.password.length === 0)
        ToastAndroid.showWithGravity(
            'Vui lòng nhập tài khoản/mật khẩu',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        else {
            var user = this.state.user, password = this.state.password;
            var callbackFunc = this.props.saveInfo;
            var prom = new Promise(function(resolve, recject) {
                resolve(LoginToServer(user, password));
                waiting(true);
            })
            prom.then(function(loginInfo) {
                console.log(loginInfo.code);
                if (loginInfo.code === 400) {
                    ToastAndroid.showWithGravity(
                        'Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản/mật khẩu',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    waiting(false);
                }
                else if (loginInfo.code === 500) {
                    ToastAndroid.showWithGravity(
                        loginInfo.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    waiting(false);
                }
                else if (loginInfo.code === 200) {
                    ToastAndroid.showWithGravity(
                        'Đăng nhập thành công',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    waiting(false);
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
        const waiting = this.state;
        return (
                waiting.isWaiting == true ? <WaitingScreen /> :
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
                                        <Text style={styles.buttonText}>Đăng nhập</Text>
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