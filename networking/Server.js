/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Server API
*/

import React, { Component } from 'react';

const apiLogin = 'http://192.168.103.118:3000/api/auth/login';

async function LoginToServer(user, password) {
    try {
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
        let response = {code: 500, message: 'Không thể kết nối đến server'};
        // console.log(error);
        return response;
    }
}

export { LoginToServer };