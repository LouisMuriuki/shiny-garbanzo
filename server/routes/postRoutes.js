import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/Posts.js";

dotenv.config();
const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  console.log(req.query);
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    let nextpageexists;
    let nextpage;

    let postsquery = Post.find({});

    const numPosts = await Post.countDocuments();

    if (req.query.page) {
      if (skip > numPosts) {
        nextpageexists = false;
        nextpage = undefined;
      } else if (numPosts <= 10) {
        nextpage = page + 1;
        nextpageexists = false;
      } else {
        nextpage = page + 1;
        nextpageexists = true;
      }
    }
    postsquery = postsquery.sort("_id").skip(skip).limit(limit);

    const posts = await postsquery;
    console.log(posts);
    res.status(200).json({
      success: true,
      data: posts.reverse(),
      page: {
        total: numPosts,
        nextpageexists: nextpageexists,
        nextpage: nextpage,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//create a post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo, signature } = req.body;
    const photoURl = await cloudinary.uploader.upload(photo);

    const newpost = await Post.create({
      name,
      prompt,
      photo: photoURl.url,
      signature,
    });
    console.log(newpost);
    res.status(201).json({ success: true, data: newpost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
export default router;
