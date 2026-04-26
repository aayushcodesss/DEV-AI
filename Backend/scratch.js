import mongoose from "mongoose";

const test = async () => {
    try {
        console.log("Connecting...");
        await mongoose.connect(undefined);
        console.log("Connected");
    } catch(err) {
        console.log("Caught error:", err);
    }
}
test();
