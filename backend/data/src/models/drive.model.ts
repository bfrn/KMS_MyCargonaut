import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;

const baseOptions = {
   discriminatorKey: '__type',
}

const drive = mongoose.model('Drive', new Schema({
   date: {type: Date, required: true},
   origin: {type: String, required: true},//startort
   destination: {type: String, required:true},//zielort
   restrictions: {type: [String], required: true},
   preferences: {type: [String],required: true},//hinweise
   price: {type: String,required: true},
   hasFixedPrice: {type: Boolean,required: true},
   cargoWeightInKg: {type: Number,required: true},
   loadingSpaceDimensions:  {type: [Number],required:true},
   personCnt: {type: Number, required: true} 
},baseOptions))

module.exports = mongoose.model('Drive')