let $ = document.querySelector.bind(document);
let $S = document.querySelectorAll.bind(document);

// Lấy dữ liệu từ local
let userLocal = JSON.parse(localStorage.getItem("users")) || [];

// Hàm render danh sách user
function renderUser() {
  // Lặp qua các phần tử của mảng
  const trHtmls = userLocal.map((user, index) => {
    return `
        <tr>
        <td>${index + 1}</td>
        <td>${user.userName}</td>
        <td>${
          user.gender === 0 ? "Nam" : user.gender === 1 ? "Nữ" : "Khác"
        }</td>
        <td>${user.dateOfBirth}</td>
        <td>${user.address}</td>
        <td>${user.status === 1 ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
        <td>
          <div class="btn-func-group">
            <button class="btn-icon">
              <i class="fa-solid fa-unlock-keyhole"></i>
            </button>
            <button class="btn-icon">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
        `;
  });

  // Chuyển đổi dữ liệu từ mảng thành chuỗi HTML
  const trHtml = trHtmls.join("");

  // Append vào trong phần tử cha
  $("#tbody").innerHTML = trHtml;
}

renderUser();
