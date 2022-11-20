function validateEmail(email) {
    var regExp = /^[a-z0-9\.\_]{3,}\@[a-z]{3,}(.com|.org|.net)$/i;

    if (!regExp.test(email)) {
        document.getElementById("email-sibling").innerText = "invalid Email"
    }
    else {
        document.getElementById("email-sibling").innerText = "";
        return true;
    }
}

function validatePassword(password) {
    var regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!regExp.test(password)) {
        document.getElementById("pass-sibling").innerText = "invalid Password"
    }
    else {
        document.getElementById("pass-sibling").innerText = "";
        return true;
    }
}

function validateName(name) {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
        document.getElementById("fullname-sibling").innerText = "invalid name"
    } else {
        document.getElementById("fullname-sibling").innerText = "";
        return true;
    }
}

function validatePhone(phone) {
    var phoneregx = /^\d{11}$/
    {
        if (!phoneregx.test(phone)) {
            document.getElementById("phone-sibling").innerText = "invalid Phone number!";
        }
        else {
            document.getElementById("phone-sibling").innerText = "";
            return true;
        }

    }
}

function confirmPassword() {
    var pass = document.getElementById("confirmm").value;
    var paas2 = document.getElementById('pawws').value;
    if (pass == paas2) {
        document.getElementById("confirm-sibling").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("confirm-sibling").innerHTML = "is not the same as password!";
        pass.value = "";
        paas2.value = "";
    }
}