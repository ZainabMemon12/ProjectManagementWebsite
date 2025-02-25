const express = require('express')
const router = express.Router()
const {LoginAdmin,RegisterAdmin,getEmployee,getEmployeeById,updateEmployee,deleteEmployee} = require("../controllers/admin.controller.js")

router.post('/register',RegisterAdmin)
router.post('/login',LoginAdmin)
router.get('/',getEmployee)
router.get('/:id',getEmployeeById)
router.put('/:id',updateEmployee)
router.delete('/:id',deleteEmployee)


module.exports = router