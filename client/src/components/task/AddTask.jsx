import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

import UserList from "./UserList";
import Textbox from "../Textbox";
import SelectList from "../SelectList";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
// icon
import { BiImages } from "react-icons/bi";


// api
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

const LISTS = ["START", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM"];




// hiển thị 1 cái form khi click vào add
const AddTask = ({ open, setOpen, task }) => {

  const {
    register,
    handleSubmit,
    setValue,
    reset, // use reset to clear form
    formState: { errors },
  } = useForm();

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const [uploading, setUploading] = useState(false);

  // Sync selected values with form data
  const handleStageChange = (newStage) => {
    setStage(newStage);
    setValue("stage", newStage); // Update form value manually
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    setValue("priority", newPriority); // Update form value manually
  };


  // Load task data into form when task is provided (update mode)
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("date", task.date);
      setStage(task.stage?.toUpperCase() || LISTS[0]);
      setPriority(task.priority?.toUpperCase() || PRIORIRY[2]);
    }
  }, [task, setValue]);
  
  const submitHandler = async (data) => {
    // Log the form data, including the manually set values
    console.log(data);

    try {
      const taskData = {
        ...data, // Bao gồm dữ liệu từ form
        stage,   // Gắn stage từ state
        priority // Gắn priority từ state
      };
  
      let response;

      console.log(task)
      
      if (task) {
        // Nếu là cập nhật task
        response = await updateTask({ id: task.id, ...taskData }).unwrap();
      } else {
        // Nếu là tạo mới task
        response = await createTask(taskData).unwrap();
      }
  
      // Hiển thị thông báo thành công
      toast.success(response.message);
  
      // Đóng form sau 500ms
      setTimeout(() => {
        setOpen(false);
      }, 500);
      
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Error while processing the task.");
    }
  };



  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className="flex gap-4">
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={handleStageChange} // Use updated handler
            />

            {/* <div className="w-full">
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", { required: "Date is required!" })}
                error={errors.date ? errors.date.message : ""}
              />
            </div> */}
          </div>

          <div className="flex gap-4">
            <SelectList
              label="Priority Level"
              lists={PRIORIRY}
              selected={priority}
              setSelected={handlePriorityChange} // Use updated handler
            />
          </div>

          <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-gradient-to-r from-[#3f9772] to-[#a1dea1] px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>

        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
