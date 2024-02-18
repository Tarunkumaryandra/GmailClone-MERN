import mongoose  from "mongoose";
import dotenv from "dotenv";


dotenv.config();


const Connetion =() =>{
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-hthmtr1-shard-00-00.aeck8z0.mongodb.net:27017,ac-hthmtr1-shard-00-01.aeck8z0.mongodb.net:27017,ac-hthmtr1-shard-00-02.aeck8z0.mongodb.net:27017/?ssl=true&replicaSet=atlas-e3tgo0-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        mongoose.connect(DB_URI, {useNewUrlParser: true});
        console.log('Database connect Successfully')
    }catch(error){
        console.log('Error While Connecting with the database',error.message);
    }
}



export default Connetion;