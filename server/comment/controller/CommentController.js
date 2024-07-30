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
        
    }

}

module.exports = {
    input,
}