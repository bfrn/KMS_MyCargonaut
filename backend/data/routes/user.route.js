/**
 * Routing for /user
 * 
 * user_controller defines the functions, which are then used for certain requests
 */

const express = require('express')
const router = express.Router()

// Controller
const user_controller = require('../controllers/user.controller')
router.post('/register', user_controller.create_user)
router.get('/:id', user_controller.get_user_by_id)
router.get('/', user_controller.get_users)
router.delete('/:id', user_controller.delete_user_by_id)
router.put('/:id', user_controller.update_user_by_id)



module.exports = router
