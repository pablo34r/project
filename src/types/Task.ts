export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  priority: 'alta' | 'media' | 'baja';
  status: 'pendiente' | 'en-progreso' | 'completada';
  dueDate: string;
}