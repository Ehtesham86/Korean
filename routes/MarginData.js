const express = require("express");
const router = express.Router();
// const PrimeassetForm = require("../models/leadsCRUD");
const MarginData = require("../models/MarginData");

const mongoose = require("mongoose");
  

router.get("/", (req, res, next) => {
    MarginData.find()
    .then((result) => {
      res.status(200).json({
        marginDataCRUDData: result,
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
    const lead = new MarginData(req.body);

    // Save to MongoDB
    await lead.save();

    res.status(200).json({ message: "Lead created successfully", lead });
  } catch (err) {
    console.error("Error creating lead:", err.message); // Log error message
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    console.log("Updating Lead ID:", req.params.id); // Log the ID
    console.log("Updated Data:", req.body); // Log the incoming data

    const updatedLead = await MarginData.findByIdAndUpdate(
      req.params.id, // Find by ID
      req.body, // Update with new data
      { new: true, runValidators: true } // Return updated document & validate fields
    );

    if (!updatedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated successfully", lead: updatedLead });
  } catch (err) {
    console.error("Error updating lead:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});




router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  MarginData.findById(req.params.id).then(result=>{
res.status(200).json({
    marginData:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await MarginData.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Bed not found" });
        }
        res.status(200).json({
            message: "Bed deleted successfully",
            result: result
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

 
module.exports = router;
