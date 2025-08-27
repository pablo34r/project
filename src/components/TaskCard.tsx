import React from 'react';
import { Task } from '../types/Task';
import { Edit, Trash2, Calendar, Flag, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'text-red-600 bg-red-100';
      case 'media':
        return 'text-yellow-600 bg-yellow-100';
      case 'baja':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completada':
        return 'text-green-600 bg-green-100';
      case 'en-progreso':
        return 'text-blue-600 bg-blue-100';
      case 'pendiente':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completada':
        return 'Completada';
      case 'en-progreso':
        return 'En Progreso';
      case 'pendiente':
        return 'Pendiente';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'completada') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
      task.status === 'completada' ? 'opacity-75' : ''
    } ${isOverdue() ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${
            task.status === 'completada' ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar tarea"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-gray-700">{task.category}</span>
        </div>

        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          <Flag className="w-3 h-3" />
          <span className="capitalize">{task.priority}</span>
        </div>

        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          <Clock className="w-3 h-3" />
          <span>{getStatusText(task.status)}</span>
        </div>

        {task.dueDate && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isOverdue() ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'
          }`}>
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
            {isOverdue() && <span className="ml-1 text-red-600 font-bold">¡Vencida!</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;