import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import TButton from "./core/TButton";

const statusMapping = {
  1: 'Pending',
  2: 'In progress',
  3: 'Completed'
};

export default function TaskListItem({ task, onDeleteClick }) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-h-[470px]">
      <h4 className="mt-4 text-lg font-bold">{task.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: task.description }}
        className="overflow-hidden flex-1"
      ></div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600">
          <strong>Status:</strong> {statusMapping[task.status_id] || 'Unknown'}
        </p>
        <p className="text-sm font-medium text-gray-600">
          <strong>Assigned to:</strong>{" "}
          {task.assigned_user_name || 'Unassigned'}
        </p>
        <p className="text-sm font-medium text-gray-600">
          <strong>Deadline:</strong> {task.deadline}
        </p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <TButton to={`/task/${task.id}`}>
          <PencilIcon className="w-5 h-5 mr-2" />
          Edit
        </TButton>
        <div className="flex items-center">
          {task.id && (
            <TButton
              onClick={(ev) => onDeleteClick(task.id)}
              circle
              link
              color="red"
            >
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  );
}
