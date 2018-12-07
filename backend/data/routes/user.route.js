/**
 * Routing for /user
 * 
 * user_controller defines the functions, which are then used for certain requests
 */

const express = require('express')
const router = express.Router()

// Controller
const user_controller = require('../controllers/user.controller')
router.post('/user', user_controller.user_create)

module.exports = router
