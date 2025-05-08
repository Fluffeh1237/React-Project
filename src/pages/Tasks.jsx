import React, { useState, useEffect } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import InputField from '../components/shared/InputField';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const saveEdit = () => {
    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id ? editingTask : task
      ));
      setEditingTask(null);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Tasks</h1>
      
      <Card className="mb-4">
        <div className="d-flex gap-2">
          <InputField
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-grow-1"
          />
          <Button onClick={addTask}>Add Task</Button>
        </div>
      </Card>

      <div className="tasks-list">
        {tasks.map(task => (
          <Card key={task.id} className="mb-3">
            {editingTask?.id === task.id ? (
              <div className="d-flex gap-2">
                <InputField
                  value={editingTask.text}
                  onChange={(e) => setEditingTask({...editingTask, text: e.target.value})}
                  className="flex-grow-1"
                />
                <Button onClick={saveEdit} variant="success">Save</Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="form-check-input"
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <Button onClick={() => startEditing(task)} variant="warning">Edit</Button>
                  <Button onClick={() => deleteTask(task.id)} variant="danger">Delete</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks; 