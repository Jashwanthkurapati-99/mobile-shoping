// ==========================================
// ShopEasy - Tracking JavaScript
// File: js/tracking.js
// ==========================================


// ==========================================
// SAMPLE ORDER DATA
// ==========================================

const trackingOrders = {

    "SE1001": {
        productName: "Smartphone",
        image: "images/phone.jpg",
        quantity: 1,
        total: 24999,
        status: "Delivered",
        deliveryDate: "08 Sep 2026",
        currentStep: 5
    },

    "SE1002": {
        productName: "Wireless Headphones",
        image: "images/headphones.jpg",
        quantity: 1,
        total: 1999,
        status: "Shipped",
        deliveryDate: "10 Sep 2026",
        currentStep: 3
    },

    "SE1003": {
        productName: "Running Shoes",
        image: "images/shoes.jpg",
        quantity: 1,
        total: 2499,
        status: "Processing",
        deliveryDate: "12 Sep 2026",
        currentStep: 2
    }

};


// ==========================================
// TRACK ORDER
// ==========================================

function trackOrder() {

    const orderInput =
        document.getElementById("orderId");


    const result =
        document.getElementById("trackingResult");


    const error =
        document.getElementById("trackingError");


    if (!orderInput) {
        return;
    }


    const orderId =
        orderInput.value.trim().toUpperCase();


    // Hide previous results
    if (result) {
        result.style.display = "none";
    }


    if (error) {
        error.style.display = "none";
    }


    // Empty order ID
    if (orderId === "") {

        showTrackingError(
            "Please enter your order ID."
        );

        return;

    }


    const order =
        trackingOrders[orderId];


    // Order not found
    if (!order) {

        showTrackingError(
            "Order not found. Please check your order ID."
        );

        return;

    }


    // Display order information
    displayTrackingResult(
        orderId,
        order
    );

}


// ==========================================
// SHOW TRACKING RESULT
// ==========================================

function displayTrackingResult(
    orderId,
    order
) {

    const result =
        document.getElementById("trackingResult");


    if (!result) {
        return;
    }


    result.style.display = "block";


    // Order ID
    const displayOrderId =
        document.getElementById("displayOrderId");

    if (displayOrderId) {

        displayOrderId.textContent =
            orderId;

    }


    // Delivery date
    const deliveryDate =
        document.getElementById("deliveryDate");

    if (deliveryDate) {

        deliveryDate.textContent =
            order.deliveryDate;

    }


    // Status
    const trackingStatus =
        document.getElementById("trackingStatus");

    if (trackingStatus) {

        trackingStatus.textContent =
            order.status;

    }


    // Product image
    const productImage =
        document.getElementById(
            "trackingProductImage"
        );

    if (productImage) {

        productImage.src =
            order.image;

        productImage.alt =
            order.productName;

    }


    // Product name
    const productName =
        document.getElementById(
            "trackingProductName"
        );

    if (productName) {

        productName.textContent =
            order.productName;

    }


    // Quantity
    const quantity =
        document.getElementById(
            "trackingQuantity"
        );

    if (quantity) {

        quantity.textContent =
            order.quantity;

    }


    // Total
    const total =
        document.getElementById(
            "trackingTotal"
        );

    if (total) {

        total.textContent =
            "₹" +
            Number(order.total)
                .toLocaleString("en-IN");

    }


    // Update timeline
    updateTrackingTimeline(
        order.currentStep
    );

}


// ==========================================
// UPDATE TIMELINE
// ==========================================

function updateTrackingTimeline(
    currentStep
) {

    const steps = [

        "stepPlaced",

        "stepProcessing",

        "stepShipped",

        "stepOutForDelivery",

        "stepDelivered"

    ];


    steps.forEach(
        function (stepId, index) {

            const step =
                document.getElementById(stepId);


            if (!step) {
                return;
            }


            // Remove old classes
            step.classList.remove(
                "completed",
                "active"
            );


            const stepNumber =
                index + 1;


            if (stepNumber < currentStep) {

                step.classList.add(
                    "completed"
                );

            }

            else if (
                stepNumber === currentStep
            ) {

                step.classList.add(
                    "active"
                );

            }

        }
    );

}


// ==========================================
// SHOW ERROR
// ==========================================

function showTrackingError(
    message
) {

    const error =
        document.getElementById(
            "trackingError"
        );


    if (!error) {
        alert(message);
        return;
    }


    error.textContent =
        message;

    error.style.display =
        "block";

}


// ==========================================
// READ ORDER ID FROM URL
// ==========================================

function loadOrderFromURL() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const orderId =
        urlParams.get("order");


    if (!orderId) {
        return;
    }


    const orderInput =
        document.getElementById(
            "orderId"
        );


    if (orderInput) {

        orderInput.value =
            orderId;

    }


    trackOrder();

}


// ==========================================
// ENTER KEY TO TRACK
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const orderInput =
            document.getElementById(
                "orderId"
            );


        if (orderInput) {

            orderInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        trackOrder();

                    }

                }
            );

        }


        loadOrderFromURL();

    }
);