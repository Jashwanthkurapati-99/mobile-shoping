// ==========================================
// ShopEasy - Search JavaScript
// File: js/search.js
// ==========================================


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function performSearch() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value.trim();


    if (searchText === "") {

        window.location.href =
            "products.html";

        return;

    }


    window.location.href =
        "products.html?search=" +
        encodeURIComponent(searchText);

}


// ==========================================
// SEARCH USING ENTER KEY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById("searchInput");


        if (!searchInput) {
            return;
        }


        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }
);


// ==========================================
// SEARCH BUTTON
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchButton =
            document.querySelector(
                ".search-box button"
            );


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                performSearch
            );

        }

    }
);


// ==========================================
// CLEAR SEARCH
// ==========================================

function clearSearch() {

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.value = "";

    }


    window.location.href =
        "products.html";

}