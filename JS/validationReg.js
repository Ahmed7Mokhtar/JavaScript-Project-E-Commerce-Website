var fullName = document.getElementById("fullname");
fullName.addEventListener('blur', namevalid);
var Email = document.getElementById("emaill");
Email.addEventListener('blur', validemail);
var phoneNum = document.getElementById("phone");
phoneNum.addEventListener('blur', phonevalid);
var passWord = document.getElementById("pawws");
passWord.addEventListener('blur', passsvalid);
var confirmPass = document.getElementById("confirmm");
confirmPass.addEventListener('blur', confirm);


function namevalid() {
    validateName(this.value);
}
function validemail() {
    validateEmail(this.value);
}
function phonevalid() {
    validatePhone(this.value);
}
function passsvalid() {
    validatePassword(this.value);
}
function confirm() {
    confirmPassword(this.value);
}

var submitBtn = document.getElementById("submitButn");
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateName(fullName.value) || !validateEmail(Email.value) || !validatePhone(phoneNum.value) || !validatePassword(passWord.value) || !confirmPassword(confirmPass.value)) {
        alert("Please Type correct input!");
    } else {
        var userNameval = document.getElementById("userNameVal").value;
        localStorage.setItem("email", Email.value)
        localStorage.setItem("password", passWord.value);
        localStorage.setItem("username", userNameval);
        location.assign("Home.html");
    }
})

if (localStorage.getItem("email") && localStorage.getItem("password")) {
    location.replace("Home.html");
}


