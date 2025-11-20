export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';

export interface LogEntry {
  date: string;
  hours: number;
  comment: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  completed: boolean;
  estimatedHours: number;
  actualHours?: number;
  assignee: string;
  dependencies?: string[]; // IDs of tasks this task depends on
  risk: number; // 0.0 to 1.0
  logs?: LogEntry[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  tasks: Task[];
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  assignedTaskIds: string[];
}

export interface MetricSummary {
  completion: number;
  velocity: number;
  riskScore: number;
  riskCount: number;
  totalEstimated: number;
  totalActual: number;
  scheduleVariance: number;
}