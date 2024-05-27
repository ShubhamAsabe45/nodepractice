const mongoose = require ('mongoose');


const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    adress:{
        type:String
    },
    salary:{
        type:String,
        required:true
    }
})


// Export
const Person = mongoose.model('Person',personSchema)
module.exports = Person;