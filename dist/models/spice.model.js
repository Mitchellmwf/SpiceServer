import mongoose, { Schema } from "mongoose";
// define schema
const spiceSchema = new Schema({
    name: {
        type: String, required: true
    },
    source: {
        type: String, required: true
    },
    profile: {
        type: String, required: true
    },
    colour: {
        type: String, required: true
    },
    texture: {
        type: String, required: true
    },
    capsaicin: {
        type: Boolean, required: true
    }
});
const Spice = mongoose.model("Spice", spiceSchema);
export default Spice;
