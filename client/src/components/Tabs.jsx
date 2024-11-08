import { Tab } from "@headlessui/react";

// Hàm này nhận vào một danh sách các lớp CSS và lọc bỏ các giá trị false, null, undefined, hoặc các giá trị không hợp lệ. Sau đó, nó nối các lớp còn lại thành một chuỗi duy nhất, ngăn cách bằng dấu cách.
//Công dụng: Được sử dụng để xây dựng các lớp CSS động trong mã, giúp tùy chỉnh kiểu dáng của các phần tử dựa trên các điều kiện nhất định.
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className='w-full px-1 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-6 rounded-xl p-1'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)} //Khi tab được nhấn, hàm setSelected sẽ được gọi và cập nhật trạng thái tab được chọn.
              className={({ selected }) =>
                classNames( // nếu trạng thái selected được click là true thì màu xanh, còn không thì cái bên dưới
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",

                  selected
                    ? "text-blue-700  border-b-2 border-blue-600"
                    : "text-gray-800  hover:text-blue-800"
                )
              }
            >
              {tab.icon} 
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className='w-full mt-2'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
