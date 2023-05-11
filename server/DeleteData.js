import connectdb from "./mongodb/Connect.js";
import * as dotenv from "dotenv";
import PostSchema from "./mongodb/models/Posts.js";
dotenv.config();

const Start = async () => {
    console.log(process.env.MONGODB_URL)
  try {
    connectdb(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};

Start();

const Delete = async () => {
  try {
    await PostSchema.deleteMany();
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit()
};

if (process.argv[2]="--delete"){
    Delete()
}