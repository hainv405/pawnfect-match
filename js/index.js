document.addEventListener("DOMContentLoaded", function () {
    preloadProductData(); // Tải dữ liệu sản phẩm từ JSON và lưu vào localStorage
});

function preloadProductData() {
    // Kiểm tra nếu đang chạy trên local (localhost)
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (isLocal) {
        // Chạy trên local, dùng localStorage
        if (!localStorage.getItem("product-list")) {
            // Nếu chưa có dữ liệu trong localStorage, tải từ JSON
            fetch("../data/product-list.json")
                .then((response) => response.json())
                .then((data) => {
                    // Lưu dữ liệu vào localStorage
                    localStorage.setItem("product-list", JSON.stringify(data));
                    onLoad(data);
                })
                .catch((error) => {
                    console.error("Error loading product data:", error);
                });
        } else {
            const productList = JSON.parse(localStorage.getItem("product-list"));
            onLoad(productList);  // Chạy trực tiếp khi có dữ liệu trong localStorage
        }
    } else {
        // Chạy trên GitHub Pages, lấy trực tiếp từ JSON
        fetch("/data/product-list.json")
            .then((response) => response.json())
            .then((data) => {
                onLoad(data);  // Lấy dữ liệu trực tiếp từ tệp JSON
            })
            .catch((error) => {
                console.error("Error loading JSON file from GitHub Pages:", error);
            });
    }
}

function onLoad(productObj) {
    // Lấy dữ liệu từ localStorage (hoặc từ API nếu không có localStorage)
    var productHTML = "";

    productObj.forEach((product) => {
        productHTML += `
      <div class="product-item" id="product-item-${product.id}">
        <img src="${product.src}" alt="${product.title}" />
        <p class="product-item-tittle">${product.title}</p>
        <p class="product-item-price">${formatPrice(product.price)}</p>
      </div>
    `;
    });

    document.getElementById("product-list").innerHTML = productHTML;
    loadQuantityInCart();
    linkToProductInfo();
}

function formatPrice(price) {
    // Chuyển số thành chuỗi với định dạng tiền tệ
    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formattedPrice += "đ"; // Đơn vị tiền tệ VND
    return formattedPrice;
}

function linkToProductInfo() {
    var products = document.querySelectorAll(".product-item");
    products.forEach((item) => {
        item.addEventListener("click", function () {
            var divId = item.getAttribute("id");
            var productId = divId.split("-")[2];  // Lấy ID từ chuỗi ID của phần tử

            // Tìm sản phẩm theo ID và lưu vào localStorage
            var productList = JSON.parse(localStorage.getItem("product-list"));
            var selectedProduct = productList.find((product) => product.id == productId);

            if (selectedProduct) {
                localStorage.setItem("currentProduct", JSON.stringify(selectedProduct));
                window.location.href = "/html/product-detail.html"; // Chuyển đến trang chi tiết sản phẩm
            }
        });
    });
}

var quantityInCart = 0;
function loadQuantityInCart() {
    // Lấy giá trị từ localStorage
    var productInCart = JSON.parse(localStorage.getItem("productInCart"));
    if (!productInCart) {
        quantityInCart = 0;
    } else {
        quantityInCart = productInCart.length;
    }
    document.getElementById("quantity-in-cart").innerHTML = quantityInCart;
}

var linkToProduct = document.querySelectorAll(".section1 .section1-product ul li a");
function saveTitleProduct() {
    for (var i = 0; i < linkToProduct.length; i++) {
        linkToProduct[i].addEventListener("click", function () {
            var id = this.id; // Lưu id của mỗi thẻ vào localStorage
            console.log(id);
            localStorage.setItem("idPageProduct", JSON.stringify(id));
        });
    }
}
