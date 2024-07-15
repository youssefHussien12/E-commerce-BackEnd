import jwt from 'jsonwebtoken'
import { AppError } from '../utils/AppError.js'


export const verfiyToken = (req, res, next) => {
    let { token } = req.headers
    jwt.verify(token , "UsersNotes", (err, decoded) => {
        if (err) next(new AppError({message:"invalid token",err},401))
      req.user = decoded
        next()
    })
}