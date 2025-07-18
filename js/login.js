const btnLogin = document.getElementById("btn-login");

// Sự kiện đăng nhập tài khoản
btnLogin.addEventListener("click", function () {
    var username = accountFieldLogin.value;
    var password = "";
    var success = false;
    if (passwordFieldLogin.tagName.toLowerCase() === "input")
        password = passwordFieldLogin.value;
    else password = passwordFieldLogin.textContent;

    accounts.forEach((element) => {
        if (element.username == username && element.pass == password) {
            success = true;
            return;
        }
    });

    if (success) {
        // Kiểm tra nếu tài khoản là "AdminDokatadamage" và mật khẩu là "M4d4f4k4r101@"
        if (username === "AdminDokatadamage" && password === "M4d4f4k4r101@") {
            alert("Đăng nhập thành công!");
            localStorage.setItem('loggedInUser', username);  // Lưu tài khoản vào localStorage
            window.location.href = "../index.html";  // Chuyển hướng đến trang chính
        } else {
            alert("Bạn không có quyền truy cập trang Admin!");
        }
    } else {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
});

// Lấy danh sách các tài khoản hiện có trong Local Storage
var accounts = JSON.parse(localStorage.getItem("accounts"));
if (accounts == null) {
    accounts = [];
}

// Tham chiếu đến các thẻ
const passwordFieldLogin = document.querySelector(
    '.login-form .input-box input[type="password"]'
);
const accountFieldLogin = document.getElementById("account-field-login");
const errorAccLogin = document.getElementById("error-acc-login");
const errorPassLogin = document.getElementById("error-pass-login");
const errorAccRegister = document.getElementById("error-acc-register");

// Sự kiện kiểm tra mật khẩu có đúng định dạng không, nếu sai báo lỗi
passwordFieldLogin.addEventListener("change", function () {
    checkPassword(errorPassLogin, passwordFieldLogin);
});

// Kiểm tra định dạng của password
function checkPassword(error, field) {
    var pass = field.value;
    if (!isPasswordCorrect(pass)) {
        error.innerHTML =
            "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái, 1 chữ số, một ký tự đặc biệt";
        error.parentNode.style.marginBottom = "60px";
    } else {
        error.innerHTML = "";
        error.parentNode.style.marginBottom = "30px";
    }
}

// Kiểm tra mật khẩu đúng định dạng
function isPasswordCorrect(pass) {
    var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).{8,}$/;
    return regex.test(pass);
}

// Tham chiếu đến các thẻ
const showHidePasswordLogin = document.getElementById("show-hide-pass-login");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const showHidePasswordRegister = document.getElementById(
    "show-hide-pass-register"
);
const showHidePasswordRegisterAgain = document.getElementById(
    "show-hide-pass-register-again"
);
const passwordFieldRegister = document.querySelector(
    '.register-form .input-box input[type="password"]'
);
const passwordFieldAgainRegister = document.getElementById(
    "input-password-again"
);
const accountFieldRegister = document.getElementById("account-field-register");

const errorPassRegister = document.getElementById("error-pass-register");
const errorPassAgainRegister = document.getElementById(
    "error-pass-again-register"
);
const btnRegister = document.getElementById("btn-register");

// Sự kiện kích hoạt lật thẻ
registerLink.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".login-form").style.transform = "rotateY(180deg)";
    document.querySelector(".register-form").style.transform = "rotateY(0deg)";
    // Điều chỉnh wrapper
    let wrapperElement = document.querySelector(".wrapper");
    if (wrapperElement) {
        wrapperElement.style.height = "550px";
    } else {
        console.log('Phần tử với class "wrapper" không tồn tại trong tài liệu.');
    }
    // Điều chỉnh title
    document.title = "Đăng ký";
});

loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".login-form").style.transform = "rotateY(0deg)";
    document.querySelector(".register-form").style.transform = "rotateY(180deg)";
    // Điều chỉnh wrapper
    let wrapperElement = document.querySelector(".wrapper");
    if (wrapperElement) {
        wrapperElement.style.height = "500px";
    } else {
        console.log('Phần tử với class "wrapper" không tồn tại trong tài liệu.');
    }
    // Điều chỉnh title
    document.title = "Đăng nhập";
});

