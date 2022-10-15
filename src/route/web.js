const express = require("express");
const homeController = require("../controller/homeController");

let router = express.Router();

const initWebRoute = (app) => {
    //home
    router.get("/", homeController.getHomePage);
    //dang ky
    router.get("/dangky", homeController.getDangKyPage);
    router.post("/createNewUser", homeController.createNewUser);
    //dang nhap
    router.get("/dangnhap", homeController.getDangNhapPage);
    router.post("/auth", homeController.userLogIn);
    router.get("/dangxuat", homeController.userLogout);
    //danh muc san pham
    router.get("/danhmucsanpham", homeController.getDanhMucSanPhamPage);
    router.get("/iPhone", homeController.getIphonePage);
    router.get("/oppo", homeController.getOppoPage);
    router.get("/samsung", homeController.getSamSungPage);
    router.get("/xiaomi", homeController.getXiaoMiPage);
    //gio hang
    router.get("/giohang", homeController.getGioHangPage);
    router.post("/add_to_cart", homeController.add_to_cart);
    router.post("/remove_from_cart", homeController.remove_from_cart);
    //gioithieu
    router.get("/gioithieu", homeController.getGioiThieuPage);
    //lien he
    router.get("/lienhe", homeController.getLienHePage);
    //single san pham
    router.get(
        "/trangsanphamchitiet/:productId",
        homeController.getTrangSanPhamChiTietPage,
    );
    //thanh toan
    router.post("/thanhtoan", homeController.thanhtoan);
    return app.use("/", router);
};

module.exports = initWebRoute;
