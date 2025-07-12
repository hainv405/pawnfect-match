document.addEventListener("DOMContentLoaded", function () {
    preloadProductData(); // Tải dữ liệu sản phẩm từ JSON và lưu vào localStorage
});

function preloadProductData() {
    // Lấy dữ liệu từ JSON và lưu vào localStorage
    fetch("./data/product-list.json") // Đảm bảo đường dẫn tới tệp JSON là chính xác
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("products", JSON.stringify(data)); // Lưu vào localStorage
        })
        .catch((error) => {
            console.error("Error preloading product data:", error);
        });

    fetch("./data/product.json") // Đảm bảo đường dẫn chính xác
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("product-list", JSON.stringify(data));
            onLoad(); // Gọi hàm để hiển thị sản phẩm
            linkToProductInfo(); // Tạo liên kết đến trang chi tiết sản phẩm
            loadQuantityInCart(); // Tải số lượng sản phẩm trong giỏ hàng
            saveTitleProduct(); // Lưu tiêu đề sản phẩm khi nhấn vào
        })
        .catch((error) => {
            console.error("Error preloading product data:", error);
        });
}

// Hàm hiển thị sản phẩm
function onLoad() {
    var productObj = JSON.parse(localStorage.getItem("product-list"));
    var productHTML = "";

    for (var i = 0; i < productObj.length; i++) {
        productHTML += `
      <div class="product-item" id="product-item${productObj[i].id}">
        <a href="./html/product-detail.html?id=${productObj[i].id}" class="product-link">
          <img src="./${productObj[i].src}" alt="${productObj[i].title}" />
          <p class="product-item-tittle">${productObj[i].title}</p>
          <p class="product-item-price">${formatPrice(productObj[i].price)}</p>
        </a>
      </div>
    `;
    }

    document.getElementById("product-list").innerHTML = productHTML;
}

// Hàm định dạng giá
function formatPrice(price) {
    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formattedPrice += " VND";
    return formattedPrice;
}

// Tạo liên kết đến chi tiết sản phẩm khi nhấn vào
function linkToProductInfo() {
    var products = document.querySelectorAll(".product-item");
    products.forEach((item) => {
        item.addEventListener("click", function () {
            var productObj = JSON.parse(localStorage.getItem("product-list"));
            var divId = item.getAttribute("id");
            var titleElement = item.querySelector(".product-item-tittle").textContent;

            for (var i = 0; i < productObj.length; i++) {
                if (productObj[i].title == titleElement) {
                    localStorage.setItem("currentProduct", JSON.stringify(productObj[i]));
                    break;
                }
            }

            window.location.href = "./html/product-detail.html";
        });
    });
}

// Hàm tải số lượng sản phẩm trong giỏ hàng
function loadQuantityInCart() {
    var productInCart = JSON.parse(localStorage.getItem("productInCart"));
    var quantityInCart = productInCart ? productInCart.length : 0;
    document.getElementById("quantity-in-cart").innerHTML = quantityInCart;
}

// Lưu tiêu đề sản phẩm vào localStorage khi nhấn vào một mục sản phẩm
function saveTitleProduct() {
    var linkToProduct = document.querySelectorAll(".section1 .section1-product ul li a");
    linkToProduct.forEach((item) => {
        item.addEventListener("click", function () {
            var id = this.id;
            localStorage.setItem("idPageProduct", JSON.stringify(id));
        });
    });
}
