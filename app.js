import express, { json } from 'express'
import http from 'http';
import cors from 'cors'
import router from './routes.js';

const app= express();



app.use(cors());
app.use(json());
app.use('/api/',router);
app.get('/api/',(req,res)=>
{
    res.send('API For DGII  <br><br><br>  GET A RNC:<br> http://localhost:8000/api/load:cedulaRNC <br><br><br><br> developed by: Jefferson Ricardo Batista Veriguete');
});
const server= http.createServer(app);

server.listen(8000,()=>{
    console.log('server listening at http://localhost:8000/');
});

