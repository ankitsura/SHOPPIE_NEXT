import jwt from "jsonwebtoken";
import dotenv  from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        try {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if(error.message === 'jwt expired'){
                return res.status(200).json({message: error.message})
            }
            return res.status(200).json({message: 'jwt error'})
        }
            req.userId = decodedData?.data._id;
        next();
    } catch (error) {
        console.log('middlewareError',error.message);
    }
}

export default auth;