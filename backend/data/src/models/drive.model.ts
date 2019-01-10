import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;

const baseOptions = {
   discriminatorKey: '__type',
};

const drive = mongoose.model('Drive', new Schema({
   date: {type: Date, required: true},
   origin: {type: String, required: true},//startort
   destination: {type: String, required:true},//zielort
   restrictions: {type: [String], required: true},
   preferences: {type: [String],required: true},//hinweise
   price: {type: Number, required: false},
   hasFixedPrice: {type: Number,required: false},
   cargoWeightInKg: {type: Number,required: true},
   loadingSpaceDimensions:  {type: [Number],required:false},
   personCnt: {type: Number, required: true} ,
   owner: { type: String, ref: 'User' ,required: false},
},baseOptions));

module.exports = mongoose.model('Drive');