const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        enum:["admin","employee"],
        required:true
    },
    skills:{
        type:String
    },
    salary:{
        type:Number
    },
    projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    }]


},{timestamps:true,});

const admin = mongoose.model('admin',adminSchema);
module.exports = admin;