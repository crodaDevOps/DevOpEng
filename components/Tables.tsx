import React, { useState } from 'react';
import { Task, Phase } from '../types';
import { Badge, Drawer } from './UI';
import { Icons } from './Icons';

interface TaskTableProps {
  tasks: Task[];
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <div className="overflow-x-auto border border-border bg-surface">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-background text-primary uppercase border-b border-border">
            <tr>
              <th className="p-3 border-r border-border">Status</th>
              <th className="p-3 border-r border-border">Task Name</th>
              <th className="p-3 border-r border-border">Assignee</th>
              <th className="p-3 border-r border-border">Est. Hours</th>
              <th className="p-3 border-r border-border">Act. Hours</th>
              <th className="p-3 border-r border-border">Risk</th>
              <th className="p-3">Deps</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-3 border-r border-border">
                  <Badge color={task.completed ? 'success' : task.status === 'blocked' ? 'error' : 'accent'}>
                    {task.status}
                  </Badge>
                </td>
                <td className="p-3 border-r border-border font-bold text-primary">
                  <button 
                    onClick={() => setSelectedTask(task)}
                    className="hover:text-accent hover:underline decoration-dotted underline-offset-4 text-left w-full flex items-center gap-2 group"
                  >
                    <Icons.ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
                    {task.title}
                  </button>
                </td>
                <td className="p-3 border-r border-border text-secondary">{task.assignee}</td>
                <td className="p-3 border-r border-border text-right">{task.estimatedHours}</td>
                <td className="p-3 border-r border-border text-right">{task.actualHours || '-'}</td>
                <td className="p-3 border-r border-border">
                   <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-300 dark:bg-gray-700">
                        <div 
                          className={`h-full ${task.risk > 0.7 ? 'bg-status-error' : task.risk > 0.3 ? 'bg-status-warning' : 'bg-status-success'}`}
                          style={{ width: `${task.risk * 100}%` }}
                        />
                      </div>
                      <span>{(task.risk * 100).toFixed(0)}%</span>
                   </div>
                </td>
                <td className="p-3 text-secondary">
                  {task.dependencies && task.dependencies.length > 0 ? (
                    <div className="flex gap-1">
                      {task.dependencies.map(d => (
                        <span key={d} className="text-[10px] border border-border px-1">{d}</span>
                      ))}
                    </div>
                  ) : <span className="opacity-20">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        title={`Obj // ${selectedTask?.id}`}
      >
        {selectedTask && (
          <div className="space-y-8 font-mono text-sm">
            
            {/* Status Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-border border-dashed">
              <Badge color={selectedTask.status === 'completed' ? 'success' : 'accent'} >
                 {selectedTask.status}
              </Badge>
              <span className="text-xs text-secondary">
                Assignee: <span className="text-primary font-bold">{selectedTask.assignee}</span>
              </span>
            </div>

            {/* Main Description */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                <Icons.Task size={14}/> Briefing
              </label>
              <div className="p-4 bg-black/5 dark:bg-white/5 border border-border text-primary leading-relaxed">
                <h4 className="font-bold mb-2">{selectedTask.title}</h4>
                <p className="text-secondary">
                  {selectedTask.description || "No detailed intel available for this objective."}
                </p>
              </div>
            </div>

            {/* Risk & Metrics */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 border border-border bg-surface">
                  <label className="text-xs uppercase text-secondary mb-1 block">Risk Level</label>
                  <div className="text-2xl font-bold text-primary">{(selectedTask.risk * 100).toFixed(0)}%</div>
                  <div className="w-full h-1 bg-border mt-2">
                    <div className="h-full bg-status-error" style={{ width: `${selectedTask.risk * 100}%` }}></div>
                  </div>
               </div>
               <div className="p-4 border border-border bg-surface">
                  <label className="text-xs uppercase text-secondary mb-1 block">Hours (Est/Act)</label>
                  <div className="text-2xl font-bold text-primary">
                    {selectedTask.estimatedHours} <span className="text-secondary text-lg">/ {selectedTask.actualHours || 0}</span>
                  </div>
               </div>
            </div>

            {/* Work Logs */}
            <div>
              <label className="text-xs uppercase tracking-widest text-secondary mb-3 block flex items-center gap-2">
                <Icons.Activity size={14} /> Time Logs
              </label>
              <div className="border border-border">
                 <table className="w-full text-left text-xs">
                    <thead className="bg-black/5 dark:bg-white/5 text-secondary uppercase">
                       <tr>
                         <th className="p-3 border-b border-border">Date</th>
                         <th className="p-3 border-b border-border">Hrs</th>
                         <th className="p-3 border-b border-border">Comment</th>
                       </tr>
                    </thead>
                    <tbody>
                      {selectedTask.logs?.map((log, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-3 text-primary border-r border-border">{log.date}</td>
                          <td className="p-3 text-primary border-r border-border font-bold">{log.hours}</td>
                          <td className="p-3 text-secondary italic">{log.comment}</td>
                        </tr>
                      ))}
                      {(!selectedTask.logs || selectedTask.logs.length === 0) && (
                         <tr>
                           <td colSpan={3} className="p-4 text-center text-secondary italic">No activity logged in system.</td>
                         </tr>
                      )}
                    </tbody>
                 </table>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

interface PhaseListProps {
  phases: Phase[];
  onSelect: (id: string) => void;
}

export const PhaseTable: React.FC<PhaseListProps> = ({ phases, onSelect }) => {
  return (
    <div className="overflow-hidden border border-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-background border-b border-border">
          <tr>
            <th className="p-4 border-r border-border">Phase</th>
            <th className="p-4 border-r border-border">Status</th>
            <th className="p-4 border-r border-border">Dates</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {phases.map(phase => (
            <tr key={phase.id} className="group hover:bg-black/5 dark:hover:bg-white/5">
              <td className="p-4 border-r border-border">
                <div className="font-bold text-primary">{phase.title}</div>
                <div className="text-xs text-secondary mt-1">{phase.description}</div>
              </td>
              <td className="p-4 border-r border-border">
                <Badge color={phase.status === 'completed' ? 'success' : phase.status === 'active' ? 'accent' : 'warning'}>
                  {phase.status}
                </Badge>
              </td>
              <td className="p-4 border-r border-border text-xs font-mono">
                {phase.startDate} <span className="text-accent">→</span> {phase.endDate}
              </td>
              <td className="p-4">
                <button 
                  onClick={() => onSelect(phase.id)}
                  className="text-accent hover:underline flex items-center gap-1 font-bold text-xs uppercase"
                >
                  View Details <Icons.ArrowRight size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};