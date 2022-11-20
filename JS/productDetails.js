
var xhr = new XMLHttpRequest();

if (sessionStorage.getItem("cat") == "sandals") {
    xhr.open("get", "jsonFiles\\sandals.json", false);
} else if (sessionStorage.getItem("cat") == "sneakers") {
    xhr.open("get", "jsonFiles\\Sneakers.json", false);
} else if (sessionStorage.getItem("cat") == "shoes") {
    xhr.open("get", "jsonFiles\\Shoes.json", false);
} else {
    xhr.open("get", "jsonFiles\\Slippers.json", false);
}

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        cards = JSON.parse(xhr.responseText);

        for (card of cards) {
            if (sessionStorage.getItem("item") == card.id) {
                var singleCard = showCard(card);
                document.getElementById("productdetails").appendChild(singleCard);
                localStorage.removeItem("item");
                localStorage.removeItem("cat");
            }
        }
    }
}

xhr.send();



function showCard(eachCard) {
    var card = document.createElement("div");
    card.setAttribute("id", eachCard.id);
    card.setAttribute("class", "container");
    card.innerHTML = `<div class = "product-div">
    <div class = "product-div-left">
        <div class = "img">
            <img src = "${eachCard.image}" id="bgImage">
        </div>
        <div class = "hover-container">
            <div><img src = "${eachCard.image1}" id="imgOne" onclick="showImage(event)"></div>
            <div><img src = "${eachCard.image2}" id="imgTwo" onclick="showImage(event)"></div>
            <div><img src = "${eachCard.image3}" id="imgThr" onclick="showImage(event)"></div>
        </div>
    </div>
    <div class = "product-div-right">
        <span class = "product-name">${eachCard.name}</span>
         <span class = "product-price">$ ${eachCard.price}</span>
       
        <span>VAT included</span>
        <div class = "product-rating">
            <div class="rate">
        <input class="ratingStar" type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input class="ratingStar" type="radio" id="star4" name="rate" value="4"/>
        <label for="star4" title="text">4 stars</label>
        <input class="ratingStar" type="radio" id="star3" name="rate" value="3"/>
        <label for="star3" title="text">3 stars</label>
        <input class="ratingStar" type="radio" id="star2" name="rate" value="2"/>
        <label for="star2" title="text">2 stars</label>
        <input class="ratingStar" type="radio" id="star1" name="rate" value="1"/>
        <label for="star1" title="text">1 star</label>
        <div style="position: relative; top: 0; left: 25px;">
            <input type="number" name="" id="ratValue" readonly value="1" style="width: 20%; text-align: center;">
        </div>
    </div>
        </div>
        <div product-size>
            
            <div class = "product-size">
                <span>Size</span>
                <span><button>41</button> </span>
            </div>
        </div>
        <p class = "product-description">${eachCard.description}</p>
        <div class = "btn-groups">
            <button type = "button" class = "add-cart-btn" onclick="addToCart(${eachCard.id}, '${eachCard.name}', '${eachCard.image}', '${eachCard.price}', '${eachCard.category}')"><i class = "fas fa-shopping-cart"></i>add to cart</button>
            <button type = "button" class = "buy-now-btn"><i class = "fas fa-wallet"></i>buy now</button>
        </div>
    </div>
`;

    return card;
}

// rating
var starArr = document.getElementsByClassName("ratingStar");
for (star of starArr) {
    star.addEventListener('click', isChecked);
}

function isChecked(e) {
    document.getElementById("ratValue").value = e.target.value;
}
// end of rating


function showImage(e) {
    var elm = e.target;
    var temp = elm.getAttribute("src");
    document.getElementById("bgImage").setAttribute("src", temp)
}


function addToCart(prdId, prdName, prdImage, prdPrice, prdCat) {
    var cartProducts = {};
    var topRated = {};
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

    if (localStorage.Rate) {
        topRated = JSON.parse(localStorage.Rate);
    }

    if (topRated[prdName]) {

    } else {
        if (document.getElementById("ratValue").value == 4 || document.getElementById("ratValue").value == 5)
            topRated[prdCat + 's'] = {
                id: prdId,
                cat: prdCat,
            }
    }

    localStorage.Rate = JSON.stringify(topRated);


    location.assign("Home.html");
}