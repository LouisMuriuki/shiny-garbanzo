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
    try {
        const posts=await Post.find ({})
        res.status(200).json({success:true,data:posts})
    } catch (error) {
        res.status(500).json({success:false,message:error})
    }
});

//create a post
router.route("/").get(async (req, res) => {
  try {
    const { name, prompt,