"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = require("../controllers/user.controller");
class Routes {
    routes(app) {
        let userController = new UserController();
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: `/GET request successfull`
            });
        });
        app.route('/api/users/register')
            .post(userController.create_user);
        app.route('/api/users')
            .get(userController.get_users);
        app.route('/api/users/:id')
            .get(userController.get_user_by_id)
            .put(userController.update_user_by_id)
            .delete(userController.delete_user_by_id);
    }
}
exports.Routes = Routes;
//app.use('/api/users', userRoute.UserRoutes)
//# sourceMappingURL=main.route.js.map