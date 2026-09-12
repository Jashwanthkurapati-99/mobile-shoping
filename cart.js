// ==========================================
// ShopEasy - Cart JavaScript
// File: js/cart.js
// ==========================================


// ==========================================
// GET CART
// ==========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const cart = getCart();


    if (!cartItems) {
        return;
    }


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    You haven't added any products to your cart yet.
                </p>

                <a
                    href="products.html"
                    class="shop-btn"
                >
                    Continue Shopping
                </a>

            </div>
        `;

        updateCartSummary();

        return;
    }


    // Clear existing content
    cartItems.innerHTML = "";


    // Display each product
    cart.forEach(function (product, index) {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="cart-product-image"
                >

                <div class="cart-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.category || "Product"}
                    </p>

                    <strong>
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </strong>

                </div>

            </div>


            <div class="cart-quantity">

                <button
                    type="button"
                    onclick="decreaseCartQuantity(${index})"
                >
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    type="button"
                    onclick="increaseCartQuantity(${index})"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${(
                        Number(product.price) *
                        Number(product.quantity)
                    ).toLocaleString("en-IN")}
                </strong>

            </div>


            <button
                type="button"
                class="remove-cart-btn"
                onclick="removeFromCart(${index})"
            >
                🗑️ Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    updateCartSummary();

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseCartQuantity(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(cart[index].quantity) + 1;


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseCartQuantity(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }


    if (Number(cart[index].quantity) > 1) {

        cart[index].quantity =
            Number(cart[index].quantity) - 1;

    } else {

        // Remove when quantity reaches zero
        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }


    const productName = cart[index].name;


    const confirmRemove = confirm(
        "Remove " + productName + " from your cart?"
    );


    if (!confirmRemove) {
        return;
    }


    cart.splice(index, 1);

    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ==========================================
// CALCULATE SUBTOTAL
// ==========================================

function calculateSubtotal() {

    const cart = getCart();

    let subtotal = 0;


    cart.forEach(function (product) {

        subtotal +=
            Number(product.price) *
            Number(product.quantity);

    });


    return subtotal;

}


// ==========================================
// UPDATE CART SUMMARY
// ==========================================

function updateCartSummary() {

    const subtotal = calculateSubtotal();

    const delivery =
        subtotal > 0 ? 50 : 0;

    const total =
        subtotal + delivery;


    const subtotalElement =
        document.getElementById("cartSubtotal");

    const deliveryElement =
        document.getElementById("deliveryCharge");

    const totalElement =
        document.getElementById("cartTotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + subtotal.toLocaleString("en-IN");

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            "₹" + delivery.toLocaleString("en-IN");

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + total.toLocaleString("en-IN");

    }

}


// ==========================================
// CHECKOUT
// ==========================================

function goToCheckout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// ==========================================
// LOAD CART WHEN PAGE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);