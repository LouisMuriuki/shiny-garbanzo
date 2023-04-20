import mongoose from "mongoose";

const connectdb = (url) => {
  mongoose.set("strictQuery", true);
console.log(url);
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));
};
export default connectdb