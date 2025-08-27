import React from 'react';
import { Task } from '../types/Task';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ProgressBarProps {
  tasks: Task[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completada').length;
  const inProgressTasks = tasks.filter(task => task.status === 'en-progreso').length;
  const pendingTasks = tasks.filter(task => task.status === 'pendiente').length;
  
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Progreso General</h2>
        <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completadas</p>
            <p className="text-xl font-semibold text-gray-900">{completedTasks}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">En Progreso</p>
            <p className="text-xl font-semibold text-gray-900">{inProgressTasks}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="text-xl font-semibold text-gray-900">{pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;