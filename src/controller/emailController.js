const Email = require("../models/emailModel");

exports.subscribe = async (req, res) => {
  
    try {
        const email = new Email({...req.body})
        await email.save();

       res.status(201).send({email})
        
    } catch (e) {
        res.status(500).send({e: 'Unable to create'})
    }
} 

