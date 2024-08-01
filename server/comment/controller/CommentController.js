const { Comment } = require("../model/CommentModel")

const input = {

    uploadComment: async (req, res) => {
        const comment = new Comment(req.body)
        await comment.save()

        const resComment = await Comment.find({ _id: comment._id })
            .populate('writer')
            console.log('====SigleComments response: ',resComment)
        if (!resComment) return res.status(404).json({ success: false, err })
        res.status(200).json({ success: true, resComment })

    },

    getComment: async (req, res) => {
        const { productId } = req.query;
        try {
            const comments = await Comment.find({ productId }).populate('writer');
            console.log("====getComment APi: ",comments)
            res.status(200).json({ success: true, comments });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

}

module.exports = {
    input,
}