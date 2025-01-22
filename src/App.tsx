import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { Task } from './types/Task';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [taskContent, setTaskContent] = useState('');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  const addTask = () => {
    if (taskContent.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      content: taskContent,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskContent('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: string, newContent: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, content: newContent } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTaskCompletion} onEdit={editTask} />
    </div>
  );
};

export default App;
