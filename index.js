
 
 function handleMenuIconClick(){
    const menuIcon = document.querySelector('.menuIcon');
    const sidebar = document.querySelector('.sidebar');
    const bxa = document.querySelector('#bxa');
    const far = document.querySelector('#far');

    menuIcon.addEventListener('click', function() {
        sidebar.style.display = 'block';
        bxa.style.display = 'block';
        far.style.display = 'none';
    });
}

function handleBxaClick() {
    const bxa = document.querySelector('#bxa');
    const far = document.querySelector('#far');
    const sidebar = document.querySelector('.sidebar');

    bxa.addEventListener('click', function() {
        far.style.display = 'block';
        sidebar.style.display = 'none';
        bxa.style.display = 'none';
    });
}

handleBxaClick();
handleMenuIconClick();


let suita = document.getElementsByClassName('suita')[0];
let suitaItem = ian
let basket = JSON.parse(localStorage.getItem('chebii')) || [];

let generalShop = () => {
    suita.innerHTML = suitaItem.map((x) => {
        let { id, name, price, image } = x;
        let search = basket.find((x) => x.id === id) || { item: 0 }; // Corrected finding logic and added default value
        return `
        <div id="product-id-${id}" class="suitb">
            <img src="${image}" alt="">
            <p>${name}</p>
            <div class="priceQuantity"> <!-- Corrected typo 'priceQuantuty' to 'priceQuantity' -->
                <h4 class="samount">Ksh ${price}</h4>
                <div class="button">
                    <i onclick="decrement('${id}')" class='bx bx-minus'></i>
                    <div id="${id}" class="quantity">${search.item}</div> <!-- Removed unnecessary ternary operation -->
                    <i onclick="increment('${id}')" class='bx bx-plus'></i>
                </div>
            </div>
        </div>`;
    }).join(" ");
};

generalShop();

let increment = (id) => {
    let selectedItem = suitaItem.find((x) => x.id === id); // Fixed the finding logic
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("chebii", JSON.stringify(basket));
    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = suitaItem.find((x) => x.id === id); // Fixed the finding logic
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("chebii", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id); // Fixed the finding logic
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let addCart = document.getElementsByClassName('addCart')[0];
    addCart.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shoppingCart");

let generateCartItems = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = suitaItem.find((y) => y.id === id) || {};
            return `
            <div class="cart-item">
                <img width="100" src="${search.image}" alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem('${id}')"class='bx bx-x' id="baz"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">${item}</div>
                        <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>Ksh ${item * search.price}</h3>
                </div>
            </div>`;
        }).join("");
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>`;
    }
};

generateCartItems();

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("chebii", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("chebii", JSON.stringify(basket));
};

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = suitaItem.find((y) => y.id === id) || {};
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
    }
};

TotalAmount();
