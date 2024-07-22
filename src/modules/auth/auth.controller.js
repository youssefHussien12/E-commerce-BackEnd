import jwt from "jsonwebtoken";
import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt"
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";

const signUp = async (req, res, next) => {
  let user = new User(req.body)
  await user.save()
  let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
  res.status(201).json({ message: "success", success: true, token, data: user })
}

const signIn = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("inccorect email or password", 401))
}


const changeUserPassword = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChanagedAt: Date.now() })
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("inccorect email or password", 401))
}


const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) next(new AppError("token not provided", 401))
  let userPayload = null;
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401))
    userPayload = payload
  })

  let user = await User.findById(userPayload.userId)
  if (!user) next(new AppError("user not found", 404))

  if (user.passwordChanagedAt) {
    let time = parseInt(user.passwordChanagedAt.getTime() / 1000)
    if (time > userPayload.iat) return next(new AppError("invalid token ... login again", 401))
  }
  req.user = user
  next()
})





const allowedTo = (...roles) => {
  return catchError(async(req, res, next)=> {
    if(roles.includes(req.user.role)) return next()
      return next(new AppError("you not authorized to access this endpoint",401))
})
}




export { signUp, signIn, changeUserPassword, protectedRoutes,allowedTo }