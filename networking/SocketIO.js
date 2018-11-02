/*
Author: Phan Hong Nam
Email: idlogin97@gmail.com
University: Ha Noi University Of Industry
Green House Main Screen
*/
import io from 'socket.io-client';

class SocketIO {
    constructor(server) {
        this.SocketIO = io(server);
    }

    
}