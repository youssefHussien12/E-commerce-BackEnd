import express from 'express'
import { dbConn } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/AppError.js'
const app = express()
const port = 3000
app.use(express.json())
app.use("/uploads",express.static("uploads"))



bootstrap(app)

app.use('*',(req,res,next)=>{
    next(new AppError(` route not found ${req.originalUrl}`,404))
})


app.use(globalError)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))