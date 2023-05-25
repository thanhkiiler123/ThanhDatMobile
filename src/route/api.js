const express = require("express");
const apiController = require("../controller/apiController");

let router = express.Router();

const initAPIRoute = (app) => {
    router.get("/products", apiController.getAllProducts);
    router.post("/create-product", apiController.createProduct);
    router.put("/update-products", apiController.updateProduct);
    router.delete("/delete-product/:id", apiController.deleteProduct);
    router.get("/users", apiController.getAllUsers);
    router.post("/create-user", apiController.createUsers);
    router.put("/update-users", apiController.updateUsers);
    router.delete("/delete-user/:email", apiController.deleteUser);
    return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
