const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return req.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("account has been updated");
        } catch (err) {
            return req.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can update only your account");
    }
});

//deleted User
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id });

            res.status(200).json("account has been deleted successfully!");
        } catch (err) {
            return req.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can delete only your account");
    }
});

//get User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(403).json(err);
    }
});

//follow a user
router.put("/:id/follow", async (req ,res ) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.body.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you already follow this user ");
            }
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});

//unFollow user

router.put("/:id/unFollow", async (req , res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.body.id } });
                res.status(200).json("user has been unFollowed");
            } else {
                res.status(403).json("you are don`t follow this user ");
            }
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("you can`t UnFollow yourself");
    }
});

module.exports = router;
