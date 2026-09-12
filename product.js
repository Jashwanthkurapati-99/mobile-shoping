// =========================================================
// ShopEasy - Products JavaScript
// File: js/products.js
// =========================================================


// =========================================================
// PRODUCT DATA
// =========================================================

const products = [

    {
        id: 1,
        name: "Smartphone",
        category: "electronics",
        price: 24999,
        rating: 4.5,
        reviews: 125,
        image: "images/phone.jpg",
        description:
            "Powerful smartphone with excellent performance and camera."
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        rating: 4.4,
        reviews: 98,
        image: "images/headphones.jpg",
        description:
            "Comfortable wireless headphones with clear sound."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "footwear",
        price: 2499,
        rating: 4.3,
        reviews: 76,
        image: "images/shoes.jpg",
        description:
            "Lightweight running shoes designed for everyday comfort."
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "electronics",
        price: 3499,
        rating: 4.6,
        reviews: 143,
        image: "images/watch.jpg",
        description:
            "Smart watch with fitness tracking and notifications."
    },

    {
        id: 5,
        name: "Men's T-Shirt",
        category: "clothing",
        price: 799,
        rating: 4.2,
        reviews: 65,
        image: "images/tshirt.jpg",
        description:
            "Comfortable cotton T-shirt for everyday wear."
    },

    {
        id: 6,
        name: "Casual Jeans",
        category: "clothing",
        price: 1499,
        rating: 4.4,
        reviews: 82,
        image: "images/jeans.jpg",
        description:
            "Stylish and comfortable casual jeans."
    },

    {
        id: 7,
        name: "Sports Backpack",
        category: "accessories",
        price: 1299,
        rating: 4.3,
        reviews: 54,
        image: "images/backpack.jpg",
        description:
            "Durable backpack suitable for college and travel."
    },

    {
        id: 8,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 2999,
        rating: 4.5,
        reviews: 91,
        image: "images/speaker.jpg",
        description:
            "Portable Bluetooth speaker with powerful sound."
    },

    {
        id: 9,
        name: "Cricket Bat",
        category: "sports",
        price: 4999,
        rating: 4.6,
        reviews: 48,
        image: "images/cricket-bat.jpg",
        description:
            "High-quality cricket bat for practice and matches."
    },

    {
        id: 10,
        name: "Study Table",
        category: "home-kitchen",
        price: 6999,
        rating: 4.2,
        reviews: 35,
        image: "images/study-table.jpg",
        description:
            "Modern study table suitable for home and office."
    },

    {
        id: 11,
        name: "Face Wash",
        category: "beauty",
        price: 499,
        rating: 4.1,
        reviews: 110,
        image: "images/face-wash.jpg",
        description:
            "Gentle face wash for daily skincare."
    },

    {
        id: 12,
        name: "Programming Book",
        category: "books",
        price: 899,
        rating: 4.7,
        reviews: 72,
        image: "images/programming-book.jpg",
        description:
            "Beginner-friendly programming book."
    }

];


// =========================================================
// CATEGORY DISPLAY NAMES
// =========================================================

const categoryNames = {

    electronics: "Electronics",

    clothing: "Clothing",

    footwear: "Footwear",

    accessories: "Accessories",

    "home-kitchen": "Home & Kitchen",

    beauty: "Beauty",

    sports: "Sports",

    books: "Books"

};


// =========================================================
// GET ELEMENTS
// =========================================================

function getProductElements() {

    return {

        container:
            document.getElementById("productsContainer"),

        noProducts:
            document.getElementById("noProducts"),

        productCount:
            document.getElementById("productCount"),

        searchInput:
            document.getElementById("searchInput"),

        categoryFilter:
            document.getElementById("categoryFilter"),

        priceFilter:
            document.getElementById("priceFilter"),

        sortFilter:
            document.getElementById("sortFilter"),

        activeSearch:
            document.getElementById("activeSearch")

    };

}


// =========================================================
// FORMAT CATEGORY
// =========================================================

function formatCategory(category) {

    return categoryNames[category] || category;

}


// =========================================================
// DISPLAY PRODUCTS
// =========================================================

