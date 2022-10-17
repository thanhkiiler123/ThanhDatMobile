const pool = require("../configs/connectDB");
//products
let getAllProducts = async (req, res) => {
    try {
        let [rows, field] = await pool.execute("Select * from `products`");
        return res.status(200).json({
            message: "ok",
            data: rows,
        });
    } catch (err) {
        console.log(err);
    }
};

let createProduct = async (req, res) => {
    try {
        let {
            id,
            images,
            name,
            price,
            resolution,
            os,
            frontcam,
            backcam,
            ram,
            rom,
            pin,
            quantity,
        } = req.body;
        if (
            !id ||
            !images ||
            !name ||
            !price ||
            !resolution ||
            !os ||
            !frontcam ||
            !backcam ||
            !ram ||
            !rom ||
            !pin ||
            !quantity
        ) {
            return res.status(404).json({
                message: "missing required params",
            });
        }
        let [rows, field] = await pool.execute(
            "Select * from `products` where id = ?",
            [id],
        );
        if (rows[0] == undefined) {
            await pool.execute(
                "Insert into products(id, images, name, price, resolution, os, frontcam, backcam, ram, rom, pin, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    id,
                    images,
                    name,
                    price,
                    resolution,
                    os,
                    frontcam,
                    backcam,
                    ram,
                    rom,
                    pin,
                    quantity,
                ],
            );
            return res.status(200).json({
                message: "ok",
            });
        } else {
            return res.status(404).json({
                message: "no product",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

let updateProduct = async (req, res) => {
    try {
        let {
            id,
            images,
            name,
            price,
            resolution,
            os,
            frontcam,
            backcam,
            ram,
            rom,
            pin,
            quantity,
        } = req.body;
        if (
            !id ||
            !images ||
            !name ||
            !price ||
            !resolution ||
            !os ||
            !frontcam ||
            !backcam ||
            !ram ||
            !rom ||
            !pin ||
            !quantity
        ) {
            return res.status(404).json({
                message: "missing required params",
            });
        }
        let [rows, field] = await pool.execute(
            "Select * from `products` where id = ?",
            [id],
        );
        if (rows[0]) {
            await pool.execute(
                "update products set images = ?, name = ?, price = ?, resolution = ?, os = ?, frontcam = ?, backcam = ?, ram = ?, rom = ?, pin = ?, quantity = ? where id = ?",
                [
                    images,
                    name,
                    price,
                    resolution,
                    os,
                    frontcam,
                    backcam,
                    ram,
                    rom,
                    pin,
                    quantity,
                    id,
                ],
            );
            return res.status(200).json({
                message: "ok",
            });
        } else {
            return res.status(404).json({
                message: "no product",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

let deleteProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        if (!productId) {
            return res.status(404).json({
                message: "missing required params",
            });
        }
        let [rows, field] = await pool.execute(
            "Select * from `products` where id = ?",
            [productId],
        );
        if (rows[0]) {
            await pool.execute("delete from `products` where id = ?", [
                productId,
            ]);
            return res.status(200).json({
                message: "ok",
            });
        } else {
            return res.status(404).json({
                message: "no product",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

let getAllUsers = async (req, res) => {
    try {
        let [rows, field] = await pool.execute("Select * from `users`");
        return res.status(200).json({
            message: "ok",
            data: rows,
        });
    } catch (err) {
        console.log(err);
    }
};

let createUsers = async (req, res) => {
    try {
        let { name, email, user_name, password } = req.body;
        if (!name || !email || !user_name || !password) {
            return res.status(404).json({
                message: "missing required params",
            });
        }
        let [rows, field] = await pool.execute(
            "Select * from `users` where email = ?",
            [email],
        );
        if (rows[0] == undefined) {
            await pool.execute(
                "Insert into users(name, email, user_name, password) VALUES (?, ?, ?, ?)",
                [name, email, user_name, password],
            );
            return res.status(200).json({
                message: "ok",
            });
        } else {
            return res.status(404).json({
                message: "can't create new user",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

let updateUsers = async (req, res) => {
    try {
        let { name, email, user_name, password } = req.body;
        if (!name || !email || !user_name || !password) {
            return res.status(404).json({
                message: "missing required params",
            });
        }
        let [rows, field] = await pool.execute(
            "Select * from `users` where email = ?",
            [email],
        );
        if (rows[0]) {
            await pool.execute(
                "update users set name = ?, user_name = ?, password = ? where email = ?",
                [name, user_name, password, email],
            );
            return res.status(200).json({
                message: "ok",
            });
        } else {
            return res.status(404).json({
                message: "can't update user",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

let deleteUser = async (req, res) => {
    try {
        let userEmail = req.params.email;
        if (!userEmail) {
            return res.status(404).json({
                message: "missing required params",
            });
        }
        let [rows, field] = await pool.execute(
            "Select * from `users` where email = ?",
            [userEmail],
        );
        if (rows[0]) {
            await pool.execute("delete from `users` where email = ?", [
                userEmail,
            ]);
            return res.status(200).json({
                message: "ok",
            });
        } else {
            return res.status(404).json({
                message: "no user",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllUsers,
    createUsers,
    updateUsers,
    deleteUser,
};
