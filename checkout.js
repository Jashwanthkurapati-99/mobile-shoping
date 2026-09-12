// ==========================================
// ShopEasy - Checkout JavaScript
// File: js/checkout.js
// ==========================================


// ==========================================
// GET CART
// ==========================================

function getCheckoutCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatCheckoutPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


// ==========================================
// DISPLAY CHECKOUT ITEMS
// ==========================================

function displayCheckoutItems() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const cart = getCheckoutCart();


    if (!checkoutItems) {
        return;
    }


    // Empty cart
    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-checkout">
                <p>Your cart is empty.</p>

                <a href="products.html">
                    Continue Shopping
                </a>
            </div>
        `;

        updateCheckoutSummary();

        return;
    }


    checkoutItems.innerHTML = "";


    cart.forEach(function (product) {

        const item = document.createElement("div");

        item.className = "checkout-item";


        const itemTotal =
            Number(product.price) *
            Number(product.quantity);


        item.innerHTML = `

            <div class="checkout-product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        Quantity: ${product.quantity}
                    </p>

                    <span>
                        ${formatCheckoutPrice(itemTotal)}
                    </span>

                </div>

            </div>

        `;


        checkoutItems.appendChild(item);

    });


    updateCheckoutSummary();

}


// ==========================================
// CALCULATE SUBTOTAL
// ==========================================

function calculateCheckoutSubtotal() {

    const cart = getCheckoutCart();

    let subtotal = 0;


    cart.forEach(function (product) {

        subtotal +=
            Number(product.price) *
            Number(product.quantity);

    });


    return subtotal;

}


// ==========================================
// UPDATE CHECKOUT SUMMARY
// ==========================================

function updateCheckoutSummary() {

    const subtotal =
        calculateCheckoutSubtotal();


    const delivery =
        subtotal > 0 ? 50 : 0;


    const total =
        subtotal + delivery;


    const subtotalElement =
        document.getElementById("checkoutSubtotal");

    const deliveryElement =
        document.getElementById("checkoutDelivery");

    const totalElement =
        document.getElementById("checkoutTotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            formatCheckoutPrice(subtotal);

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            formatCheckoutPrice(delivery);

    }


    if (totalElement) {

        totalElement.textContent =
            formatCheckoutPrice(total);

    }

}


// ==========================================
// VALIDATE CHECKOUT FORM
// ==========================================

function validateCheckoutForm() {

    const fullName =
        document.getElementById("fullName").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const state =
        document.getElementById("state").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();


    // Name validation
    if (fullName.length < 3) {

        alert("Please enter a valid full name.");

        return false;

    }


    // Mobile validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return false;

    }


    // Address validation
    if (address.length < 10) {

        alert(
            "Please enter your complete delivery address."
        );

        return false;

    }


    // City validation
    if (city.length < 2) {

        alert("Please enter your city.");

        return false;

    }


    // State validation
    if (state.length < 2) {

        alert("Please enter your state.");

        return false;

    }


    // Pincode validation
    if (!/^\d{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return false;

    }


    return true;

}


// ==========================================
// SAVE DELIVERY DETAILS
// ==========================================

function saveDeliveryDetails() {

    const deliveryDetails = {

        fullName:
            document.getElementById("fullName").value.trim(),

        mobile:
            document.getElementById("mobile").value.trim(),

        address:
            document.getElementById("address").value.trim(),

        city:
            document.getElementById("city").value.trim(),

        state:
            document.getElementById("state").value.trim(),

        pincode:
            document.getElementById("pincode").value.trim()

    };


    localStorage.setItem(
        "deliveryDetails",
        JSON.stringify(deliveryDetails)
    );

}


// ==========================================
// CONTINUE TO PAYMENT
// ==========================================

function continueToPayment() {

    const cart = getCheckoutCart();


    // Check cart
    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add products first."
        );

        window.location.href =
            "products.html";

        return;

    }


    // Validate form
    if (!validateCheckoutForm()) {

        return;

    }


    // Save address
    saveDeliveryDetails();


    // Go to payment page
    window.location.href =
        "payment.html";

}


// ==========================================
// FORM SUBMIT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckoutItems();


        const checkoutForm =
            document.getElementById("checkoutForm");


        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    continueToPayment();

                }
            );

        }

    }
);