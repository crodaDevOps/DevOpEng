import React from 'react';
import { Icons } from './Icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "uppercase font-bold tracking-wider transition-all duration-150 active:translate-y-[1px] rounded-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-accent text-black border border-border hover:bg-accent-glow hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,0,255,0.5)]",
    secondary: "bg-surface text-primary border border-border hover:bg-gray-300 dark:hover:bg-gray-800",
    danger: "bg-status-error text-white border border-black hover:opacity-90",
    outline: "bg-transparent text-primary border border-border hover:bg-accent hover:text-black"
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = '',
  title
}) => {
  return (
    <div className={`bg-surface border border-border p-4 relative group ${className}`}>
      {title && (
        <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-bold text-accent border border-border uppercase">
          {title}
        </div>
      )}
      {children}
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'accent' | 'success' | 'warning' | 'error' }> = ({ 
  children, 
  color = 'accent' 
}) => {
  const colors = {
    accent: 'bg-accent/20 text-accent border-accent',
    success: 'bg-status-success/20 text-status-success border-status-success',
    warning: 'bg-status-warning/20 text-status-warning border-status-warning',
    error: 'bg-status-error/20 text-status-error border-status-error',
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${colors[color]}`}>
      {children}
    </span>
  );
};

export const ProgressBar: React.FC<{ value: number; max?: number; color?: 'accent' | 'success' | 'warning' | 'error' }> = ({
  value,
  max = 100,
  color = 'accent'
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  const bgColors = {
    accent: 'bg-accent',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
  };

  return (
    <div className="w-full h-3 bg-gray-300 dark:bg-gray-800 border border-border relative">
      <div 
        className={`h-full ${bgColors[color]} transition-all duration-500`} 
        style={{ width: `${percent}%` }} 
      />
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-20 pointer-events-none" />
    </div>
  );
};

export const Toast: React.FC<{ message: string; type: 'info' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-4 p-4 border-l-4 shadow-lg animate-slide-in bg-surface border-border ${
      type === 'error' ? 'border-l-status-error' : 'border-l-accent'
    }`}>
      <span className="text-sm font-mono">{message}</span>
      <button onClick={onClose} className="text-xs uppercase hover:text-accent">[X]</button>
    </div>
  );
};

export const Drawer: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; title?: string }> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-surface border-l border-border shadow-[0_0_40px_rgba(0,0,0,0.5)] z-50 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border bg-background/95 backdrop-blur">
          <h3 className="text-lg font-black uppercase tracking-widest text-accent">{title || 'Details'}</h3>
          <button onClick={onClose} className="text-secondary hover:text-status-error transition-colors">
             <Icons.Close size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </div>
        {/* Decorative bottom edge */}
        <div className="h-2 bg-accent/10 border-t border-accent"></div>
      </div>
    </>
  );
};