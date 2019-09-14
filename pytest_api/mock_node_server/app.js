const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


// 
const errorHandler = require('./handlers/error');
const MONGODB_URL = 'mongodb+srv://tuvshinClient:Tuwshin99@udemy-vp6wh.gcp.mongodb.net/pytest';
const PORT = 8081;
const authRoutes = require('./routes/auth');
const companyRoutes=require('./routes/company');
const serviceRoutes=require('./routes/service');
const orderRoutes=require('./routes/order');

// config
app.use(cors());
app.use(bodyParser.json());
    
// routes
app.use('/api', authRoutes);
app.use('/api', companyRoutes);
app.use('/api', serviceRoutes);
app.use('/api', orderRoutes);


//error handler
app.use((req, res, next) =>  {
    const err = new Error("Not found!");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

mongoose
    .connect(MONGODB_URL)
    .then(res => {
        app.listen(PORT, () => {
            console.log(`Server is running on 8081 port`);
        })
        console.log('Mongoose cluster connected!')
    })
    .catch(err => console.log(err))