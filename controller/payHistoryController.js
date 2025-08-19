import PayHistory from "../models/payHistoryModel.js";

/**
 * @desc    Get all payments
 * @route   GET /payments/:id
 * @access  Single client
 */

export async function getPayments(req, res){
    try{
        const clientId = req.params.id;
        const payments = await PayHistory.find({ clientId }).sort({paymentDate: -1});
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({msg: "server error, cannot fetch payments", error: error})
    }
}
