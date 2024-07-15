import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import { AppError } from "../utils/AppError.js"

const fileUpload = (folderName) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + "_" + file.originalname)
        }
    })


    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new AppError("image only", 401), false)
        }
    }


    const upload = multer({ storage, fileFilter })

    return upload

}

export const uploadSingelFile =( filedName , folderName )=> fileUpload(folderName).single(filedName)
export const uploadMixOfFiles = (arrayOfFileds,folderName) => fileUpload(folderName).fields(arrayOfFileds)

