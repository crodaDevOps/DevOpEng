import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { Button, Toast } from '../components/UI';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (email.includes('@northstar.dev')) {
        navigate('/');
      } else {
        setError("Invalid credentials. Access denied.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[size:20px_20px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-md p-8 bg-surface border border-border relative z-10 shadow-2xl">
        <div className="text-center mb-8 border-b border-border pb-4">
           <h1 className="text-4xl font-black tracking-[0.3em] text-accent mb-2">NORTHSTAR</h1>
           <p className="text-secondary font-mono text-xs uppercase">Secure Access Portal v2.0</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-primary">Identifier</label>
            <div className="relative">
              <Icons.Users className="absolute left-3 top-3 text-secondary w-4 h-4" />
              <input 
                type="email" 
                required
                placeholder="user@northstar.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border p-2 pl-10 font-mono focus:outline-none focus:border-accent text-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-primary">Passkey</label>
             <div className="relative">
              <Icons.Activity className="absolute left-3 top-3 text-secondary w-4 h-4" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-background border border-border p-2 pl-10 font-mono focus:outline-none focus:border-accent text-primary"
              />
            </div>
          </div>

          <Button variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : 'Initialize Session'}
          </Button>
          
          <div className="text-center text-[10px] text-secondary mt-4">
            <p>UNAUTHORIZED ACCESS IS A VIOLATION OF PROTOCOL 7</p>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="absolute -left-1 top-1/2 h-8 w-1 bg-accent" />
        <div className="absolute -right-1 top-1/4 h-8 w-1 bg-status-error" />
      </div>
      
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
    </div>
  );
};