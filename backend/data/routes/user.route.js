const express = require('express')
const router = express.Router()

// Controller
const user_controller = require('../controllers/user.controller')
router.post('/user', user_controller.user_create)

module.exports = router
