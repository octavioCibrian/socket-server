
import Server from './classes/server';
import router from './routes/router';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = new Server();


server.app.use(bodyParser.urlencoded({extended:true}));

server.app.use(bodyParser.json());

//CORS
server.app.use( cors({origin:true, credentials:true}));

//Rutas de Servicios
server.app.use('/',router);




server.start( ()=>{
    console.log(`El servidor esta corriendo en el puerto ${server.port}`);
});


