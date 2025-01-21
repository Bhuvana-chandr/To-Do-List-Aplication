import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newContent, setNewContent] = React.useState(task.content);

  const handleEdit = () => {
    if (isEditing && newContent !== task.content) {
      onEdit(task.id, newContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.content}
        </span>
      )}
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </div>
  );
};

export default TaskItem;
