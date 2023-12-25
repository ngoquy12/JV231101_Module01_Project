// Lấy giá trị tư form và validate
// Lấy mảng user từ local về
// Lấy giá trị từ input có value là email và password
// Tìm kiếm thông tin 1 user theo email và password (dùng find)
// Kiểm tra thông tin. Nếu tồn tại user đó thì sẽ lưu thông tin của user lên local (userLogin), sau đấy
// chuyển sang trang chủ. Nếu thất bại thì sẽ làm rỗng giá trị trong input password và thông báo
// đăng nhập thất bại

let $ = document.querySelector.bind(document);

// Lắng nghe sự kiện submit form
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Kiểm tra dữ liệu đầu vào
  if (!$("#email").value || !$("#password").value) {
    alert("Email và mật khẩu không được để trống.");
  } else {
    // Nếu như có dữ liệu
    // Lấy dữ liệu trên local và so sánh với giá trị lấy từ form
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm kiếm user theo theo email và mật khẩu
    const findUser = userLocal.find(
      (user) =>
        user.email === $("#email").value &&
        user.password === $("#password").value
    );

    // Kiểm tra quyền
    if (
      $("#email").value === "admin@gmail.com" &&
      $("#password").value === "123456"
    ) {
      // Chuyển hướng vào trong admin
      window.location.href = "./admin/home.html";
    } else if (findUser) {
      // Lưu thông tin của user đang đăng nhập lên loal
      localStorage.setItem("userLogin", JSON.stringify(findUser));

      // SAu khi đăng nhập thành công thì 2s sau chuyern hướng
      setTimeout(() => {
        // Chuyển hướng vào trang chủ của user
        window.location.href = "./user/home.html";
      }, 1000);
    } else {
      alert("Email và mật khẩu không đúng");
      $("#password").value = "";
    }
  }
});
