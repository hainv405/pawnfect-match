document.addEventListener("DOMContentLoaded", function () {
    preloadProductData(); // Tải dữ liệu sản phẩm từ JSON và lưu vào localStorage
});

// Lấy tham chiếu đến các thẻ sản phẩm
var products = document.querySelectorAll(".product-item");

function preloadProductData() {
    // Tải product-list.json
    fetch("./data/product-list.json")
        .then((response) => {
            if (!response.ok) throw new Error("Không thể tải product-list.json");
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("product-list", JSON.stringify(data));
            onLoad();
            linkToProductInfo();
            loadQuantityInCart();
            saveTitleProduct();
        })
        .catch((error) => {
            console.error("Lỗi tải product-list.json:", error);
        });

    // Tải thêm products nếu cần
    fetch("./data/product.json")
        .then((response) => {
            if (!response.ok) throw new Error("Không thể tải product.json");
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("products", JSON.stringify(data));
        })
        .catch((error) => {
            console.error("Lỗi tải product.json:", error);
        });
}

function onLoad() {
    const productObj = JSON.parse(localStorage.getItem("product-list"));
    if (!productObj) {
        console.warn("Không có product-list trong localStorage");
        return;
    }

    for (let i = 0; i < products.length; i++) {
        if (!productObj[i]) continue;
        const product = products[i];
        const data = productObj[i];

        const titleEl = product.querySelector(".product-item-title");
        const imgEl = product.querySelector("img");
        const priceEl = product.querySelector(".product-item-price");

        if (titleEl) titleEl.textContent = data.title || "Không có tiêu đề";
        if (imgEl) imgEl.src = data.src ? "./" + data.src : "./image/default.png";
        if (priceEl) priceEl.textContent = formatPrice(data.price || 0);
    }
}

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}

function linkToProductInfo() {
    const productObj = JSON.parse(localStorage.getItem("product-list"));
    if (!productObj) {
        console.warn("Không thể liên kết sản phẩm do thiếu dữ liệu");
        return;
    }

    products.forEach((item) => {
        item.addEventListener("click", function () {
            const divId = item.getAttribute("id");
            const titleElement = item.querySelector(".product-item-title")?.textContent;
            if (!titleElement) return;

            const matchedProduct = productObj.find((p) => p.title === titleElement);

            if (matchedProduct) {
                localStorage.setItem("currentProduct", JSON.stringify(matchedProduct));

                // Nếu chạy trên GitHub Pages, đường dẫn cần chính xác
                const currentUrl = window.location.href;
                if (currentUrl.includes("github.io")) {
                    window.location.href = "/pawnfect-match/html/product-detail.html"; // hoặc dùng full path nếu cần
                } else {
                    window.location.href = "/pawnfect-match/html/product-detail.html";
                }
            } else {
                console.warn("Không tìm thấy sản phẩm:", titleElement);
            }
        });
    });
}

function loadQuantityInCart() {
    const productInCart = JSON.parse(localStorage.getItem("productInCart"));
    const quantity = productInCart ? productInCart.length : 0;

    const cartEl = document.getElementById("quantity-in-cart");
    if (cartEl) cartEl.textContent = quantity;
}

function saveTitleProduct() {
    const linkToProduct = document.querySelectorAll(".section1 .section1-product ul li a");

    for (let i = 0; i < linkToProduct.length; i++) {
        linkToProduct[i].addEventListener("click", function () {
            const id = this.id;
            localStorage.setItem("idPageProduct", JSON.stringify(id));
        });
    }
}
