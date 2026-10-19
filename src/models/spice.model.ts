import mongoose, { Schema } from "mongoose";

interface ISpice{
    name: string,
    source: string,
    profile: string,
    colour: string,
    texture: string,
    capsaicin: boolean,
}

// define schema
const spiceSchema: Schema = new Schema({
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

const Spice = mongoose.model<ISpice>("Spice", spiceSchema);
export default Spice;