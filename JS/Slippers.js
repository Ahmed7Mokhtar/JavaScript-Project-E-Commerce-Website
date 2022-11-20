if (localStorage.getItem("email") && localStorage.getItem("password")) {
    const element = document.getElementsByClassName("sign-in")[1];
    var u = localStorage.getItem("username");
    element.innerText = u;

    if (localStorage.getItem("email") != "rooneya250@gmail.com") {
        document.getElementById("admin").style.display = "none";
    }
} else {
    document.getElementById("admin").style.display = "none";
}


displayCard();

// array to gold products
var cards;

function displayCard() {
    var xhr = new XMLHttpRequest();

    xhr.open("get", "jsonFiles\\Slippers.json", false);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cards = JSON.parse(xhr.responseText);

            console.log(cards)
            for (card of cards) {
                var singleCard = showCard(card);
                document.getElementById("product").appendChild(singleCard);
            }
        }
    }

    xhr.send();
}

function showCard(eachCard) {
    var card = document.createElement("div");
    card.setAttribute("id", eachCard.id);
    card.setAttribute("class", "div2");
    card.innerHTML = `<div class="photo">
                <div class="discount">
                    <h4>${eachCard.discound}</h4>
                </div>
                <div class="discount2">
                    <i class="material-icons">favorite</i>
                </div>
                <a href="#" onclick="showDetails(${eachCard.id}, '${eachCard.category}')">
                    <div class="thumb">
                        <img src="${eachCard.image}">
                    </div>
                </a>
                <div class="shoes-name">
                    <h3>${eachCard.name}</h3>
                </div>

                <div class="shoesprice">
                    <h3>€${eachCard.price}</h3>
                </div>
                <div>
                    <a href="" onclick="addToCart(${eachCard.id}, '${eachCard.name}', '${eachCard.image}', '${eachCard.price}', '${eachCard.category}')"><i class='fa fa-shopping-bag'></i></a>
                </div>
            </div>`;

    return card;
}

// show product in product details
function showDetails(id, catg) {
    sessionStorage.setItem("item", id);
    sessionStorage.setItem("cat", catg);
    location.assign("productDetails.html");
}

// end of product details

// add to cart

function addToCart(prdId, prdName, prdImage, prdPrice, prdCat) {
    console.log("clicked");
    var cartProducts = {};
    // check if there any products in cart
    if (localStorage.Cart) {
        cartProducts = JSON.parse(localStorage.Cart);
    }

    if (cartProducts[prdName]) {
        cartProducts[prdName].quantity++;
    }
    else {
        cartProducts[prdName] = {
            id: prdId,
            name: prdName,
            image: prdImage,
            price: prdPrice,
            cat: prdCat,
            quantity: 1
        }
    }

    localStorage.Cart = JSON.stringify(cartProducts);
}

// end of add to cart

var sizesArr = document.querySelectorAll(".all-size");

for (siz of sizesArr) {
    siz.addEventListener('click', filterProducts);
}

function filterProducts(e) {

    var filterdCards = cards.filter((card) => {
        // e.target.value is a string (==)
        return card.size == e.target.value;
    });

    if (filterdCards.length !== 0) {
        document.getElementById("product").innerHTML = "";
        for (item of filterdCards) {
            var singleCard = showCard(item);
            document.getElementById("product").appendChild(singleCard);
        }
    } else {
        document.getElementById("product").innerHTML = `<h1>No Matched Items!<h1>`;
    }
}


document.getElementById("reset-size").addEventListener('click', removeSize);

function removeSize(e) {
    for (siz of sizesArr) {
        siz.removeEventListener('click', filterProducts);
    }
}

// end of sizes ----------------------------------------------------------------------------------------

// begin of featured (sort by pricing)

function showContent() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function sortBy(id) {
    var text = document.getElementById(id).innerText;
    var temp = text.split(": ");

    var filteredCard;
    if (temp[1] === "High to Low") {
        filteredCard = cards.sort((a, b) => {
            return b.price - a.price;
        })
    } else {
        filteredCard = cards.sort((a, b) => {
            return a.price - b.price;
        })
    }


    document.getElementById("product").innerHTML = "";

    for (card of filteredCard) {
        var singleCard = showCard(card);
        document.getElementById("product").appendChild(singleCard);
    }
}
// end of featured

// logout

document.getElementById("signin_name").addEventListener('click', logout);

function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    location.assign("Login.html");
}


// end of logout