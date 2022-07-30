
module.exports = {
    //user likes content
    addLikes: async (req, res, likeModel) => {
        try {
            const userId = req.user._id
            const contentId = req.params.contentId;
            const isLiked = true;
            const likedAt = new Date();
            let condition = {
                userId: userId,
                contentId: contentId
            }
            let likeCheck = await likeModel.findOne(condition)

            if (likeCheck) {
                console.log(likeCheck)
                if (likeCheck.isLiked == true) {
                    res.status(409).send({ msg: "already liked" })
                }
                else {
                    res.status(500).send({ msg:"server error" })
                }
            }
            else {
                let likeSave = new likeModel({
                    userId: userId,
                    contentId: contentId,
                    isLiked: isLiked,
                    likedAt: likedAt,
                })
                let likeAdd = await likeSave.save()
                res.status(200).send({ data: likeAdd })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //user gets comment by contentId
    getlikes: async (req, res, likeModel) => {
        try {
            const userId = req.user._id;
            const contentId = req.params.contentId;

            if (userId && contentId) {

                let condition = { contentId: contentId, isLiked: true }

                let likes = await likeModel.find(condition)
                    .populate({
                        path: 'userId',
                        select: {
                            userName: 1,
                        }
                    }).limit(20)
                    .sort({ "updatedAt": -1 })

                let counts = likes.length
                res.status(200).send({ data: likes, likeCounts: counts })
            } else {
                res.status(400).send({ msg: "invalid params" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },
    
    //unliking the like
    unlikeController: async (req, res, likeModel) => {
        try {
            const userId = req.user._id;
            const contentId = req.params.contentId;

            let condition = { contentId: contentId, userId: userId, isLiked: true }
            let like = await likeModel.findOne(condition)

            if (like) {
                like = await likeModel.updateOne(condition, { $set: { isLiked: false, updatedAt: new Date() } })
            }
            res.status(200).send({ data: "like successfully updated" })
        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    }
}