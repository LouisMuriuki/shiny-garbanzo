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
    const limit = req.query.limit*10 || 10;
    const skip = (page - 1) * limit;
    let nextpageexists;
    let nextpage;

    const postsquery = Post.find();
    const numPosts = await Post.countDocuments();
    if (req.query.page) {
      if (skip > numPosts) {
        return;
      } else {
        nextpage = nextpage + 1;
        nextpageexists = true;
      }
    }
    postsquery = postsquery.skip(skip).limit(limit);

    const posts = await postsquery;
    res
      .status(200)
      .json({
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
    const { name, prompt, photo } = req.body;
    const photoURl = await cloudinary.uploader.upload(photo);

    const newpost = await Post.create({
      name,
      prompt,
      photo: photoURl.url,
    });
    console.log(newpost);
    res.status(201).json({ success: true, data: newpost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
export default router;
