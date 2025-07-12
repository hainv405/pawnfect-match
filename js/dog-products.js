// Lắng nghe sự kiện DOMContentLoaded để tải dữ liệu
document.addEventListener("DOMContentLoaded", function () {
    preloadData();
});

function preloadData() {
    // Lấy dữ liệu từ JSON và lưu vào localStorage
    fetch("../data/dog-products.json")
        .then((response) => response.json())
        .then((productListData) => {
            localStorage.setItem("dogProductList", JSON.stringify(productListData));
            onLoad();
            loadQuantityInCart();
            var products = document.querySelectorAll(".product-item");
            openProductDetail(products);
        })
        .catch((error) => {
            console.error("Error loading JSON file:", error);
        });
}

// Hàm lấy category từ localStorage để lọc sản phẩm
function getCategory() {
    return "Chó"; // Hoặc bạn có thể lấy từ URL hoặc localStorage nếu cần
}

function onLoad() {
    var productObj = JSON.parse(localStorage.getItem("dogProductList"));
    var productHTML = "";

    // Lọc sản phẩm theo category (Chó trong trường hợp này)
    for (var i = 0; i < productObj.length; i++) {
        if (productObj[i].category == getCategory()) {
            productHTML += `
        <div class="product-item" id="product-item${productObj[i].id}">
          <a href="../html/product-detail.html?id=${productObj[i].id}" class="product-link">
            <img src="../${productObj[i].src}" alt="${productObj[i].title}" />
            <p class="product-item-title">${productObj[i].title}</p>
            <p class="product-item-price">${formatPrice(productObj[i].price)}</p>
          </a>
        </div>
      `;
        }
    }

    // Ghi dữ liệu HTML vào phần tử chứa danh sách sản phẩm
    document.getElementById("dogProducts").innerHTML = productHTML;

    // Cập nhật tiêu đề trang (nếu cần thiết)
    document.querySelector("h2").innerHTML = "Các bé cún";
}

function formatPrice(price) {
    // Chuyển số thành chuỗi với định dạng tiền tệ
    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formattedPrice += " VND"; // Thêm đơn vị VND vào cuối giá trị
    return formattedPrice;
}

var quantityInCart = 0;
function loadQuantityInCart() {
    // Lấy dữ liệu số lượng từ localStorage
    var productInCart = JSON.parse(localStorage.getItem("productInCart"));
    if (!productInCart) {
        quantityInCart = 0;
    } else {
        quantityInCart = productInCart.length;
    }
    document.getElementById("quantity-in-cart").innerHTML = quantityInCart;
}

function openProductDetail(products) {
    var productObj = JSON.parse(localStorage.getItem("dogProductList"));
    products.forEach((item) => {
        item.addEventListener("click", function () {
            // Lưu thông tin vào localStorage khi người dùng click vào sản phẩm
            var divId = item.getAttribute("id");
            var id = divId.match(/\d+$/)[0]; // Lấy ID từ phần tử

            // Lưu thông tin sản phẩm vào localStorage
            for (var i = 0; i < productObj.length; i++) {
                if (productObj[i].id == id) {
                    localStorage.setItem("currentProduct", JSON.stringify(productObj[i]));
                    break;
                }
            }

            // Chuyển sang trang chi tiết sản phẩm
            window.location.href = "../html/product-detail.html";
        });
    });
}
