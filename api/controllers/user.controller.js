import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandler } from "../utils/error.js"

export const test = (req, res) => {
    res.json({
        message: "Test route is working",
    });
};

export const updateUser = async(req, res, next) => {
    // check if the request to update the particular id is from the same id or not
    // req.user.id --> from which request has come 
    // req.params.id --> the id to be changed 
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can only update your own account!'))
    }
    try{
        // if password has been requested to changed
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, {new: true});

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(error){
        next(error);
    }
};