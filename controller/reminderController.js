import Reminder from "../models/reminderModel.js";

/**
 * @desc    Create new reminder
 * @route   POST /reminder/create/:id
 * @access  Public (for now)
 */

export async function createReminder(req, res) {
    try{
        const userId = req.params.id;
        const { amount, date } = req.body;

        if(!amount || !date){
            return res.status(400).json({ error: 'Please enter the amount to be paid and Due date'});
        };

        console.log('creating new reminder!');
        const newReminder = new Reminder({
            user: userId,
            amount: amount,
            paymentDate: date
        });
        await newReminder.save()
        console.log('New reminder created!');
        res.status(201).json({ msg: "new reminder created"});
    }catch(error){
        console.log('server error: ', error.message);
        res.status(500).json({error: "Server error"});
    }
}


/**
 * @desc    Get all User's reminders
 * @route   GET /reminder/:id
 * @access  Public 
 */


export async function getAllReminder(req, res){
    try{
        const userId = req.params.id;
        const response = await Reminder.find({user: userId})
            .populate('user', 'fullName email number')
        
        if(!response.length){
            return res.status(404).json({msg: "No reminder found"})
        }

        res.status(200).json({response});
    }catch(error){
        console.log("Server error: ",error.message);
        res.status(404).json({error: "Error fetching reminders"});
    }
}

