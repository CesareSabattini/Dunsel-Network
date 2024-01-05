const express= require('express');
const mongoose=require('mongoose');
const helmet=require('helmet');
const morgan=require('morgan');
require('dotenv').config();
const bodyParser= require('body-parser');
const userRoutes= require('./routes/user');
const postRoutes= require('./routes/post');
const communityRoutes= require('./routes/community')
const cors=require('cors');


const app= express();

app.use(cors(
    {
    origin:["https://dunsel-network-front.vercel.app"],
    methods:["POST", "GET", "DELETE"],
    credentials: true,
    allowedHeaders:['Access-Control-Allow-Origin' ]
      
}
))
app.get('/', (req,res)=>{
res.json('Hello')
})
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}));


app.use('/user',userRoutes);
app.use('/post', postRoutes);
app.use('/community', communityRoutes);









const PORT= process.env.PORT;
const MONGO_URI= process.env.MONGO_URI;
try{
    mongoose.connect(MONGO_URI)
    .then( app.listen(PORT, ()=>{
        console.log('Mongo DB connected')
        console.log(
        `Server listening on port ${PORT}`)}))
}

catch(err){
    console.log(err);
}