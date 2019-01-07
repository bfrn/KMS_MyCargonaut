"use strict";
/**
 * Routing for /user
 *
 * user_controller defines the functions, which are then used for certain requests
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
// Controller
//const user_controller = require('../controllers/user.controller')
const UC = require("../controllers/user.controller");
let UserController = new UC.UserController();
class UserRoutes {
    routes(app) {
        router.post('/register', UserController.create_user);
        router.get('/:id', UserController.get_user_by_id);
        router.get('/', UserController.get_users);
        router.delete('/:id', UserController.delete_user_by_id);
        router.put('/:id', UserController.update_user_by_id);
    }
}
exports.UserRoutes = UserRoutes;
module.exports = router;
//# sourceMappingURL=user.route.js.map