import React from 'react';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';
import { Folder, FileText } from 'lucide-react';

interface CategoryViewProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ tasks, onEdit, onDelete }) => {
  const categorizedTasks = tasks.reduce((acc, task) => {
    const category = task.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  if (Object.keys(categorizedTasks).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Folder className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No hay tareas</h3>
        <p className="text-gray-500">Crea tu primera tarea para comenzar a organizarte</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(categorizedTasks).map(([category, categoryTasks]) => (
        <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <Folder className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                  <p className="text-sm text-gray-500">
                    {categoryTasks.length} {categoryTasks.length === 1 ? 'tarea' : 'tareas'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {categoryTasks.filter(t => t.status === 'completada').length} completadas
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {categoryTasks.filter(t => t.status === 'pendiente').length} pendientes
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {categoryTasks.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No hay tareas en esta categoría</p>
              </div>
            ) : (
              categoryTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryView;