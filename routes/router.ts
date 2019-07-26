

import {Router, Request,Response} from 'express';
import  Server  from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
const router = Router();


router.get('/mensajes',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        mensaje:'todo esta bien!!'
    })


})

router.post('/mensajes',(req:Request,res:Response)=>{
    const mensaje = req.body.cuerpo;
    const de = req.body.de;
    const server = Server.instance;

    server.io.emit('mensajenuevo',{mensaje,de})
    server.io.emit('mensaje')
    res.json({
        ok:true,
        mensaje:'todo esta bien!!'
    })


})



router.post('/mensajes/:id',(req:Request,res:Response)=>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',{
        de,
        cuerpo
    })

    res.json({
        ok:true,
        mensaje:'todo esta bien!! en POST',
        cuerpo,
        de,
        id
    })


})

//Obtener los Id de lo usuarios
router.post('/usuarios', (req:Request,res:Response) =>{

    const server = Server.instance;

    server.io.clients( (err:any,clients:string[]) =>{
        if(err){
            res.json({
                ok:false,
            })
            return;
        }

        res.json({
            ok:true,
            clients
        })
    })
    
})

//Obtener los id y los nombres de los conectados

router.post('/usuarios/detalle', (req:Request,res:Response ) =>{

    res.json({
        ok:true,
        usuarios:usuariosConectados.getLista()
    });
    
    
})

export default router;