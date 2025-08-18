import Bill from '../models/billModel.js';

/**
 * @desc    Create new Bill
 * @route   POST /bill/create/:id
 * @access  Single client 
 */


export async function createBill(req, res){
    try{
        const { name, category, amount, dueDate, recurrence, description } = req.body;

        if( !name || !category || !amount || !dueDate){
            return res.status(400).json({ msg: 'Failed create Bill' })
        }
        const userid = req.params.id;
        console.log("creating new bill")
        const newBill = new Bill({
            clientId: userid,
            name,
            category,
            amount,
            dueDate,
            recurrence,
            description,
        })
        await newBill.save()
        console.log("new bill created!")
        res.status(201).json({
            msg: 'New bill created',
            newBill
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }
}

/**
 * @desc    Get all Bills
 * @route   GET /bill/:id
 * @access  Single client 
 */

export async function getBill(req, res){
    try{
        const id = req.params.id;
        const reminders = await Bill.find({ clientId: id });
        res.status(200).json(reminders);
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }
}

/**
 * @desc    Get single Bills
 * @route   GET /bill/client._id/:id
 * @access  Single client 
 */

export async function getOneBill(req, res){
    const {clientId, billId } = req.params;
    try{
        const bill = await Bill.findOne({ _id: billId, clientId })
        if(!bill){
            return res.status(400).json({msg: `No bill found with id: ${billId}`})
        }
        res.status(200).json({bill});
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }
}

/**
 * @desc    Update single Bills
 * @route   PUT /bill/client._id/:id
 * @access  Single client 
 */

export async function updateBill(req, res){
    const {clientId, billId } = req.params;
    try{
        const updatedBill = await Bill.findByIdAndUpdate(
            {_id: billId, clientId },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if(!updatedBill)(
            res.status(400).json({ 
                msg: 'Bill Not Found',
            })
        );
        res.status(201).json({ 
            msg: 'Bill updated!',
            updatedBill
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }

}

/**
 * @desc    Delete single Bills
 * @route   DELETE /bill/client._id/:id
 * @access  Single client 
 */

export async function deleteBill(req, res){
    const {clientId, billId } = req.params; 
    try{
        const deletedBill = await Bill.findByIdAndDelete({_id: billId, clientId })
        if(!deletedBill)(
            res.status(400).json({ 
                msg: 'Bill Not Found',
            })
        )
        res.status(201).json({ 
            msg: 'Bill Deleted!',
            deletedBill
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }
}