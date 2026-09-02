import React from 'react';
import { User, Flame, Clock, Award, Target, BookOpen, Sparkles, CheckCircle2, ChevronRight, Settings } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { storageService } from '../../services/storage';

interface ProfileViewProps {
  onOpenSettings: () => void;
  onOpenAssessment: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenSettings, onOpenAssessment }) => {
  const { user } = useStudy();
  const dailyLogs = storageService.getDailyLogs();

  const totalHours = (user.totalStudyMinutes / 60).toFixed(1);
  const maxDayMinutes = Math.max(...dailyLogs.map(l => l.minutes), 240);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-10">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-xs text-slate-500">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                Nivel Actual: {user.currentLevel}
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                {user.xp} XP
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 text-center shadow-2xs">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-1" />
          <span className="text-sm font-extrabold text-slate-900 block">{user.streakDays} días</span>
          <span className="text-[10px] text-slate-400 font-medium">Racha Activa</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 text-center shadow-2xs">
          <Clock className="w-5 h-5 text-brand-600 mx-auto mb-1" />
          <span className="text-sm font-extrabold text-slate-900 block">{totalHours}h</span>
          <span className="text-[10px] text-slate-400 font-medium">Tiempo Total</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 text-center shadow-2xs">
          <BookOpen className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <span className="text-sm font-extrabold text-slate-900 block">{user.completedLessonIds.length}</span>
          <span className="text-[10px] text-slate-400 font-medium">Lecciones</span>
        </div>
      </div>

      {/* Weekly 4-Hour Daily Study Bar Chart */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Histórico de Estudio Diario</h2>
            <p className="text-[11px] text-slate-400">Meta: 4 horas (240 min) diarias</p>
          </div>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
            Últimos 7 días
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 h-32 pt-4 px-1">
          {dailyLogs.slice(-7).map((log, i) => {
            const heightPercent = Math.min(100, Math.round((log.minutes / maxDayMinutes) * 100));
            const isGoalMet = log.minutes >= 240;
            const dayLabel = new Date(log.date).toLocaleDateString('es-ES', { weekday: 'narrow' });

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[9px] font-bold text-slate-400">{(log.minutes / 60).toFixed(1)}h</span>
                <div className="w-full bg-slate-100 rounded-t-lg h-full flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isGoalMet ? 'bg-emerald-500' : 'bg-brand-500'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase">{dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Milestone Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-5 text-white shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">Certificación de Nivel</span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
            Marco CEFR
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-white">¿Listo para calibrar tu avance hacia C1?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Realiza el test de nivelación periódico para certificar tus habilidades en Reading, Listening, Writing y Speaking.
        </p>

        <button
          onClick={onOpenAssessment}
          className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Realizar Test de Nivelación</span>
        </button>
      </div>
    </div>
  );
};
