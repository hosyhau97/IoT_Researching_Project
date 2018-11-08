/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Server API
*/

import React, { Component } from 'react';

const apiLogin = 'http://192.168.103.123:3000/api/auth/login';

async function LoginToServer(user, password) {
    try {
        console.log(user + password);
        let response = await fetch(apiLogin, {
            method: 'POST', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: user,
                password: password,
            }),
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

export { LoginToServer };