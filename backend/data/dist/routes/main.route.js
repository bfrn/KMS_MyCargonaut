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
        //app.use('/api/users', userRoute.UserRoutes)
    }
}
exports.Routes = Routes;
//# sourceMappingURL=main.route.js.map