// End sự kiện kích hoạt lật thẻ

// Tạo sự kiện cho show/hide password
showHidePasswordLogin.addEventListener("click", function () {
    if (showHidePasswordLogin.classList.contains("fa-lock")) {
        passwordFieldLogin.type = "text";
        showHidePasswordLogin.classList.remove("fa-lock");
        showHidePasswordLogin.classList.add("fa-unlock");
    } else {
        passwordFieldLogin.type = "password";
        showHidePasswordLogin.classList.remove("fa-unlock");
        showHidePasswordLogin.classList.add("fa-lock");
    }
});

showHidePasswordRegister.addEventListener("click", function () {
    if (showHidePasswordRegister.classList.contains("fa-lock")) {
        passwordFieldRegister.type = "text";
        showHidePasswordRegister.classList.remove("fa-lock");
        showHidePasswordRegister.classList.add("fa-unlock");
    } else {
        passwordFieldRegister.type = "password";
        showHidePasswordRegister.classList.remove("fa-unlock");
        showHidePasswordRegister.classList.add("fa-lock");
    }
});

showHidePasswordRegisterAgain.addEventListener("click", function () {
    if (showHidePasswordRegisterAgain.classList.contains("fa-lock")) {
        passwordFieldAgainRegister.type = "text";
        showHidePasswordRegisterAgain.classList.remove("fa-lock");
        showHidePasswordRegisterAgain.classList.add("fa-unlock");
    } else {
        passwordFieldAgainRegister.type = "password";
        showHidePasswordRegisterAgain.classList.remove("fa-unlock");
        showHidePasswordRegisterAgain.classList.add("fa-lock");
    }
});

// End tạo sự kiện cho show/hide password

// Gán sự kiện check sau khi nhập đk tài khoản
accountFieldRegister.addEventListener("change", function () {
    var acc = accountFieldRegister.value;
    var accountExists = false;
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].username == acc) {
            accountExists = true;
            break;
        }
    }
    if (accountExists) {
        errorAccRegister.innerHTML = "Tên tài khoản đã tồn tại";
        errorAccRegister.parentNode.style.marginBottom = "40px";
    } else {
        errorAccRegister.innerHTML = "";
        errorAccRegister.parentNode.style.marginBottom = "0px";
    }
});

// Gán sự kiện check sau khi mật khẩu đã được nhập có đúng định dạng ko
passwordFieldRegister.addEventListener("change", function () {
    checkPassword(errorPassRegister, passwordFieldRegister);
    checkPasswordMatches(passwordFieldRegister, passwordFieldAgainRegister);
});

passwordFieldAgainRegister.addEventListener("change", function () {
    checkPassword(errorPassAgainRegister, passwordFieldAgainRegister);
    checkPasswordMatches(passwordFieldRegister, passwordFieldAgainRegister);
});

// Mật khẩu có trùng khớp ko
function checkPasswordMatches(pass, passAgain) {
    var passStr = "";
    var passAgainStr = "";

    if (pass.tagName.toLowerCase() === "input") passStr = pass.value;
    else passStr = pass.textContent;

    if (passAgain.tagName.toLowerCase() === "input") passAgainStr = passAgain.value;
    else passAgainStr = passAgain.textContent;

    if (passStr != passAgainStr) {
        errorPassAgainRegister.innerHTML = "Mật khẩu không trùng khớp";
        errorPassAgainRegister.parentNode.style.marginBottom = "40px";
    } else {
        errorPassAgainRegister.innerHTML = "";
        errorPassAgainRegister.parentNode.style.marginBottom = "30px";
    }
}

// Sự kiện đăng ký tài khoản
btnRegister.addEventListener("click", function () {
    var passStr = "";
    if (passwordFieldRegister.tagName.toLowerCase() === "input")
        passStr = passwordFieldRegister.value;
    else passStr = passwordFieldRegister.textContent;

    var newAcc = {
        username: `${accountFieldRegister.value}`,
        pass: `${passStr}`,
    };
    accounts.push(newAcc);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("Đăng ký thành công! Vui lòng đăng nhập để mua hàng!");
});
