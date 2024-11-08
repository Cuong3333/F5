
// Hàm này định dạng ngày theo kiểu day-month-year
export const formatDate = (date) => {
  const month = date.toLocaleString("en-US", { month: "short" }); // lấy tháng dưới dạng viết tắt
  const day = date.getDate(); // lấy ngày'
  const year = date.getFullYear(); // lấy năm

  const formattedDate = `${day}-${month}-${year}`;//ghép ngày thàng năm
  return formattedDate;
};

// Hàm này nhận vào một chuỗi ngày và trả về ngày đã định dạng theo kiểu yyyy-mm-dd (ví dụ: 2024-11-07).
export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) { //Kiểm tra xem chuỗi nhập vào có phải là một ngày hợp lệ hay không.
    return "Invalid Date";
  }

  // Nếu hợp lệ, nó trả về ngày theo định dạng chuẩn yyyy-mm-dd, sử dụng padStart để đảm bảo luôn có 2 chữ số cho tháng và ngày.
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

//Ví dụ, nếu tên đầy đủ là "John Doe", hàm sẽ trả về "JD".
export function getInitials(fullName) { 
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

// Định nghĩa các lớp CSS tùy theo mức độ ưu tiên của nhiệm vụ (high, medium, low).
// Sử dụng trong bảng hoặc danh sách để tô màu độ ưu tiên của nhiệm vụ. Ví dụ, nhiệm vụ với mức độ ưu tiên cao sẽ có màu chữ đỏ.
export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

// Định nghĩa các màu nền tùy theo trạng thái nhiệm vụ (todo, in progress, completed).
// Giúp dễ dàng phân biệt các nhiệm vụ dựa trên trạng thái, bằng cách thay đổi màu nền.
export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

// Mảng này chứa các màu nền sử dụng cho các thành viên trong nhóm hoặc các đối tượng khác.
export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
