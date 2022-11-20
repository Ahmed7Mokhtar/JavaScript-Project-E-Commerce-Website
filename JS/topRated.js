if (localStorage.getItem("email") && localStorage.getItem("password")) {
    const element = document.getElementsByClassName("sign-in")[1];
    var u = localStorage.getItem("username");
    element.innerText = u;
}


// products
displayCard();

// array to gold products
var cards;


function displayCard() {
    if (localStorage.Rate) {
        var rateItems = JSON.parse(localStorage.Rate);
        var categoryP = ["sandalss", "sneakerss", "shoess", "slipperss"];
        var saveCat = categoryP[1];
        console.log(rateItems[categoryP[1]].id);

        var xhr = new XMLHttpRequest();

        if (rateItems[categoryP[0]]) {
            saveCat = categoryP[0];
            xhr.open("get", "jsonFiles\\sandals.json", false);
        } else if (rateItems[categoryP[1]]) {
            saveCat = categoryP[1];
            xhr.open("get", "jsonFiles\\Sneakers.json", false);
        } else if (rateItems[categoryP[2]]) {
            saveCat = categoryP[2];
            xhr.open("get", "jsonFiles\\Shoes.json", false);
        } else {
            saveCat = categoryP[3];
            xhr.open("get", "jsonFiles\\Slippers.json", false);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cards = JSON.parse(xhr.responseText);

                for (card of cards) {
                    var temp = rateItems[saveCat].id;
                    if (temp == card.id) {
                        var singleCard = showCard(card);
                        document.getElementById("product").appendChild(singleCard);
                    }
                }
            }
        }

        xhr.send();
    }
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