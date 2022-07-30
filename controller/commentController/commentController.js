
module.exports = {

    //user comments on content
    addComment: async (req, res, commentModel) => {
        try {
            const userId = req.user._id
            const contentId = req.params.contentId;
            const isVisible = req.body.isVisible;
            const comment = req.body.comment;

            if (userId &&
                contentId &&
                isVisible &&
                comment) {

                let commentSave = new commentModel({
                    userId: userId,
                    contentId: contentId,
                    isVisible: isVisible,
                    comment: comment,
                    commnetedAt: new Date(),
                })
                commentSave = await commentSave.save()
                res.status(200).send({ data: commentSave })
            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //user gets comment by contentId
    getComments: async (req, res, commentModel) => {
        try {
            const userId = req.user._id;
            const contentId = req.params.contentId;

            if (userId && contentId) {

                let condition = { contentId: contentId, isVisible: true }
                let totlCount = await commentModel.find(condition)
                totlCount = totlCount.length
                let comments = await commentModel
                    .find(condition)
                    .populate({
                        path: 'userId',
                        select: {
                            userName: 1,
                        }
                    })
                    .sort({ "updatedAt": -1 })

                res.status(200).send({ data: comments, totlCount })
            } else {
                res.status(400).send({ msg: "invalid params" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //updating comment by commentor and content user as well as commenter can hide the comment
    updateComment: async (req, res, commentModel, contentModel) => {
        try {
            const userId = req.user._id;
            const commentId = req.params.commentId;
            const isVisible = req.body.isVisible;
            const comment = req.body.comment;

            let condition = { _id: commentId }
            let commentAccessCheck = await commentModel.findOne(condition)
            let contentId = commentAccessCheck.contentId
            let contentOwner = await contentModel.findOne({ _id: contentId })

            if (contentOwner) {
                contentOwner = contentOwner.userId
            }
            if (commentAccessCheck) {
                commentAccessCheck = commentAccessCheck.userId
            }

            let updObj = {}

            //content owner case he can delete comment 
            if (userId == contentOwner) {
                updObj = {
                    isVisible: isVisible,
                    updatedAt: new Date(),
                }
                await commentModel.updateOne(condition, { $set: updObj })
                res.status(200).send({ data: "comment successfully udated" })
            }
            // commentor case he can delete as well as edit the comment
            else if (commentAccessCheck && userId != contentOwner) {
                updObj = {
                    comment: comment,
                    isVisible: isVisible,
                    updatedAt: new Date(),
                }
                await commentModel.updateOne(condition, { $set: updObj })
                res.status(200).send({ data: "comment successfully udated" })
            }
            // commentor with content owner case he can delete as well as edit his own comment
            else if (userId == commentAccessCheck && userId == contentOwner) {
                updObj = {
                    comment: comment,
                    isVisible: isVisible,
                    updatedAt: new Date(),
                }
                await commentModel.updateOne(condition, { $set: updObj })
                res.status(200).send({ data: "comment successfully udated" })
            }

        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    }
}