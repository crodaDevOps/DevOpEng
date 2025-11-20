import { Task, Phase, Resource } from '../types';

// --------------------------------
// 1. Task Completion Percentage
// --------------------------------
export const taskCompletionPercent = (tasks: Task[]): number => {
  if (!tasks.length) return 0;
  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
};

// --------------------------------
// 2. Estimated vs Actual Hours
// --------------------------------
export const totalEstimatedHours = (tasks: Task[]): number =>
  tasks.reduce((sum, t) => sum + t.estimatedHours, 0);

export const totalActualHours = (tasks: Task[]): number =>
  tasks.reduce((sum, t) => sum + (t.actualHours ?? 0), 0);

export const scheduleVariancePercent = (tasks: Task[]): number => {
  const est = totalEstimatedHours(tasks);
  const act = totalActualHours(tasks);
  if (est === 0) return 0;
  return Math.round(((act - est) / est) * 100);
};

// --------------------------------
// 3. Velocity & Throughput
// --------------------------------
export const velocity = (tasks: Task[], periodWeeks: number): number => {
  if (periodWeeks <= 0) return 0;
  const completedHours = tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + (t.actualHours ?? t.estimatedHours), 0);
  return parseFloat((completedHours / periodWeeks).toFixed(1));
};

// --------------------------------
// 4. Risk Metrics
// --------------------------------
export const averageRisk = (tasks: Task[]): number => {
  if (!tasks.length) return 0;
  const riskSum = tasks.reduce((sum, t) => sum + (t.risk ?? 0), 0);
  return parseFloat((riskSum / tasks.length).toFixed(2));
};

export const highRiskTasks = (tasks: Task[], threshold = 0.7): Task[] =>
  tasks.filter(t => (t.risk ?? 0) >= threshold);

// --------------------------------
// 5. Dependency Checks
// --------------------------------
export const unresolvedDependencies = (tasks: Task[]): Task[] =>
  tasks.filter(
    t =>
      t.dependencies?.some(
        depId => !tasks.find(task => task.id === depId)?.completed
      ) ?? false
  );

// --------------------------------
// 6. Resource Utilization
// --------------------------------
export const resourceLoad = (tasks: Task[], resources: Resource[]): { [key: string]: number } => {
  const load: { [key: string]: number } = {};
  resources.forEach(r => {
    const hours = r.assignedTaskIds.reduce((sum, taskId) => {
      const task = tasks.find(t => t.id === taskId);
      return sum + (task?.estimatedHours ?? 0);
    }, 0);
    load[r.name] = hours;
  });
  return load;
};

// --------------------------------
// 7. Phase Progress
// --------------------------------
export const phaseProgress = (phase: Phase): number =>
  taskCompletionPercent(phase.tasks);