import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  BarChart3,
  MessageSquare,
  Settings as SettingsIcon,
  Utensils,
  TrendingDown,
  Truck,
  Shield,
  Bell,
  Award,
  Star,
  Ban,
  Download,
  CheckCircle2,
  Mail,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import { GlassCard } from './GlassCard';

interface SettingsProps {
  userRole: string;
  userProfile: {
    name: string;
    email: string;
  };
}

export const Settings: React.FC<SettingsProps> = ({ userRole, userProfile }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    const loadFeedbacks = () => {
      const saved = localStorage.getItem('sfirn_feedbacks');
      if (saved) {
        setAllFeedbacks(JSON.parse(saved).reverse());
      }
    };
    loadFeedbacks();
    window.addEventListener('storage', loadFeedbacks);
    return () => window.removeEventListener('storage', loadFeedbacks);
  }, []);

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const feedbackData = {
        id: Math.random().toString(36).substr(2, 9),
        userName: userProfile.name,
        userEmail: userProfile.email,
        userRole: userRole,
        message: feedback,
        timestamp: new Date().toLocaleString(),
      };

      const existing = JSON.parse(localStorage.getItem('sfirn_feedbacks') || '[]');
      localStorage.setItem('sfirn_feedbacks', JSON.stringify([...existing, feedbackData]));

      window.dispatchEvent(new Event('storage'));

      setLoading(false);
      setIsSubmitted(true);
      setFeedback('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const renderProfile = () => (
    <GlassCard className="bg-white/90 border-white shadow-2xl mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
      <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-3xl font-black text-white shadow-2xl">
            {userProfile.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-600 rounded-lg shadow-lg">
            <Shield className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
            <h2 className="text-2xl font-black tracking-tight text-[#020617]">{userProfile.name}</h2>
            <span className="px-3 py-0.5 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200 text-slate-600">
              {userRole.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-[#1e293b]">
            <Mail className="w-4 h-4 text-emerald-600" /> {userProfile.email}
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Identity Verified</span>
        </div>
      </div>
    </GlassCard>
  );

  const renderAdminSettings = () => (
    <div className="space-y-8">
      <GlassCard className="bg-white border-white shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-black text-2xl text-slate-900 flex items-center gap-3">
            <Users className="w-6 h-6 text-emerald-600" />
            User Management
          </h3>
          <span className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Approve / Block</span>
        </div>
        <div className="space-y-4">
          {[
            { name: "Sunshine Mess", role: "Mess Owner", status: "Pending" },
            { name: "Global Relief NGO", role: "NGO", status: "Active" },
            { name: "Prof. Rajesh Kumar", role: "Teacher", status: "Active" }
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-slate-400 border border-slate-100">{user.name.charAt(0)}</div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-emerald-700 transition-all">Approve</button>
                <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all"><Ban className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard className="bg-white border-white shadow-xl h-full">
            <h3 className="font-black text-2xl text-slate-900 mb-8 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              Community Feedback
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              {allFeedbacks.length > 0 ? allFeedbacks.map((f) => (
                <div key={f.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-200 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs uppercase">
                        {f.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-xs">{f.userName}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{f.userRole}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">{f.timestamp}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{f.message}"</p>
                </div>
              )) : (
                <div className="text-center py-20 text-slate-300 font-bold">No feedback received yet.</div>
              )}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="bg-slate-900 text-white">
          <h3 className="font-black text-xl mb-6 flex items-center gap-3 text-white">
            <Clock className="w-6 h-6 text-emerald-400" />
            Global Timing
          </h3>
          <div className="space-y-4">
            {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
              <div key={meal} className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                <span className="font-bold text-xs text-slate-200">{meal}</span>
                <input type="time" className="bg-transparent text-emerald-400 font-black outline-none text-xs" defaultValue={meal === 'Lunch' ? "12:30" : "08:00"} />
              </div>
            ))}
            <button className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] mt-4 shadow-xl shadow-emerald-600/20 text-white hover:bg-emerald-500 transition-all">Save Changes</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderMessSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="bg-emerald-600 text-white border-none shadow-emerald-600/20">
          <Utensils className="w-10 h-10 mb-4 text-white/50" />
          <h3 className="font-black text-xl mb-2 text-white">Meal Counter</h3>
          <p className="text-4xl font-black mb-1 text-white">342</p>
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Active Opt-ins</p>
        </GlassCard>

        <GlassCard className="bg-slate-900 text-white border-none">
          <TrendingDown className="w-10 h-10 mb-4 text-emerald-400" />
          <h3 className="font-black text-xl mb-2 text-white">Inventory Tip</h3>
          <p className="text-emerald-400 text-sm font-black leading-relaxed">Reduce preparation by <span className="underline italic">4.5kg</span> based on opt-outs.</p>
        </GlassCard>

        <GlassCard className="bg-white border-white shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-black text-xl text-slate-900 mb-2">Surplus Alert</h3>
            <p className="text-slate-500 text-xs font-bold mb-6">Instantly alert NGOs once meal service is complete.</p>
          </div>
          <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/20">
            Mark Available
          </button>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard className="bg-white border-white shadow-xl h-full">
            <h3 className="font-black text-2xl text-slate-900 mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-emerald-600" />
              Student Feedback
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
              {allFeedbacks.length > 0 ? allFeedbacks.map((f) => (
                <div key={f.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-200 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-black text-slate-800 text-xs">{f.userName}</p>
                    <span className="text-[9px] font-black text-slate-400 uppercase">{f.timestamp}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 italic leading-relaxed">"{f.message}"</p>
                </div>
              )) : (
                <div className="text-center py-20 text-slate-300 font-bold">No student feedback yet.</div>
              )}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="bg-white border-white shadow-xl">
          <h3 className="font-black text-2xl text-slate-900 mb-8 flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-600" />
            NGO
          </h3>
          <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
            <h4 className="font-black text-slate-900 text-lg mb-1">Robin Hood Army</h4>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6">Assigned NGO</p>
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg">
              <MessageSquare className="w-4 h-4" /> Message
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderStudentSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-none shadow-2xl overflow-hidden relative">
          <div className="relative z-10 py-6">
            <Award className="w-12 h-12 mb-6 text-white/50" />
            <h3 className="font-black text-3xl mb-2 text-white">You've saved 15 meals!</h3>
            <p className="text-emerald-100 font-bold">Your responsible choices helped feed 5 families this month.</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </GlassCard>

        <GlassCard className="bg-white border-white shadow-xl">
          <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-3">
            <Star className="w-6 h-6 text-emerald-600" />
            Meal Quality Feedback
          </h3>
          <div className="space-y-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-32 bg-slate-50 border border-slate-100 rounded-[32px] p-6 outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-sm text-slate-900 transition-all"
              placeholder="How was your meal today? Tell us about taste and quantity..."
            />
            <button
              onClick={handleSubmitFeedback}
              disabled={loading || !feedback.trim()}
              className={`w-full py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isSubmitted ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                loading ? 'bg-slate-800 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-xl'
              }`}
            >
              {loading ? "Processing..." : isSubmitted ? "Feedback Logged" : "Submit Feedback"}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderNGOSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="bg-white/90 border-white shadow-xl">
          <h3 className="font-black text-2xl text-slate-900 mb-8 flex items-center gap-3">
            <Bell className="w-6 h-6 text-emerald-600" />
            Alert Preferences
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-black text-slate-900 text-sm">Push Notifications</p>
                <p className="text-[10px] font-bold text-slate-500">Get alerts when food is marked ready</p>
              </div>
              <div className="w-12 h-6 bg-emerald-600 rounded-full flex items-center px-1 transition-all"><div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" /></div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-black text-slate-900 text-sm">Radius Sensitivity</p>
                <p className="text-[10px] font-bold text-slate-500">Alert for mess units within 5km</p>
              </div>
              <span className="font-black text-emerald-600 text-sm">5 km</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-slate-900 text-white border-none shadow-2xl">
          <h3 className="font-black text-xl mb-8 flex items-center gap-3 text-white">
            <Truck className="w-6 h-6 text-emerald-400" />
            Active Collection List
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all cursor-pointer">
              <div>
                <p className="font-black text-sm text-white">Mess Hall 4</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">12kg • Ready for pickup</p>
              </div>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500">Mark Collected</button>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="bg-emerald-600 text-white border-none shadow-2xl shadow-emerald-600/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="font-black text-2xl mb-1 text-white">Impact Certificate</h3>
              <p className="text-emerald-50 font-bold">You have fed <span className="text-white underline font-black">1,285 people</span> via this platform.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-emerald-600 rounded-[32px] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-emerald-50 transition-all">
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </GlassCard>
    </div>
  );

  const renderContent = () => {
    switch (userRole) {
      case 'admin': return renderAdminSettings();
      case 'mess_owner': return renderMessSettings();
      case 'student':
      case 'teacher': return renderStudentSettings();
      case 'ngo_rep': return renderNGOSettings();
      default: return <div className="text-center py-20 text-slate-400 font-black">Role context not found.</div>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Role Management & Preferences</h1>
        <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px]">
          {userRole.replace('_', ' ')} Portal • SFIRN Network Settings
        </p>
      </div>

      {renderProfile()}
      {renderContent()}
    </div>
  );
};
