import mongoose from 'mongoose';
/*
I.	products
name: string
description: string
price: number
quantity: number
category: string

*/
const ProductSchema = new mongoose.Schema({
     name: {
      type: String,
      trim: true,
      required: 'Name is required'
     },
     description: {
      type: String,
      trim: true,
      required: 'Description is required'
     },
     price: {
      type: Number,
      required: 'Price is required'
     },
     quantity: {
        type: Number,
        default: 1
     },
     category: {
        type: String,
        trim: true,
        default: 'General'
     }
    })


export default mongoose.model('Product', ProductSchema);
