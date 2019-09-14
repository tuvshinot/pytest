const mongoose = require('mongoose');
const companyShema = new mongoose.Schema({
    
    name : {
        type: String,  
        required : true,
        unique:true
    },
    address : {
        type : String,
        required : true
    },
    status:{
          type: Boolean,
          required : true 
    }
});
    
module.exports = mongoose.model("Company", companyShema);
