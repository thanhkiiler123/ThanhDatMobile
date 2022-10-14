btnLogin.onclick = function (e) {
    var valid = true;
    if (!(usernameL.value.trim() && passwordL.value.trim())) {
        valid = false;
    }
    if (!valid) {
        e.preventDefault();
        btn_error = document.getElementById("errorL");
        btn_error.innerHTML = "Điền đầy đủ tài khoản và mật khẩu";
    }
};
