document.addEventListener("DOMContentLoaded", function () {
    preloadData(); // Tải dữ liệu sản phẩm từ JSON và lưu vào localStorage
});

function preloadData() {
    // Lấy dữ liệu từ JSON và lưu vào localStorage
    fetch("../data/product-list.json")
        .then((response) => response.json())
        .then((productListData) => {
            localStorage.setItem("productList", JSON.stringify(productListData));  // Lưu sản phẩm vào localStorage
            onLoad();  // Gọi hàm onLoad để hiển thị sản phẩm
            loadQuantityInCart();  // Tải số lượng giỏ hàng
            var products = document.querySelectorAll(".product-item"); // Lấy tất cả các phần tử sản phẩm
            openProductDetail(products);  // Thêm sự kiện click vào sản phẩm
        })
        .catch((error) => {
            console.error("Error loading JSON file:", error);
        });
}

// Hàm lấy category từ localStorage để lọc sản phẩm
var idPage = JSON.parse(localStorage.getItem("idPageProduct"));
function getCategory() {
    return idPage;
}

function onLoad() {
    var productObj = JSON.parse(localStorage.getItem("productList"));  // Lấy danh sách sản phẩm từ localStorage
    var productHTML = "";

    // Lọc sản phẩm theo category (Chó, Mèo, etc.)
    for (var i = 0; i < productObj.length; i++) {
        if (productObj[i].category == getCategory()) {
            productHTML += `
            <div class="product-item" id="product-item${productObj[i].id}">
                <a href="../html/product-detail.html?id=${productObj[i].id}" class="product-link">
                    <img src="../${productObj[i].src}" alt="${productObj[i].title}" />
                    <p class="product-item-title">${productObj[i].title}</p>
                    <p class="product-item-price">${formatPrice(productObj[i].price)}</p>
                </a>
            </div>`;
        }
    }

    document.getElementById("product-list").innerHTML = productHTML;  // Ghi HTML vào phần tử chứa danh sách sản phẩm

    // Cập nhật tiêu đề trang (nếu cần thiết)
    switch (idPage) {
        case "dog-food": {
            document.querySelector("h1").innerHTML = "Hạt cho chó";
            break;
        }
        case "dog-snack": {
            document.querySelector("h1").innerHTML = "Snack, xương gặm cho chó";
            break;
        }
        case "cat-food": {
            document.querySelector("h1").innerHTML = "Hạt cho mèo";
            break;
        }
        case "cat-pate": {
            document.querySelector("h1").innerHTML = "Pate cho mèo";
            break;
        }
        case "balo": {
            document.querySelector("h1").innerHTML = "Balo vận chuyển";
            break;
        }
        case "pet-bed": {
            document.querySelector("h1").innerHTML = "Ổ đệm, giường";
            break;
        }
        case "productFilter": {
            document.querySelector("h1").innerHTML = 'Sản phẩm có chứa "' + JSON.parse(localStorage.getItem("idPageProductTitle")) + '"';
            break;
        }
    }
}

function formatPrice(price) {
    // Chuyển số thành chuỗi với định dạng tiền tệ
    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formattedPrice += "đ";  // Thêm đơn vị tiền
    return formattedPrice;
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

function openProductDetail(products) {
    var productObj = JSON.parse(localStorage.getItem("productList"));  // Lấy dữ liệu sản phẩm từ localStorage
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
