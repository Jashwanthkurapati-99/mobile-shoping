// ==========================================
// ShopEasy - Common App JavaScript
// File: js/app.js
// ==========================================


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        window.location.href = "products.html";
        return;
    }

    // Send search text to products page
    window.location.href =
        "products.html?search=" +
        encodeURIComponent(searchText);
}


// ==========================================
// SEARCH USING ENTER KEY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                searchProducts();
            }

        });

    }

});


// ==========================================
// GO TO CHECKOUT
// ==========================================

function goToCheckout() {

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    if (cart.length === 0) {

        alert("Your cart is empty. Please add a product first.");

        return;
    }

    window.location.href = "checkout.html";
}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += Number(item.quantity) || 1;

    });


    // Find cart links
    const cartLinks = document.querySelectorAll(
        'a[href="cart.html"]'
    );


    cartLinks.forEach(function (cartLink) {

        // Avoid adding multiple counts
        const existingCount =
            cartLink.querySelector(".cart-count");

        if (existingCount) {
            existingCount.remove();
        }


        // Create cart count
        const count = document.createElement("span");

        count.className = "cart-count";

        count.textContent = totalItems;


        // Add count only when cart has products
        if (totalItems > 0) {
            cartLink.appendChild(count);
        }

    });

}


// ==========================================
// SAVE DATA TO LOCAL STORAGE
// ==========================================

function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


// ==========================================
// GET DATA FROM LOCAL STORAGE
// ==========================================

function getData(key) {

    const data = localStorage.getItem(key);

    if (!data) {
        return null;
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Unable to read local storage:",
            error
        );

        return null;
    }

}


// ==========================================
// REMOVE DATA FROM LOCAL STORAGE
// ==========================================

function removeData(key) {

    localStorage.removeItem(key);

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


// ==========================================
// GET URL PARAMETER
// Example:
// products.html?category=electronics
// ==========================================

function getUrlParameter(parameter) {

    const urlParams =
        new URLSearchParams(window.location.search);

    return urlParams.get(parameter);

}


// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage(message) {

    alert(message);

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Update cart count on every page
    updateCartCount();

});