let $ = document.querySelector.bind(document);

// Lấy danh sách product từ local
const productLocal = JSON.parse(localStorage.getItem("products")) || [];

// Hàm hiển thị danh sách sản phẩm ngoài trang chủ
function renderListProduct() {
  const productHtmls = productLocal.map((pro) => {
    return `
        <div class="product-cart">
        <div class="cart-image">
          <a href="product-detail.html?id=${pro.productId}">
            <img
              src=${pro.productImage}
              alt=""
            />
          </a>
        </div>
        <div class="cart-body">
          <h3 class="cart-name">${pro.productName}</h3>
          <p class="cart-price">${pro.price}</p>
        </div>
        <div class="cart-footer">
          <span>SP còn lại: ${pro.quantity}</span>
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div> 
        `;
  });

  // Ép kiểu từ mảng về chuỗi HTML
  const productHtml = productHtmls.join("");

  $("#listProduct").innerHTML = productHtml;
}

renderListProduct();
