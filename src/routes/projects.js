const express = require ("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Projects = require("../models/projectModel");

router.post('/', verifyToken ,async  (req, res) => {
    try{
        const { name } = req.body
        const project = await Projects.create({name, members: [{userId: req.user.userId, role:"admin"}]})
        res.json({ message: 'Project created successfully', project })

    }catch(err){
        res.status(500).json({message:err.message})
    }
})


router.get('/', verifyToken ,async  (req, res) => {
    try{
        const projects = await Projects.find({"members.userId": req.user.userId})
        res.json({ message: 'Projects fetched successfully', projects })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:projectId', verifyToken ,async  (req, res) => {
    try{
        const {projectId} = req.params;
        await Projects.findByIdAndDelete(projectId)
        res.json({ message: 'Projects deleted successfully' })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports = router