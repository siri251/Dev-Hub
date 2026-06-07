const express = require("express");
const router = express.Router();
const Tasks = require("../models/taskModel")
const verifyToken = require("../middleware/auth")

router.post("/", verifyToken ,async (req,res)=>{
    try{
        const {name, projectId} = req.body;
        const task = await Tasks.create({name, projectId});
        res.json({message: "task created sucessfully"})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

router.get("/", verifyToken,async (req,res)=>{
    try{
        const {projectId} = req.body;
        const tasks = await Tasks.find({projectId});
        res.json({message: "tasks fetched sucessfully", tasks})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

router.delete("/:taskId", verifyToken ,async (req,res)=>{
    try{
        const { taskId } = req.params;
        await Tasks.findByIdAndDelete(taskId);
        res.json({message: "tasks deleted sucessfully"})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

router.get("/:taskId", verifyToken,async (req,res)=>{
    try{
        const {taskId} = req.params;
        const tasks = await Tasks.findById(taskId);
        res.json({message: "tasks fetched sucessfully", tasks})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

router.patch('/:taskId', verifyToken, async (req, res) => {
    try {
        const { taskId } = req.params
        const task = await Tasks.findByIdAndUpdate(
            taskId,
            { $set: req.body },
            { new: true }       
        )
        res.json({ message: 'Task updated successfully', task })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;