function displayProducts(productList) {

    const elements = getProductElements();

    const container = elements.container;

    if (!container) {
        return;
    }

    container.innerHTML = "";


    // =====================================================
    // NO PRODUCTS
    // =====================================================

    if (productList.length === 0) {

        if (elements.noProducts) {
            elements.noProducts.style.display = "block";
        }

        if (elements.productCount) {
            elements.productCount.textContent = "0";
        }

        return;
    }


    // =====================================================
    // PRODUCTS FOUND
    // =====================================================

    if (elements.noProducts) {
        elements.noProducts.style.display = "none";
    }


    if (elements.productCount) {
        elements.productCount.textContent =
            productList.length;
    }


    // =====================================================
    // CREATE PRODUCT CARDS
    // =====================================================

    productList.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image-container">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                    onerror="this.src='images/placeholder.jpg'"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${formatCategory(product.category)}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <div class="product-rating">

                    ⭐ ${product.rating}

                    <span>
                        (${product.reviews} reviews)
                    </span>

                </div>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>


                    <button
                        type="button"
                        class="add-cart-btn"
                        onclick="addProductToCart(${product.id})"
                    >
                        🛒 Add
                    </button>

                </div>


                <a
                    href="product-details.html?id=${product.id}"
                    class="details-btn"
                >
                    View Details
                </a>

            </div>

        `;


        container.appendChild(card);

    });

}


// =========================================================
// GET PRICE MATCH
// =========================================================

function matchesPrice(product) {

    const priceFilter =
        document.getElementById("priceFilter");

    if (!priceFilter) {
        return true;
    }


    const value =
        priceFilter.value;


    if (value === "all") {
        return true;
    }


    if (value === "0-1000") {

        return product.price <= 1000;

    }


    if (value === "1000-5000") {

        return (
            product.price > 1000 &&
            product.price <= 5000
        );

    }


    if (value === "5000-10000") {

        return (
            product.price > 5000 &&
            product.price <= 10000
        );

    }


    if (value === "10000-50000") {

        return (
            product.price > 10000 &&
            product.price <= 50000
        );

    }


    if (value === "50000+") {

        return product.price > 50000;

    }


    return true;

}


// =========================================================
// SEARCH MATCH
// =========================================================

function matchesSearch(product, searchText) {

    if (!searchText) {
        return true;
    }


    const text =
        searchText.toLowerCase();


    return (

        product.name
            .toLowerCase()
            .includes(text)

        ||

        product.category
            .toLowerCase()
            .includes(text)

        ||

        formatCategory(product.category)
            .toLowerCase()
            .includes(text)

        ||

        product.description
            .toLowerCase()
            .includes(text)

    );

}


// =========================================================
// APPLY ALL FILTERS
// =========================================================

function applyFilters() {

    const elements =
        getProductElements();


    let filteredProducts =
        [...products];


    // =====================================================
    // SEARCH
    // =====================================================

    const searchText =
        elements.searchInput
            ? elements.searchInput.value
                .trim()
                .toLowerCase()
            : "";


    filteredProducts =
        filteredProducts.filter(function (product) {

            return matchesSearch(
                product,
                searchText
            );

        });


    // =====================================================
    // CATEGORY
    // =====================================================

    const category =
        elements.categoryFilter
            ? elements.categoryFilter.value
            : "all";


    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(function (product) {

                return product.category === category;

            });

    }


    // =====================================================
    // PRICE
    // =====================================================

    filteredProducts =
        filteredProducts.filter(function (product) {

            return matchesPrice(product);

        });


    // =====================================================
    // SORT
    // =====================================================

    const sort =
        elements.sortFilter
            ? elements.sortFilter.value
            : "default";


    if (sort === "low-high") {

        filteredProducts.sort(function (a, b) {

            return a.price - b.price;

        });

    }


    else if (sort === "high-low") {

        filteredProducts.sort(function (a, b) {

            return b.price - a.price;

        });

    }


    else if (sort === "name-az") {

        filteredProducts.sort(function (a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    else if (sort === "name-za") {

        filteredProducts.sort(function (a, b) {

            return b.name.localeCompare(a.name);

        });

    }


    else if (sort === "rating-high") {

        filteredProducts.sort(function (a, b) {

            return b.rating - a.rating;

        });

    }


    // =====================================================
    // ACTIVE SEARCH DISPLAY
    // =====================================================

    if (
        elements.activeSearch &&
        searchText
    ) {

        elements.activeSearch.style.display =
            "block";

        elements.activeSearch.textContent =
            `Search: "${searchText}"`;

    }

    else if (elements.activeSearch) {

        elements.activeSearch.style.display =
            "none";

        elements.activeSearch.textContent =
            "";

    }


    // =====================================================
    // DISPLAY
    // =====================================================

    displayProducts(filteredProducts);

}


// =========================================================
// SEARCH PRODUCTS
// =========================================================

function searchProducts() {

    applyFilters();

}


// =========================================================
// BACKWARD COMPATIBILITY
// =========================================================

function searchProductList() {

    applyFilters();

}


// =========================================================
// ADD PRODUCT TO CART
// =========================================================

function addProductToCart(productId) {

    const product =
        products.find(function (item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(function (item) {

            return item.id === productId;

        });


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            category: product.category,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Update cart count
    updateProductCartCount();


    // Small notification
    showCartMessage(
        `${product.name} added to cart`
    );

}


// =========================================================
// UPDATE CART COUNT
// =========================================================

function updateProductCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const totalQuantity =
        cart.reduce(function (total, item) {

            return total +
                Number(item.quantity || 0);

        }, 0);


    cartCount.textContent =
        totalQuantity;

}


// =========================================================
// CART MESSAGE
// =========================================================

function showCartMessage(message) {

    const oldMessage =
        document.querySelector(".cart-message");


    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");


    messageBox.className =
        "cart-message";


    messageBox.textContent =
        "✓ " + message;


    messageBox.style.position =
        "fixed";

    messageBox.style.bottom =
        "25px";

    messageBox.style.right =
        "25px";

    messageBox.style.zIndex =
        "9999";

    messageBox.style.padding =
        "12px 18px";

    messageBox.style.background =
        "#222";

    messageBox.style.color =
        "#fff";

    messageBox.style.borderRadius =
        "8px";

    messageBox.style.fontSize =
        "14px";

    messageBox.style.fontWeight =
        "600";

    messageBox.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.2)";


    document.body.appendChild(
        messageBox
    );


    setTimeout(function () {

        messageBox.remove();

    }, 2000);

}


// =========================================================
// CLEAR FILTERS
// =========================================================

function clearFilters() {

    const elements =
        getProductElements();


    if (elements.categoryFilter) {

        elements.categoryFilter.value =
            "all";

    }


    if (elements.priceFilter) {

        elements.priceFilter.value =
            "all";

    }


    if (elements.sortFilter) {

        elements.sortFilter.value =
            "default";

    }


    if (elements.searchInput) {

        elements.searchInput.value =
            "";

    }


    // Update URL
    const cleanUrl =
        window.location.pathname;


    window.history.replaceState(
        {},
        document.title,
        cleanUrl
    );


    applyFilters();

}


// =========================================================
// LOAD URL FILTERS
// =========================================================

function loadUrlFilters() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const category =
        urlParams.get("category");


    const search =
        urlParams.get("search");


    const elements =
        getProductElements();


    // Category
    if (
        category &&
        elements.categoryFilter
    ) {

        const validCategory =
            products.some(function (product) {

                return product.category === category;

            });


        if (validCategory) {

            elements.categoryFilter.value =
                category;

        }

    }


    // Search
    if (
        search &&
        elements.searchInput
    ) {

        elements.searchInput.value =
            search;

    }


    applyFilters();

}


// =========================================================
// EVENT LISTENERS
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =================================================
        // LOAD URL FILTERS
        // =================================================

        loadUrlFilters();


        const elements =
            getProductElements();


        // =================================================
        // CATEGORY
        // =================================================

        if (elements.categoryFilter) {

            elements.categoryFilter.addEventListener(
                "change",
                applyFilters
            );

        }


        // =================================================
        // PRICE
        // =================================================

        if (elements.priceFilter) {

            elements.priceFilter.addEventListener(
                "change",
                applyFilters
            );

        }


        // =================================================
        // SORT
        // =================================================

        if (elements.sortFilter) {

            elements.sortFilter.addEventListener(
                "change",
                applyFilters
            );

        }


        // =================================================
        // SEARCH BUTTON
        // =================================================

        const searchButton =
            document.getElementById(
                "searchButton"
            );


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                searchProducts
            );

        }


        // =================================================
        // LIVE SEARCH
        // =================================================

        if (elements.searchInput) {

            elements.searchInput.addEventListener(
                "input",
                applyFilters
            );


            elements.searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        searchProducts();

                    }

                }
            );

        }


        // =================================================
        // CLEAR BUTTON
        // =================================================

        const clearButton =
            document.getElementById(
                "clearFiltersBtn"
            );


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearFilters
            );

        }


        // =================================================
        // NO PRODUCTS CLEAR
        // =================================================

        const noProductsClear =
            document.getElementById(
                "noProductsClearBtn"
            );


        if (noProductsClear) {

            noProductsClear.addEventListener(
                "click",
                clearFilters
            );

        }


        // =================================================
        // CART COUNT
        // =================================================

        updateProductCartCount();

    }
);