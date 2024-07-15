import { connect } from "mongoose";


export const dbConn = connect('mongodb://localhost:27017/e-ecommerce')
.then(()=>{
    console.log('database connected successfully');
})
.catch((err)=>{
    console.log('database disConnected ' + err);
})