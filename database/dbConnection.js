import { connect } from "mongoose";


export const dbConn = connect('mongodb+srv://E-commerce:ycdtWbA4cDyDzh6V@cluster0.ydjbez3.mongodb.net/e-ecommercec42')
.then(()=>{
    console.log('database connected successfully');
})
.catch((err)=>{
    console.log('database disConnected ' + err);
})

//ycdtWbA4cDyDzh6V