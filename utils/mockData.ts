import { Phase, Resource } from '../types';

export const resources: Resource[] = [
  { id: 'r1', name: 'Alex (Lead)', role: 'DevOps Lead', assignedTaskIds: ['t1-1', 't2-1', 't3-1'] },
  { id: 'r2', name: 'Sarah (Eng)', role: 'Platform Eng', assignedTaskIds: ['t1-2', 't1-3', 't2-2'] },
  { id: 'r3', name: 'Mike (Sec)', role: 'Security Eng', assignedTaskIds: ['t1-4', 't3-2'] },
];

export const phases: Phase[] = [
  {
    id: 'phase0',
    title: 'Phase 0: Vision & Framing',
    description: 'Define project purpose, constraints, and core system boundaries.',
    status: 'completed',
    startDate: '2023-10-01',
    endDate: '2023-10-14',
    tasks: [
      { 
        id: 't0-1', 
        title: 'Define Project Constraints', 
        status: 'completed', 
        completed: true, 
        estimatedHours: 4, 
        actualHours: 5, 
        assignee: 'Alex (Lead)', 
        risk: 0.2,
        description: 'Establish the hard technical and operational constraints for the Northstar system. Includes budget, timeline (2-4 week cycles), and "no rounded corners" design mandate.',
        logs: [
          { date: '2023-10-02', hours: 2, comment: 'Initial drafting of constraints doc.' },
          { date: '2023-10-03', hours: 3, comment: 'Review with stakeholders and finalization.' }
        ]
      },
      { 
        id: 't0-2', 
        title: 'Map System Boundaries', 
        status: 'completed', 
        completed: true, 
        estimatedHours: 8, 
        actualHours: 7, 
        assignee: 'Alex (Lead)', 
        risk: 0.4,
        description: 'Diagram the integration points between the dashboard and external auth providers (OAuth), as well as data persistence layers.',
        logs: [
          { date: '2023-10-05', hours: 4, comment: 'Whiteboarding session.' },
          { date: '2023-10-06', hours: 3, comment: 'Documentation and diagram export.' }
        ]
      },
      { 
        id: 't0-3', 
        title: 'Identify Invariants', 
        status: 'completed', 
        completed: true, 
        estimatedHours: 6, 
        actualHours: 6, 
        assignee: 'Sarah (Eng)', 
        risk: 0.1,
        description: 'List all non-negotiable system behaviors including error boundary responses and accessibility compliance standards (WCAG 2.2).',
        logs: [
          { date: '2023-10-08', hours: 6, comment: 'Research and documentation.' }
        ]
      },
    ]
  },
  {
    id: 'phase1',
    title: 'Phase 1: Architecture',
    description: 'Map data models, flow architecture, and interaction surfaces.',
    status: 'active',
    startDate: '2023-10-15',
    endDate: '2023-10-29',
    tasks: [
      { 
        id: 't1-1', 
        title: 'Define Domain Objects', 
        status: 'completed', 
        completed: true, 
        estimatedHours: 12, 
        actualHours: 14, 
        assignee: 'Alex (Lead)', 
        risk: 0.3,
        description: 'Create TypeScript interfaces for Task, Phase, Resource, and Metric. Ensure type safety across the entire stack.',
        logs: [
          { date: '2023-10-16', hours: 8, comment: 'Core type definitions created.' },
          { date: '2023-10-17', hours: 6, comment: 'Refactoring to support nested dependencies.' }
        ]
      },
      { 
        id: 't1-2', 
        title: 'Async Flow Mapping', 
        status: 'in-progress', 
        completed: false, 
        estimatedHours: 16, 
        actualHours: 8, 
        assignee: 'Sarah (Eng)', 
        dependencies: ['t1-1'], 
        risk: 0.6,
        description: 'Design the asynchronous data fetching strategy, including loading states, error handling, and retry logic for the Dashboard and Phase views.',
        logs: [
          { date: '2023-10-20', hours: 8, comment: 'Drafting async thunks and API wrappers.' }
        ]
      },
      { 
        id: 't1-3', 
        title: 'API Surface Definition', 
        status: 'pending', 
        completed: false, 
        estimatedHours: 8, 
        assignee: 'Sarah (Eng)', 
        risk: 0.2,
        description: 'Document the REST API endpoints required for the frontend, including response shapes and error codes.' 
      },
      { 
        id: 't1-4', 
        title: 'Security Boundary Review', 
        status: 'pending', 
        completed: false, 
        estimatedHours: 4, 
        assignee: 'Mike (Sec)', 
        risk: 0.8,
        description: 'Audit the architecture for potential auth bypasses or data leakage, specifically focusing on JWT handling.'
      },
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: Implementation Roadmap',
    description: 'Plan milestones, risks, resource allocation and scaling.',
    status: 'planned',
    startDate: '2023-10-30',
    endDate: '2023-11-14',
    tasks: [
      { id: 't2-1', title: 'Critical Path Analysis', status: 'pending', completed: false, estimatedHours: 6, assignee: 'Alex (Lead)', risk: 0.5, description: 'Identify the sequence of tasks that determine the minimum project duration.' },
      { id: 't2-2', title: 'Scaling Strategy Doc', status: 'pending', completed: false, estimatedHours: 10, assignee: 'Sarah (Eng)', risk: 0.4, description: 'Plan for horizontal scaling of the node services.' },
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3: QA & Launch',
    description: 'Automated tests, metrics dashboard, and user acceptance.',
    status: 'planned',
    startDate: '2023-11-15',
    endDate: '2023-11-30',
    tasks: [
      { id: 't3-1', title: 'Implement Error Handling', status: 'pending', completed: false, estimatedHours: 12, assignee: 'Alex (Lead)', risk: 0.2, description: 'Global error boundaries and toast notifications.' },
      { id: 't3-2', title: 'Security Audit', status: 'pending', completed: false, estimatedHours: 16, assignee: 'Mike (Sec)', risk: 0.9, description: 'Final penetration test before go-live.' },
    ]
  }
];