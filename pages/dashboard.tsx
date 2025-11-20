import React from 'react';
import { useNavigate } from 'react-router-dom';
import { phases, resources } from '../utils/mockData';
import { taskCompletionPercent, velocity, averageRisk } from '../utils/calculateMetrics';
import { Card, ProgressBar, MetricBarChart, MetricLineChart, PhaseTable, Button } from '../components';
import { Icons } from '../components/Icons';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Aggregated Metrics
  const allTasks = phases.flatMap(p => p.tasks);
  const overallCompletion = taskCompletionPercent(allTasks);
  const currentVelocity = velocity(allTasks, 4); // Mocking 4 weeks period
  const systemRisk = averageRisk(allTasks);

  // Chart Data
  const progressData = phases.map(p => ({
    name: p.title.split(':')[0], // "Phase 0"
    completion: taskCompletionPercent(p.tasks),
    risk: averageRisk(p.tasks) * 100
  }));

  const velocityData = [
    { sprint: 'Wk 1', velocity: 12 },
    { sprint: 'Wk 2', velocity: 18 },
    { sprint: 'Wk 3', velocity: 15 },
    { sprint: 'Wk 4', velocity: 22 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end border-b border-border pb-4 mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-wide text-primary">Command Center</h2>
          <p className="text-xs font-mono text-secondary mt-1">System Overview / Active Cycle Status</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-3xl font-mono text-accent">{overallCompletion}%</div>
          <div className="text-[10px] uppercase text-secondary">Total Cycle Progress</div>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Velocity" className="h-32 flex flex-col justify-between">
           <div className="flex items-center justify-between text-secondary">
             <Icons.Activity size={16} />
             <span className="text-xs">SP/Week</span>
           </div>
           <div className="text-4xl font-mono text-primary">{currentVelocity}</div>
           <ProgressBar value={75} color="accent" />
        </Card>
        
        <Card title="Risk Index" className="h-32 flex flex-col justify-between">
           <div className="flex items-center justify-between text-secondary">
             <Icons.Alert size={16} />
             <span className="text-xs">Avg Risk</span>
           </div>
           <div className={`text-4xl font-mono ${systemRisk > 0.5 ? 'text-status-error' : 'text-status-success'}`}>
             {(systemRisk * 100).toFixed(0)}
           </div>
           <ProgressBar value={systemRisk * 100} color={systemRisk > 0.5 ? 'error' : 'success'} />
        </Card>

        <Card title="Active Resources" className="h-32 flex flex-col justify-between">
           <div className="flex items-center justify-between text-secondary">
             <Icons.Users size={16} />
             <span className="text-xs">Engineers</span>
           </div>
           <div className="text-4xl font-mono text-primary">{resources.length}</div>
           <div className="text-xs text-secondary">All systems optimal</div>
        </Card>

        <Card title="System Health" className="h-32 flex flex-col justify-between bg-black/5">
           <div className="flex items-center justify-between text-secondary">
             <Icons.Settings size={16} />
             <span className="text-xs">Uptime</span>
           </div>
           <div className="text-4xl font-mono text-status-success">99.9%</div>
           <div className="text-xs text-secondary">No critical outages</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2">
           <Card title="Phase Progression" className="h-full min-h-[300px]">
             <div className="h-64 mt-4">
               <MetricBarChart data={progressData} xKey="name" yKey="completion" color="var(--accent-primary)" />
             </div>
           </Card>
        </div>
        <div>
           <Card title="Velocity Trend" className="h-full min-h-[300px]">
             <div className="h-64 mt-4">
               <MetricLineChart data={velocityData} xKey="sprint" yKeys={['velocity']} colors={['var(--accent-secondary)']} />
             </div>
           </Card>
        </div>
      </div>

      {/* Phase Table */}
      <Card title="Active Phases">
        <div className="mt-4">
          <PhaseTable phases={phases} onSelect={(id) => navigate(`/phase/${id}`)} />
        </div>
      </Card>
    </div>
  );
};