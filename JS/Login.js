
var emailValidation = document.getElementById("email-valid");
var passwordValidation = document.getElementById("pass-valid");
emailValidation.addEventListener('blur', EmailValidation);
passwordValidation.addEventListener('blur', PasswordValidation);

function EmailValidation() {
    validateEmail(this.value);
}

function PasswordValidation() {
    validatePassword(this.value);
}

// on submit
var submitButton = document.getElementById("submit-btn");
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateEmail(emailValidation.value) || !validatePassword(passwordValidation.value)) {
        alert("Please Type correct input!");
    } else {
        var Email = emailValidation.value;
        var passWord = passwordValidation.value;


        if (localStorage.getItem("email") == Email && localStorage.getItem("password") == passWord) {
            location.assign("Home.html");
        } else {
            alert("didn't find user!");
        }
    }
})

if (localStorage.getItem("email") && localStorage.getItem("password")) {
    location.replace("Home.html");
}
