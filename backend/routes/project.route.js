const express = require('express')
const router = express.Router()
const  {
    getProject,
    getProjectById,
    addProject,
    updateProject,
    deleteProject
  } = require('../controllers/project.controller.js');

router.get('/', getProject);
router.get('/:id', getProjectById);

router.post('/', addProject);

router.put('/:id', updateProject);

router.delete('/:id', deleteProject);


module.exports = router;