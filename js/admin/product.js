import upload from "./../../utils/firebase.config.js";
let $ = document.querySelector.bind(document);

// Lấy danh sách category từ local
const categoryLocal = JSON.parse(localStorage.getItem("categories")) || [];
const productLocal = JSON.parse(localStorage.getItem("products")) || [];
let categoryId = "";
let imageUrl = "";

// Mở form thêm mới sản phẩm
$("#btnOpenForm").addEventListener("click", () => {
  $("#formAddProduct").style.display = "flex";
});

// Đóng form thêm mới sản phẩm khi click vào icon close
$("#iconCloseForm").addEventListener("click", () => {
  $("#formAddProduct").style.display = "none";
});

// Đóng form thêm mới sản phẩm khi click vào button Hủy
$("#btnCloseForm").addEventListener("click", () => {
  $("#formAddProduct").style.display = "none";
});

//  Hiển thị danh sách danh mục sản phẩm
function renderCategory() {
  const optionHtmls = categoryLocal.map((op) => {
    return `
        <option value=${op.categoryId}>${op.categoryName}</option>
        `;
  });

  // Chuyển đổi từ mảng thành chuỗi HTML
  const optionHtml = optionHtmls.join("");

  $("#listCategory").innerHTML = optionHtml;
}

renderCategory();

// Lắng nghe sự kiện onChange và lấy ra giá trị của category
$("#listCategory").addEventListener("change", (e) => {
  // gán lại giá trị cho biến categoryId
  categoryId = e.target.value;
});

// Lắng nghe sự kiện change lấy ra đường dẫn hình ảnh
$("#file").addEventListener("change", async (e) => {
  $("#loading").style.display = "flex";
  const getUrl = await upload(e.target);
  $("#imageProduct").src = getUrl; // Preview image
  imageUrl = getUrl; // Gán lại đường dẫn ảnh cho biến imageUrl
  $("#loading").style.display = "none";
});

// Hàm reset các giá trị trong form sau khi thêm mới dữ liệu thành công
function resetForm() {
  $("#productName").value = "";
  $("#price").value = "";
  $("#quantity").value = "";
  $("#discount").value = "";
  imageUrl = "";
  $("#description").value = "";
}

// Lắng nghe sự kiện submit form
$("#formAddProduct").addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate dữ liệu đầu vào
  // Tạo đối tượng newProduct
  const newProduct = {
    productId: uuidv4(),
    productName: $("#productName").value,
    price: +$("#price").value,
    quantity: +$("#quantity").value,
    discount: +$("#discount").value,
    productImage: imageUrl,
    categoryId: categoryId,
    description: $("#description").value,
    createdDate: new Date(),
  };

  // Thêm dữ liệu vào đầu mảng
  productLocal.unshift(newProduct);

  // Lưu dữ liệu lên local
  localStorage.setItem("products", JSON.stringify(productLocal));

  // Reset lại các giá trị trên form
  resetForm();

  // Đóng form
  $("#formAddProduct").style.display = "none";

  // Gọi hàm load lại dữ liệu
  renderListProduct();
});

// Hiển thị danh sách sản phẩm
function renderListProduct() {
  const trHtmls = productLocal.map((pro, index) => {
    // Tìm kiếm category theo id
    const findCategory = categoryLocal.find(
      (category) => category.categoryId === pro.categoryId
    );

    return `
        <tr>
        <td>${index + 1}</td>
        <td>${pro.productName}</td>
        <td>
          <div style="display: flex; justify-content: center">
            <img
              src=${pro.productImage}
              alt=""
            />
          </div>
        </td>
        <td>${pro.price}</td>
        <td>${pro.quantity}</td>
        <td>${findCategory?.categoryName}</td>
        <td>${pro.discount} %</td>
        <td>
          <div style="display: flex; gap: 12px">
            <button style="height: 30px" class="button">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button style="height: 30px" class="button">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
        `;
  });

  // Ép kiểu từ mảng thành chuỗi HTML
  const trHtml = trHtmls.join("");

  $("#tbody").innerHTML = trHtml;
}

renderListProduct();
