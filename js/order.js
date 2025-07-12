// Giả sử chúng ta có một mảng đơn hàng từ backend hoặc từ JSON
const orders = [
    {
        orderId: "ORD123",
        customer: "Nguyễn Văn A",
        total: 1200000,
        status: "Chờ xử lý"
    },
    {
        orderId: "ORD124",
        customer: "Lê Thị B",
        total: 800000,
        status: "Đang giao"
    }
];

function displayOrders(orders) {
    const orderList = document.getElementById('orderList');
    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order-item');
        orderDiv.innerHTML = `
      <p>Mã đơn hàng: ${order.orderId}</p>
      <p>Khách hàng: ${order.customer}</p>
      <p>Tổng tiền: ${order.total} VND</p>
      <p>Trạng thái: ${order.status}</p>
      <button class="update-status-btn" data-id="${order.orderId}">Cập nhật trạng thái</button>
    `;
        orderList.appendChild(orderDiv);
    });
}

displayOrders(orders);
