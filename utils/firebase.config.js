import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Thông tin của dự firebase

const firebaseConfig = {
  apiKey: "AIzaSyByL1krMw69RXUr-7SqssUwuT0NqqNxork",
  authDomain: "jv231101-project-module01.firebaseapp.com",
  projectId: "jv231101-project-module01",
  storageBucket: "jv231101-project-module01.appspot.com",
  messagingSenderId: "339092790624",
  appId: "1:339092790624:web:0e17e7e83e4fbbe331d205",
};

// Tạo biến toàn cục cho phép sử dụng firebase
const app = initializeApp(firebaseConfig);

// Tạo kho lưu trữ chung
const storage = getStorage(app);

// thiết kế uploadFile, có tham số truyền vào là giá trị lấy từ input , kết quả trả về sẽ là url sau khi upload
async function upload(file) {
  // Lấy giá trị từ input
  const fileObj = file.files[0];

  let fileUrl = "";

  if (fileObj) {
    // Tham chiếu đến thư mục chứa hình ảnh
    const storageRef = ref(storage, `uploads/${fileObj.name}`);

    // Tiến hành xử lý quá trình upload
    try {
      // Tiến hành upload ảnh
      const snapshort = await uploadBytes(storageRef, fileObj);

      // Lấy link hình ảnh từ firebase
      const downloadUrl = await getDownloadURL(snapshort.ref);

      // Gán lại giá trị của link hình ảnh vào biến fileUrl
      fileUrl = downloadUrl;
    } catch (error) {
      console.log("Đã có lỗi xảy ra");
    }
  } else {
    console.log("Tên hình ảnh không được để trống");
  }

  // Trả về kết quả của hàm
  return fileUrl;
}

export default upload;
