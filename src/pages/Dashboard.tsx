import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ProgressBar from '../components/ProgressBar';
import Filters from '../components/Filters';
import CategoryView from '../components/CategoryView';
import { Task } from '../types/Task';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'categories'>('list');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    status: '',
  });

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
    applyFilters();
  }, [tasks, user]);

  useEffect(() => {
    applyFilters();
  }, [filters, tasks]);

  const applyFilters = () => {
    let filtered = [...tasks];

    if (filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'userId'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      userId: user!.id,
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'userId'>) => {
    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setShowTaskForm(false);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user?.username}! 👋
          </h1>
          <p className="text-gray-600">Gestiona tus actividades de manera eficiente</p>
        </div>

        <ProgressBar tasks={tasks} />

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              tasks={tasks}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Lista
              </button>
              <button
                onClick={() => setCurrentView('categories')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === 'categories'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Categorías
              </button>
            </div>
            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nueva Tarea</span>
            </button>
          </div>
        </div>

        {currentView === 'list' ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={openEditForm}
            onDelete={handleDeleteTask}
          />
        ) : (
          <CategoryView
            tasks={filteredTasks}
            onEdit={openEditForm}
            onDelete={handleDeleteTask}
          />
        )}

        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleEditTask : handleCreateTask}
            onCancel={closeTaskForm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;