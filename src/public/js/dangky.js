let form = document.querySelector(".auth__form");
let namee = document.querySelector(".name");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let repassword = document.querySelector(".re-password");
let inputs = form.querySelectorAll(".input");

// Check bỏ trống
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onblur = inputs[i].oninput = function () {
        if (inputs[i].value.trim()) {
            setSuccessFor(inputs[i]);
        } else {
            setErrorFor(inputs[i], "Trường này không được bỏ trống");
        }
    };
}
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const p = formControl.querySelector("p");
    p.innerText = message;
    formControl.className = "form-control invalid";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const p = formControl.querySelector("p");
    p.innerText = "";
    formControl.className = "form-control valid";
}
/*username.onblur = username.oninput = function () {
    if (username.value.trim().length < 6) {
        setErrorFor(username, 'Tên đăng nhập phải it nhất 6 ký tự');
    } else {
        setSuccessFor(username);
    }
}*/
/*function validateEmail(email) {
    var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(email);
}
email.onblur = email.oninput = function () {
    if (!validateEmail(email.value)) {
        setErrorFor(email, "Sai định dạng email");
    }
    else {
        setSuccessFor(email);
    }
}
//Check pass Mật khẩu phải có số và ký tự thường và ký tự in hoa
function numberPassword(password) {
    var numbers = /[0-9]/g;
    if (password.value.match(numbers)) {
        return true;
    }
    else return false;
}
function charactersPassword(password) {
    var characters = /[a-z]/g;
    if (password.value.match(characters)) {
        return true;
    }
    else return false;
}
function CharactersPassword(password) {
    var Characters = /[A-Z]/g;
    if (password.value.match(Characters)) {
        return true;
    }
    else return false;
}
password.onblur = password.oninput = function () {
    if (!numberPassword(password)||!charactersPassword(password)||!CharactersPassword(password)) {
        setErrorFor(password, "Mật khẩu phải có số, ký tự thường và ký tự in hoa ");
    }
    else {
        setSuccessFor(password);
    }
}*/
// Ký tự đầu là ký tự in hoa
/*function checkpass(password) {
    var Characters = /[A-Z]/g;
    var a = password.value.charAt(0);
    if (a.match(Characters)) {
        return true;
    }
    else {
        return false;
    }

}
password.onblur = password.oninput = function () {
    if (!checkpass(password)) {
        setErrorFor(password, "Ký tự đầu phải là ký tự in hoa ");
    }
    else {
        setSuccessFor(password);
    }
}*/
///^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ 8 ký tự 1hoa 1 thường 1 ddbiet  1 số
/* Tối thiểu 7-15 ký tự 1 in thường, 1 số 1 ký tự đb
function checkpass(password) {
    if (password.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)) {
        return true;
    }
    else {
        return false;
    }
}
    password.onblur = password.oninput = function () {
        if (!checkpass(password)) {
        setErrorFor(password, "Mật khẩu phải có số, ký tự thường và ký tự in hoa ");
    }
    else {
        setSuccessFor(password);
    }
}*/
// Check trùng password
repassword.onblur = repassword.oninput = function () {
    if (repassword.value.trim() === password.value.trim()) {
        setSuccessFor(repassword);
    } else {
        setErrorFor(repassword, "Mật khẩu chưa trùng khớp");
    }
};

btnReg.onclick = function (e) {
    var valid = true;
    if (
        !(
            namee.value.trim() ||
            username.value.trim() ||
            email.value.trim() ||
            password.value.trim() ||
            repassword.value.trim()
        )
    ) {
        //alert('Hãy điền đầy đủ các trường');
        let btn_error = document.getElementById("btn_error");
        btn_error.innerHTML = "Hãy điền đầy đủ các trường";
        valid = false;
    }
    if (!namee.value.trim()) {
        setErrorFor(namee, "Trường này không được bỏ trống");
        valid = false;
        console.log(valid);
    } else {
        setSuccessFor(namee);
    }

    if (!username.value.trim()) {
        setErrorFor(username, "Trường này không được bỏ trống");
        valid = false;
        console.log(valid);
    } else {
        setSuccessFor(username);
    }
    if (!email.value.trim()) {
        setErrorFor(email, "Trường này không được bỏ trống");
        valid = false;
        console.log(valid);
    } else {
        setSuccessFor(email);
    }
    if (!password.value.trim()) {
        setErrorFor(password, "Trường này không được bỏ trống");
        valid = false;
        console.log(valid);
    } else {
        setSuccessFor(password);
    }
    if (!repassword.value.trim()) {
        setErrorFor(repassword, "Trường này không được bỏ trống");
        valid = false;
        console.log(valid);
    } else {
        setSuccessFor(repassword);
    }
    if (!valid) {
        e.preventDefault();
    }
};
