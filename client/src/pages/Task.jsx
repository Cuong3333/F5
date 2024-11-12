import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader.jsx";
import Title from "../components/Title";
import Button from "../components/Button";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import PlanTask from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useGetDashboardStartsQuery } from "../redux/slices/api/taskApiSlice.js";
import { useGetMenuQuery } from "../redux/slices/api/menuApiSlice.js";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-green-500",
  "in progress": "bg-yellow-400",
  completed: "bg-red-500",
};

const Tasks = ({ triggerRefetch, isListView, isReadOnly }) => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const status = params?.status || "";

  // API calls
  const { data, isLoading, refetch } = useGetDashboardStartsQuery();
  const { data: menuData, isLoading: isMenuLoading } = useGetMenuQuery();
  
  const menus = menuData?.menu || [];

  useEffect(() => {
    if (triggerRefetch) {
      refetch();
    }
  }, [triggerRefetch, refetch]);

  const isContentLoading = isLoading || isMenuLoading;

  if (isListView) {
    return isContentLoading ? (
      <div className="py-10">
        <Loading />
      </div>
    ) : (
      <div className="w-full">
        <Table tasks={data.tasks} isReadOnly={isReadOnly} />
      </div>
    );
  }


  return isContentLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        {/* Title or Button */}
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="CreatePlan"
            icon={<IoMdAdd className="text-lg" />}
            className="flex gap-1 items-center bg-gradient-to-r from-[#4e51a8] to-[#8ae697] text-white rounded-md py-2 2xl:py-2.5 w-[300px] justify-center"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="Ready" className={TASK_TYPE.todo} />
            <TaskTitle label="Progress" className={TASK_TYPE["in progress"]} />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected === 0 ? (
          <PlanTask tasks={data?.tasks} isLoading={isLoading} />
        ) : (
          <div className="w-full">
            <Table menu={menus} isLoading={isMenuLoading} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
