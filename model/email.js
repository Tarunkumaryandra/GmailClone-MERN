import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
    to:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true
    },
    subject:String,
    body:String,
    date:{
        type:Date,
        require:true
    },
    image:String,
    name:{
        type:String,
        require:true
    },
    starred:{
        type:Boolean,
        require:true,
        default:false
    },
    bin:{
        type:Boolean,
        require:true,
        default:false
    },
    type:{
        type:String,
        require:true
    }
})


const email = mongoose.model('emails',EmailSchema);


export default email;