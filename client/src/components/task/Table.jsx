import React, { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs"; // dialog xóa
import { FaList } from "react-icons/fa";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ menu, isLoading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2 line-clamp-1">Date Time</th>
        <th className="py-2">MealType</th>
        {/* {!isReadOnly && <th className="py-2 text-right">Actions</th>} */}
      </tr>
    </thead>
  );

  const TableRow = ({ menu }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          {/* <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} /> */}
          <p className="w-full line-clamp-2 text-base text-black">{menu?.MenuName}</p>
        </div>
      </td>

      <td className="py-2">
        <div className="flex gap-1 items-center">
          {/* <span className={clsx("text-lg", PRIOTITYSTYELS[menu?.priority])}>
            {ICONS[menu?.priority]}
          </span> */}
          <span className="capitalize line-clamp-1">{menu?.Calories} Priority</span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">{formatDate(new Date(menu?.date))}</span>
      </td>

      <td className="py-2">
        <div className="flex gap-1 items-center">
          {/* <span className={clsx("text-lg", PRIOTITYSTYELS[menu?.priority])}>
            {ICONS[menu?.priority]}
          </span> */}
          <span className="capitalize line-clamp-1">{menu?.MealType}</span>
        </div>
      </td>

      {/* <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className="py-2">
        <div className="flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS?.length])}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td> */}

      {/* Chỉ hiển thị các nút Edit và Delete khi không ở chế độ Read-Only */}
      {/* {!isReadOnly && (
        <td className="py-2 flex gap-2 md:gap-4 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
            label="Edit"
            type="button"
          />
          <Button
            className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
            label="Delete"
            type="button"
            onClick={() => deleteClicks(task._id)}
          />
        </td>
      )} */}
    </tr>
  );

  return (
    <>
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {menu?.map((m, index) => (
                <TableRow key={index} menu={m} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Table;
