const { model } = require("mongoose")
const {Comment} = require("../model/CommentModel")

const input = {

    uploadComment: async (req, res) => {
        const comment = new Comment(req.body)
         await comment.save()

         const response = await Comment.find({_id:comment._id})
        .populate('writer')

        if(!response) return res.status(404).json({success:false, err})
        res.status(200).json({success:true, response})
        
    },

    getComment: async (req, res) => {
        const comment = await Comment.find({productId : req.body.productId})
        .populate('writer')

        if(comment){
            res.status(200).json({success:true, comment})
        }else{
            res.status(404).json({success:false, err})
        }
        
    }

}

module.exports = {
    input,
}