const mongoose = require('mongoose');
const serviceShema = new mongoose.Schema({
    
    serviceName : {
        type: String,  
        required : true,
        unique:true
    },
    price : {
        type : Number,
        required : true
    },
    company:{
          type: String,
          required : true 
    }
});
    
module.exports = mongoose.model("Service", serviceShema);
