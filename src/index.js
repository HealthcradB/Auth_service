import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connect} from './config/database.js'
import apiRoutes from './routes/index.js'

const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api',apiRoutes)


app.listen(3125,async()=>{
    console.log('server start');
    await connect();
    console.log('Mongodb connected');
})