const { Comment } = require("../model/CommentModel")

const input = {

    uploadComment: async (req, res) => {
        const comment = new Comment(req.body)
        await comment.save()

        const resComment = await Comment.find({ _id: comment._id })
            .populate('writer')
        console.log('====SigleComments response: ', resComment)
        if (!resComment) return res.status(404).json({ success: false, err })
        res.status(200).json({ success: true, resComment })

    },

    getComment: async (req, res) => {
        const { productId } = req.query;
        try {
            const comments = await Comment.find({ productId }).populate('writer');
            console.log("====getComment APi: ", comments)
            res.status(200).json({ success: true, comments });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            console.log("====deleteComment APi: ", commentId)

            // 삭제할 댓글과 그에 연관된 모든 대댓글의 ID를 찾습니다
            const commentsToDelete = await Comment.find({
                $or: [
                    { _id: commentId },
                    { responseTo: commentId }
                ]
            }).select('_id');

            const commentIdsToDelete = commentsToDelete.map(comment => comment._id);

            // 찾은 모든 댓글을 삭제합니다
            await Comment.deleteMany({ _id: { $in: commentIdsToDelete } });

            res.json({ success: true, message: "댓글과 관련 대댓글이 모두 삭제되었습니다." });
        } catch (error) {
            console.error("댓글 삭제 중 오류:", error);
            res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
        }
    }

}

module.exports = {
    input,
}