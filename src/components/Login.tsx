import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Mail, Lock, ArrowRight, ShieldCheck, Users, Heart, GraduationCap, Shield } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LoginProps {
  onLogin: (role: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mess_owner');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin(role);
    }, 1500);
  };

  const roles = [
    { id: 'mess_owner', label: 'Mess Owner', icon: Utensils, color: 'bg-emerald-500' },
    { id: 'ngo_rep', label: 'NGO Rep', icon: Heart, color: 'bg-rose-500' },
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'bg-blue-500' },
    { id: 'admin', label: 'Admin', icon: Shield, color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

      <GlassCard className="w-full max-w-2xl border-white/10" delay={0.1}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Role Selection */}
          <div className="md:w-1/2 space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome to SFIRN</h1>
              <p className="text-slate-400 font-medium">Select your role to access the portal</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 group ${
                    role === r.id
                      ? `${r.color} border-transparent text-white shadow-lg ${r.color}/20`
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-colors ${
                    role === r.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <r.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@sfirn.org"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continue as {roles.find(r => r.id === role)?.label}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                SECURE ACCESS
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
