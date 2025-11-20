import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { phases } from '../utils/mockData';
import { taskCompletionPercent, totalEstimatedHours, totalActualHours } from '../utils/calculateMetrics';
import { Card, TaskTable, ProgressBar, Badge } from '../components';
import { Icons } from '../components/Icons';

export const PhaseView = () => {
  const { id } = useParams<{ id: string }>();
  const phase = phases.find(p => p.id === id);

  if (!phase) {
    return (
      <div className="p-12 text-center border border-status-error">
        <h2 className="text-status-error text-xl font-mono">PHASE_NOT_FOUND</h2>
        <Link to="/" className="mt-4 inline-block underline text-secondary">Return to Overview</Link>
      </div>
    );
  }

  const completion = taskCompletionPercent(phase.tasks);
  const estHours = totalEstimatedHours(phase.tasks);
  const actHours = totalActualHours(phase.tasks);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb & Header */}
      <div className="flex items-center gap-2 text-xs text-secondary uppercase mb-2">
         <Link to="/" className="hover:text-accent">Dashboard</Link>
         <Icons.ChevronRight size={10} />
         <span>{phase.id}</span>
      </div>

      <header className="border-b border-border pb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase text-primary mb-2">{phase.title}</h1>
            <p className="text-secondary font-mono max-w-2xl">{phase.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
             <Badge color={phase.status === 'active' ? 'accent' : 'warning'}>{phase.status}</Badge>
             <div className="text-xs font-mono text-right">
               {phase.startDate} / {phase.endDate}
             </div>
          </div>
        </div>
      </header>

      {/* Phase Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card title="Progress">
           <div className="flex items-end justify-between mb-2">
             <span className="text-4xl font-mono text-accent">{completion}%</span>
             <span className="text-xs text-secondary mb-1">{phase.tasks.filter(t => t.completed).length}/{phase.tasks.length} Tasks</span>
           </div>
           <ProgressBar value={completion} />
         </Card>

         <Card title="Hours (Est vs Act)">
           <div className="flex items-center gap-4 mt-2">
             <div>
               <div className="text-xs text-secondary uppercase">Estimated</div>
               <div className="text-2xl font-mono">{estHours}h</div>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div>
               <div className="text-xs text-secondary uppercase">Actual</div>
               <div className={`text-2xl font-mono ${actHours > estHours ? 'text-status-warning' : 'text-status-success'}`}>
                 {actHours}h
               </div>
             </div>
           </div>
         </Card>

         <Card title="Dependencies">
            <div className="h-full flex items-center">
               <div className="text-sm font-mono text-secondary">
                  {phase.tasks.filter(t => t.dependencies?.length).length} Inter-task dependencies detected.
               </div>
            </div>
         </Card>
      </div>

      {/* Task Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-lg font-bold uppercase text-primary flex items-center gap-2">
             <Icons.Task size={18} /> Mission Objectives
           </h3>
           <div className="flex gap-2">
             {/* Filter buttons could go here */}
           </div>
        </div>
        <TaskTable tasks={phase.tasks} />
      </div>
    </div>
  );
};