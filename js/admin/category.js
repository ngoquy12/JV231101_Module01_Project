import upload from "./../../utils/firebase.config.js";

let $ = document.querySelector.bind(document);
let $S = document.querySelectorAll.bind(document);
let imageUrl = "";
// Lấy dữ liệu từ local về
let categoryLocal = JSON.parse(localStorage.getItem("categories")) || [];

// Lắng nghe sự kiện khi click vào button thêm mới thì mở form
$("#btnOpenForm").addEventListener("click", () => {
  $("#formCategory").style.display = "flex";
});

// Lắng nghe sự kiện khi click vào icon close thì đóng form
$("#iconCloseForm").addEventListener("click", () => {
  $("#formCategory").style.display = "none";
});

// Lắng nghe sự kiện khi click vào button hủy thì đóng form
$("#btnCloseForm").addEventListener("click", () => {
  $("#formCategory").style.display = "none";
});

// Lắng nghe sự kiện onChange giá trị trong input type là file
$("#file").addEventListener("change", async (e) => {
  $("#loading").style.display = "flex"; // Hiển thị url
  const getUrl = await upload(e.target);
  // Gán lại đường dẫn hình ảnh cho biến imageUrl
  imageUrl = getUrl;
  $("#imageCategory").src = getUrl; // Gán lại đường dẫn cho hình ảnh
  $("#loading").style.display = "none"; // Ẩn loading sau khi lấy được url và gán lại được giá trị
});

// Lắng nghe sự kiện submit form category
$("#formAddCategory").addEventListener("submit", (e) => {
  e.preventDefault();

  // Tạo đối tượng newCategory
  const newCategory = {
    categoryId: uuidv4(),
    categoryName: $("#categoryName").value,
    image: imageUrl,
    status: 1,
    createdDate: new Date(),
  };

  // Push dữ liệu vào trong mảng
  categoryLocal.push(newCategory);

  // Lưu dữ liệu mới lên local
  localStorage.setItem("categories", JSON.stringify(categoryLocal));

  // Đóng form thêm mới danh mục
  $("#formCategory").style.display = "none";

  // Reset lại form
  $("#categoryName").value = "";
  $("#imageCategory").src = "";

  // Gọi hàm renderListCategory
  renderListCategory();
});

// Hàm hiển thị danh sách danh mục sản phẩm
function renderListCategory() {
  // Lặp qua các phần tử của mảng và kèm theo dữ liệu
  const trHtmls = categoryLocal.map((cat, index) => {
    return `
    <tr>
    <td>${index + 1}</td>
    <td>${cat.categoryName}</td>
    <td>
      <div class="img-td">
        <img
          src=${cat.image}
        />
      </div>
    </td>
    <td>${cat.createdDate}</td>
    <td>${cat.status === 1 ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
    <td>
      <button class="button button-primary">Sửa</button>
      <button class="button button-primary">Xóa</button>
    </td>
  </tr>
    `;
  });

  // Chuyển đổi từ mảng sang chuỗi HTML
  const trHtml = trHtmls.join("");

  $("#tbody").innerHTML = trHtml;
}

renderListCategory();
