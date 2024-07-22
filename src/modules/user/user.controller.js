import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne, getAll, getOne, updateOne } from "../handlers/handlers.js"



const addUser = catchError(async (req, res) => {
    let user = new User(req.body)
    await user.save()
    res.status(201).json({ message: "success", user })
})

const allUsers = getAll(User)

const getUser = getOne(User)

const updateUser = updateOne(User)

const deleteUser = deleteOne(User)


export {
    addUser,
    allUsers,
    getUser,
    updateUser,
    deleteUser
}