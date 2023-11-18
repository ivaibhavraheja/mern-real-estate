import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const addToBookmarks = async(req, res, next)  => {
    const { userId, listingId } = req.body;
    try{
        const listing = await Listing.findById(listingId);
        if(!listing){
            return next(errorHandler(404, "Listing Not Found"));
        }
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: {bookmarks: listingId} },
            { new: true }
        );
        res.status(200).json({
            success: true,
            bookmarks: user.bookmarks,
        })
    }
    catch(error){
        next(error);
    }
}

export const removeFromBookmarks = async(req, res, next) => {
    const { userId, listingId } = req.body;
    try{
        //remove the listing from user's bookmarks 
        const user = await User.findByIdAndUpdate(
            userId, 
            { $pull: {bookmarks: listingId} }, 
            { new: true }
        );
        res.status(200).json({
            success: true,
            bookmarks: user.bookmarks
        })
    }
    catch(error){
        next(error);
    }
}

export const getUserBookmarks = async(req, res, next) => {
    const { userId } = req.query;
    try{
        const user = await User.findById(userId).populate('bookmarks');
        res.status(200).json({ 
            success: true, 
            bookmarks: user.bookmarks 
        });
    }
    catch(error){
        next(error);
    }
}
