const { json } = require("body-parser");
const pool = require("../configs/connectDB");
const asyncWrapper = require("../middleware/async");

//home
let getHomePage = asyncWrapper(async (req, res) => {
    const [rows, field] = await pool.execute(
        "Select * from `products` where id > 0 and id < 15",
    );
    return res.render("trangchu.ejs", {
        products: rows,
        username: req.session.username,
    });
});

//dang ky
let getDangKyPage = (req, res) => {
    return res.render("dangky.ejs");
};

let createNewUser = asyncWrapper(async (req, res) => {
    let { Name, Email, userName, Password } = req.body;
    let [rows, field] = await pool.execute(
        "Select * from `users` where user_name = ? and email = ?",
        [userName, Email],
    );
    if (rows[0] == undefined) {
        await pool.execute(
            "Insert into users(name,email,user_name,password) VALUES (?, ?, ?, ?)",
            [Name, Email, userName, Password],
        );
        return res.redirect("/");
    } else {
        res.send('<script>alert("da co ten dn va mk");</script>');
        res.end();
    }
});

//dang nhap
let getDangNhapPage = (req, res) => {
    return res.render("dangnhap.ejs");
};

let userLogIn = asyncWrapper(async (req, res) => {
    let username = req.body.usernameL;
    let password = req.body.passwordL;
    if (username && password) {
        let [rows, field] = await pool.execute(
            "select * from `users` where user_name = ? and password = ?",
            [username, password],
        );
        if (rows[0] == undefined) {
            res.send("Please re-enter Username and Password!");
            res.end();
        } else {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect("/");
        }
    } else {
        res.send("Please enter Username and Password!");
        res.end();
    }
});

let userLogout = asyncWrapper((req, res) => {
    req.session.destroy();
    return res.redirect("/");
});

//danh muc san pham
let getDanhMucSanPhamPage = asyncWrapper(async (req, res) => {
    const [rows, field] = await pool.execute("select * from `products`");
    return res.render("danhmucsanpham.ejs", {
        products: rows,
        username: req.session.username,
    });
});

let getIphonePage = asyncWrapper(async (req, res) => {
    const [rows, field] = await pool.execute(
        "Select * from `products` where id > 19 and id < 28",
    );
    return res.render("iPhone.ejs", {
        products: rows,
        username: req.session.username,
    });
});

let getSamSungPage = asyncWrapper(async (req, res) => {
    const [rows, field] = await pool.execute(
        "Select * from `products` where id > 29 and id < 38",
    );
    return res.render("samsung.ejs", {
        products: rows,
        username: req.session.username,
    });
});

let getOppoPage = asyncWrapper(async (req, res) => {
    const [rows, field] = await pool.execute(
        "Select * from `products` where id > 39 and id < 48",
    );
    return res.render("oppo.ejs", {
        products: rows,
        username: req.session.username,
    });
});

let getXiaoMiPage = asyncWrapper(async (req, res) => {
    const [rows, field] = await pool.execute(
        "Select * from `products` where id > 49 and id < 58",
    );
    return res.render("xiaomi.ejs", {
        products: rows,
        username: req.session.username,
    });
});

//gio hang
let getGioHangPage = asyncWrapper((req, res) => {
    let cart = req.session.cart;
    let total = req.session.total;
    // console.log(cart, total);

    return res.render("giohang.ejs", {
        cart: cart,
        total: total,
        username: req.session.username,
    });
});

function isProductInCart(cart, id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            return true;
        }
    }
    return false;
}
function calculateTotal(cart, req) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].price) {
            total += Number(cart[i].price) * Number(cart[i].quantity);
        } else {
            total += Number(cart[i].price) * Number(cart[i].quantity);
        }
    }
    req.session.total = total;
    return total;
}
let add_to_cart = asyncWrapper((req, res) => {
    let product = req.body;
    if (req.session.cart) {
        var cart = req.session.cart;
        if (!isProductInCart(cart, req.body.id)) {
            cart.push(product);
        }
    } else {
        req.session.cart = [product];
        var cart = req.session.cart;
    }
    calculateTotal(cart, req);
    return res.redirect("/danhmucsanpham");
});

let remove_from_cart = asyncWrapper((req, res) => {
    let id = req.body.id;
    let cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(cart.indexOf(i), 1);
        }
    }
    calculateTotal(cart, req);
    res.redirect("/giohang");
});

//gioi thieu
let getGioiThieuPage = (req, res) => {
    return res.render("gioithieu.ejs", { username: req.session.username });
};

//lien he
let getLienHePage = (req, res) => {
    return res.render("lienhe.ejs", { username: req.session.username });
};

//single san pham
let getTrangSanPhamChiTietPage = asyncWrapper(async (req, res) => {
    let productId = req.params.productId;
    let [rows, field] = await pool.execute(
        "select * from `products` where id = ?",
        [productId],
    );
    return res.render("trangsanphamchitiet.ejs", {
        products: rows[0],
        username: req.session.username,
    });
});

let thanhtoan = (req, res) => {
    let id = req.body.id;
    let quantity = req.body.quantity;
    let order = { id, quantity };
    console.log(order);
    if (id) {
        for (let i = 0; i < id.length; i++) {
            pool.execute(
                "update `products` set quantity = quantity - ? where id = ?",
                [quantity[i], id[i]],
            );
        }
        res.send('<script>alert("Mua hang thanh cong");</script>');
        return res.end();
    } else {
        res.send('<script>alert("Khong co gi trong gio hang");</script>');
        return res.end();
    }
};

let timkiem = asyncWrapper(async (req, res) => {
    let search = req.query.search;
    let [rows, field] = await pool.execute(
        "Select * from products where name like ?",
        ["%" + search + "%"],
    );
    if (rows[0] == undefined) {
        res.send("There is no product have that name, please enter again");
        res.end();
    } else {
        return res.render("danhmucsanpham.ejs", {
            products: rows,
            username: req.session.username,
        });
    }
});

module.exports = {
    getHomePage,
    getDangKyPage,
    createNewUser,
    getDangNhapPage,
    userLogIn,
    userLogout,
    getDanhMucSanPhamPage,
    getIphonePage,
    getOppoPage,
    getSamSungPage,
    getXiaoMiPage,
    getGioHangPage,
    add_to_cart,
    remove_from_cart,
    getGioiThieuPage,
    getLienHePage,
    getTrangSanPhamChiTietPage,
    thanhtoan,
    timkiem,
};
