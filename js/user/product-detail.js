let $ = document.querySelector.bind(document);

// Lấy danh sách sản phẩm từ local về
const productLocal = JSON.parse(localStorage.getItem("products")) || [];

// HIển thị chi tiết sản phẩm
function renderProductDetail() {
  // Lấy id từ url
  const productId = window.location.search.split("=")[1];

  // Tìm kiếm thông tin một sản phẩm theo id
  const product = productLocal.find((pro) => pro.productId === productId);

  // Thực hiện render dữ liệu ra ngoài giao diện
  const productSingle = `
  <div class="product-detail-left">
  <div class="product-detail-image">
    <img
      src=${product.productImage}
      alt=""
    />
  </div>
</div>
<div class="product-detail-right">
  <h3 class="product-name">${product.productName}</h3>
  <div class="comment">
    <p>Bình luận: 12</p>
    <div class="border-right"></div>
    <p>Đã bán: 200</p>
  </div>
  <div class="discount-area">
    <s>${product.price}</s>
    <p class="product-price">10000000</p>
  </div>
  <div class="handle-quantity">
    <p>Số lượng còn lại: ${product.quantity}</p>
  </div>
  <div>
    <button id="btnAddToCart" class="btn-add-cart add-cart">
      <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
    </button>
  </div>
  <h3 class="description-title">Thông tin chi tiết</h3>
  <div class="border-bottom"></div>
  <p class="description">Táo ngon</p>
    </div>
  `;

  $("#productDetail").innerHTML = productSingle;
}

renderProductDetail();
