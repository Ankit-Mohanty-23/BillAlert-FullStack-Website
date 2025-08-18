import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: { 
    type: String,
    required: true,
    enum: [
        'Household', 
        'Entertainment', 
        'Insurance', 
        'Education', 
        'Others'
    ] 
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  recurrence: {
    type: String,
    enum: [
        'monthly', 
        'yearly', 
        'none'
    ],
    default: 'monthly'
  },
  description: {
    type: String,
    default: ""
  }
},{
  timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);
export default Bill;
