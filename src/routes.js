const express = require("express")
const routes = express.Router();

const UserController = require("./controllers/UserControllers");
const UserMiddleware = require("./middlewares/UserMiddleware");

routes.get("/users", UserController.index)
routes.post("/users", UserController.store )

routes.put("/users/:id", UserMiddleware.validateID, UserController.update)
routes.delete("/users/:id", UserMiddleware.validateID, UserController.delete)



module.exports = routes