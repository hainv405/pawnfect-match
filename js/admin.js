// Kiểm tra tài khoản đăng nhập
const user = localStorage.getItem('loggedInUser');
if (user !== 'AdminDokatadamage') {
    alert('Bạn không có quyền truy cập trang này!');
    window.location.href = '../html/login.html';  // Chuyển hướng về trang login
}

// Mẫu dữ liệu sản phẩm (sử dụng JSON hoặc gọi API để lấy dữ liệu thực tế)
const products = [
    {
        name: "Chó Poodle",
        price: 500000,
        category: "Chó",
        image: "image/poodle.jpg"
    },
    {
        name: "Chó Husky",
        price: 800000,
        category: "Chó",
        image: "image/husky.jpg"
    }
];

// Hiển thị danh sách sản phẩm
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear current list
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.name}</p>
            <p>${product.price} VND</p>
            <button class="delete-btn" data-name="${product.name}">Xóa</button>
        `;
        productList.appendChild(productDiv);

        // Xóa sản phẩm
        const deleteBtn = productDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            deleteProduct(productName);
        });
    });
}

// Hàm xóa sản phẩm
function deleteProduct(name) {
    const index = products.findIndex(product => product.name === name);
    if (index !== -1) {
        products.splice(index, 1);
        displayProducts(); // Hiển thị lại danh sách sau khi xóa
    }
}

// Hàm mở form thêm sản phẩm
document.getElementById('addProductBtn').addEventListener('click', function () {
    document.getElementById('addProductForm').style.display = 'block';
});

// Hàm thêm sản phẩm mới
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;

    // Thêm sản phẩm mới vào danh sách
    products.push({ name, price, category, image });

    // Hiển thị lại danh sách sản phẩm
    displayProducts();

    // Ẩn form thêm sản phẩm
    document.getElementById('addProductForm').style.display = 'none';
    clearForm(); // Xóa dữ liệu trong form
}

// Hàm xóa dữ liệu trong form sau khi thêm
function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productImage').value = '';
}

// Gọi hàm để hiển thị sản phẩm ban đầu
displayProducts();
