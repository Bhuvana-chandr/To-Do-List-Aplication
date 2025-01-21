import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
