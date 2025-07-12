fetch('../data/cat-products.json') // Đảm bảo đường dẫn tới tệp cat-products.json là chính xác
    .then(response => response.json())
    .then(products => {
        const catProductsDiv = document.getElementById('catProducts');
        catProductsDiv.innerHTML = '';  // Xóa nội dung cũ nếu có

        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            productDiv.innerHTML = `
                <a href="../html/product-detail.html?id=${product.id}" class="product-link">
                  <img src="../${product.src}" alt="${product.title}" />
                  <p class="product-item-title">${product.title}</p>
                  <p class="product-item-price">${formatPrice(product.price)}</p>
                </a>
            `;

            // Gắn sự kiện click để lưu thông tin sản phẩm vào localStorage
            productDiv.querySelector('.product-link').addEventListener('click', () => {
                localStorage.setItem('currentProduct', JSON.stringify(product));
            });

            catProductsDiv.appendChild(productDiv);
        });
    })
    .catch(error => console.log("Error fetching data:", error));

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VND';
}
