const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderShema = new mongoose.Schema({
        customer: { 
                type: Schema.Types.ObjectId, 
                ref: 'User',
                required : true
        },
        service: { 
                type: Schema.Types.ObjectId, 
                ref: 'Service',
                required : true
        },
        status: { 
                type: String
        },
        plainDay:{
                type:String
        },
        quantityBy:{
                type:Number,
                required:false
        }
}, { timestamps: true });
    
module.exports = mongoose.model("Order", orderShema);