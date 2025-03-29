const express = require("express");
const router = express.Router();
const PrimeassetForm = require("../models/leadsCRUD");
const LeadsCRUD = require("../models/leadsCRUD");

const mongoose = require("mongoose");
  

router.get("/", (req, res, next) => {
  LeadsCRUD.find()
    .then((result) => {
      res.status(200).json({
        leadsCRUDData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", async (req, res) => {
  try {
    console.log("Incoming request data:", req.body); // Log request payload

    // Directly create a new lead with all provided fields
    const lead = new LeadsCRUD(req.body);

    // Save to MongoDB
    await lead.save();

    res.status(200).json({ message: "Lead created successfully", lead });
  } catch (err) {
    console.error("Error creating lead:", err.message); // Log error message
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});



router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  LeadsCRUD.findById(req.params.id).then(result=>{
res.status(200).json({
  leadsCRUD:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id',(req,res,next)=>{
  LeadsCRUD.remove({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        message:"Beds deleted",
        result:result
    })
}).catch(err=>{
    res.status(500).json({
        error:err
    })
})
})
 
module.exports = router;
