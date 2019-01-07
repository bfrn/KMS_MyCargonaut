"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const PORT = 8080;
app_1.default.listen(PORT, (err) => {
    if (err)
        return console.log("Error Server Start");
    return console.log('Express Server Listing on http://Localhost:' + PORT);
});
//# sourceMappingURL=index.js.map