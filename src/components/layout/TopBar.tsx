import React from 'react';
import { Flame, Clock, Play, Pause, Settings, Sparkles } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

interface TopBarProps {
  onOpenSettings: () => void;
  onOpenAssessment: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSettings, onOpenAssessment }) => {
  const { user, isTimerRunning, toggleStudyTimer } = useStudy();

  const hoursStudied = (user.todayStudyMinutes / 60).toFixed(1);
  const targetHours = (user.dailyGoalMinutes / 60).toFixed(0);
  const percentComplete = Math.min(100, Math.round((user.todayStudyMinutes / user.dailyGoalMinutes) * 100));

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Level Badge */}
      <button
        onClick={onOpenAssessment}
        className="flex items-center gap-1.5 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-2.5 py-1 rounded-full text-xs font-bold text-brand-700 transition-all active:scale-95"
        title="Ver certificación o diagnóstico de nivel"
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
        <span>{user.currentLevel}</span>
        <span className="text-[10px] text-brand-400">➔ C1</span>
      </button>

      {/* Center: 4-Hour Daily Study Goal Tracker */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-full px-3 py-1 shadow-2xs">
        <button
          onClick={toggleStudyTimer}
          className={`p-1 rounded-full transition-all ${
            isTimerRunning
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
          title={isTimerRunning ? 'Pausar temporizador de estudio' : 'Reanudar temporizador de estudio'}
        >
          {isTimerRunning ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>

        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-bold text-slate-800">
            {hoursStudied}h
            <span className="text-[11px] font-normal text-slate-500">/{targetHours}h</span>
          </span>
        </div>

        {/* Small progress indicator ring or dot */}
        <div className="w-4 h-4 relative flex items-center justify-center">
          <svg className="w-4 h-4 transform -rotate-90">
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="#e2e8f0"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="#4f46e5"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={37.7}
              strokeDashoffset={37.7 - (37.7 * percentComplete) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Right: Streak & Settings */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full text-xs font-bold text-amber-800"
          title="Racha de días de estudio consecutivos"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse-subtle" />
          <span>{user.streakDays}</span>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
          title="Configuración y Supabase"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
