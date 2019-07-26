import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';
import { Usuarioslista } from '../classes/usuarios-lista';

export const usuariosConectados = new Usuarioslista();

export const conectarCliente = (client:Socket) =>{
    const usuario = new Usuario(client.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const desconectar = (client:Socket,io:SocketIO.Server) =>{
    client.on('disconnect', ()=>{
        var usuarioElm = usuariosConectados.borrarUsuario(client.id);
        io.emit('usuarios-activos',usuariosConectados.getLista());
        console.log(`usuario eliminado`,usuarioElm);
    });
}

export const mensaje = (client:Socket,io:any) =>{

    client.on('mensaje', payload=>{
        io.emit('mensajenuevo',payload);
            
            
        console.log('Mensaje recibido',payload);
        
    });

}

export const login = (client:Socket,io:SocketIO.Server) =>{
    client.on('configurar-usuario',(payload, callback:Function) =>{
        usuariosConectados.actualizarNombre(client.id,payload.nombre);
        io.emit('usuarios-activos',usuariosConectados.getLista());
        console.log(`Se configuró el usuario ${payload.nombre}`);
        callback({
            ok:true,
            manesaje:`Se configuró el usuario ${payload.nombre}`
        }) 

    })
}

export const obtenerUsuarios = (client:Socket,io:SocketIO.Server) =>{
    client.on('obtener-usuarios',() =>{
        io.to(client.id).emit('usuarios-activos',usuariosConectados.getLista());
        console.log('obtuve usuarios activos');

    })
}