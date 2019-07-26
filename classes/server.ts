
import express from 'express';
import {SERVER_PORT} from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance:Server;
    public app:express.Application;
    public port: number;
    
    public io: socketIO.Server;

    public httpServer: http.Server;

    

    private constructor(){
        

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSocket();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    start(callback:Function){
        this.httpServer.listen(this.port,callback()); 
        
        
    }

    private escucharSocket(){
        console.log('Escuchando sockets');
        this.io.on('connection',client =>{

            socket.conectarCliente(client);
            socket.mensaje(client,this.io);
            socket.desconectar(client,this.io); 
            socket.login(client,this.io);
            socket.obtenerUsuarios(client,this.io);
        });
        
    }
}