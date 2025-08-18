import mongoose from 'mongoose';

const PayHistorySchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

const PayHistory = mongoose.model('PayHistory', PayHistorySchema);
export default PayHistory;