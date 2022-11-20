if (!localStorage.getItem("email") && !localStorage.getItem("password")) {
    location.assign("Home.html");
}

if (localStorage.Cart) {
    var productsArr = JSON.parse(localStorage.Cart);

    for (prd in productsArr) {
        var img;
        var xhr = new XMLHttpRequest();

        if (productsArr[prd].cat == "sandals") {
            xhr.open("get", "jsonFiles\\sandals.json", false);
        } else if (productsArr[prd].cat == "sneakers") {
            xhr.open("get", "jsonFiles\\Sneakers.json", false);
        } else if (productsArr[prd].cat == "shoes") {
            xhr.open("get", "jsonFiles\\Shoes.json", false);
        } else {
            xhr.open("get", "jsonFiles\\Slippers.json", false);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                products = JSON.parse(xhr.responseText);

                for (product of products) {
                    if (product.id == productsArr[prd].id) {
                        img = product.image;
                    }
                }
            }
        }

        xhr.send();


        var prdElement = `<div>
          <span><img id="prdImage" src="${img}" alt="" width="60px"
              style="margin-right: 50px;"></span>
          <span class="prdName" style="margin-right: 60px; font-weight: 700;">${productsArr[prd].name}</span>
          <input class="price1" type="text" readonly value="${productsArr[prd].price}">
          <input class="quantuty1" type="number" min="0" value="${productsArr[prd].quantity}" style="margin-right: 30px;" onchange="changeTotal('${productsArr[prd].price}', event)">
          <input class="total1" type="text" readonly value="${productsArr[prd].quantity * productsArr[prd].price}">
        </div>`;

        document.getElementById("productDetails").innerHTML += prdElement;
    }
}

// change cost total
window.onload = (event) => {
    var prices = document.getElementsByClassName("total1");
    var totalPrices = 0;
    for (price of prices) {
        totalPrices += Number(price.value)
    }

    document.getElementById("tCost").value = totalPrices.toFixed(2);
};
// end of change cost total

// change sub total and cost total (if sub total changed)
function changeTotal(price, e) {
    if (e.target.value == '0') {
        var remItem = confirm("Do you want to remove this item from cart?");
        if (remItem == true) {
            var parent = e.target.parentElement;
            document.getElementById("tCost").value = Number(document.getElementById("tCost").value) - Number(e.target.nextElementSibling.value);
            parent.remove();
        } else {
            e.target.value = 1;
        }

    } else {
        e.target.nextElementSibling.value = e.target.value * price;
        // document.getElementById("tCost").value = Number(document.getElementById("tCost").value) + Number(price);
        var subTotals = document.getElementsByClassName("total1");
        var temp = 0;
        for (subtotal of subTotals) {
            temp += Number(subtotal.value);
        }

        // only two decimal points 
        document.getElementById("tCost").value = temp.toFixed(2);
    }
}
// end of change sub total and cost total (if sub total changed)

// var userName = document.getElementById("username1");
// userName.addEventListener('blur', namevalid);
// var Email = document.getElementById("email1");
// Email.addEventListener('blur', validemail);
// var phoneNum = document.getElementById("phone1");
// phoneNum.addEventListener('blur', phonevalid);
// var passWord = document.getElementById("paswword1");
// passWord.addEventListener('blur', passsvalid);
// var visa = document.getElementById("visa");
// visa.addEventListener('blur', confirm);


function namevalid() {

    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var name = document.getElementById('username1').value;
    if (!regName.test(name)) {
        alert('Invalid name given.');
        document.getElementById('username1').value = "";

    } else {
    }
}
function validemail1() {
    var email = document.getElementById('email1').value;
    var regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    {
        if (!regemail.test(email)) {
            alert('INValid Email given.');
            document.getElementById('emaill').value = "";
        }
        else {
        }

    }
}
function phonevalid1() {
    var phonenumber = document.getElementById('phone1').value;
    var phoneregx = /^\d{11}$/
    {
        if (!phoneregx.test(phonenumber)) {
            alert('INValid  Number given.');
            document.getElementById('phone1').value = "";
        }
        else {
        }

    }
}
function passsvalid() {
    var passw = document.getElementById('paswword1').value;
    var passregx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    {
        if (!passregx.test(passw)) {
            alert('INValid  password given.');
            document.getElementById('paswword1').value = "";
        }
        else {
        }

    }
}
function visavalidate() {
    var visanumber = document.getElementById('visa').value;
    var phoneregx = /^(?:3[47][0-9]{13})$/;
    {
        if (!phoneregx.test(visanumber)) {
            alert('Visa number incorrect');
            document.getElementById('visanumber').value = "";
        }
        else {
        }

    }
}


function thank() {
    alert("thanks for sell")
}


