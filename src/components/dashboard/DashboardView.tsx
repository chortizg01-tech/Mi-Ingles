import React from 'react';
import { Sparkles, ArrowRight, Target, Clock, AlertTriangle, BookOpen, Mic, PenTool, RotateCcw, ChevronRight, Brain, Headphones } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { adaptiveEngine } from '../../services/adaptiveEngine';
import { TabType } from '../layout/BottomNav';

interface DashboardViewProps {
  onNavigate: (tab: TabType, extra?: { lessonId?: string; scenarioId?: string }) => void;
  onOpenAssessment: () => void;
  onOpenNeuroBooster?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenAssessment, onOpenNeuroBooster }) => {
  const { user, errorBank } = useStudy();

  const progressToC1 = adaptiveEngine.calculateProgressToC1(user);
  const recommendation = adaptiveEngine.getNextRecommendedActivity(user, errorBank);
  const weakSpots = adaptiveEngine.getWeakestSkills(user.masteryScores).slice(0, 2);

  const hoursToday = (user.todayStudyMinutes / 60).toFixed(1);
  const targetHours = (user.dailyGoalMinutes / 60).toFixed(0);
  const percentDailyGoal = Math.min(100, Math.round((user.todayStudyMinutes / user.dailyGoalMinutes) * 100));
  const remainingMinutes = Math.max(0, user.dailyGoalMinutes - user.todayStudyMinutes);
  const remainingHours = (remainingMinutes / 60).toFixed(1);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-8">
      {/* Welcome & Level Overview Banner */}
      <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 rounded-3xl p-5 text-white shadow-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-200">
              Ruta Intensiva a C1 (Base {user.currentLevel})
            </span>
            <h1 className="text-xl font-extrabold mt-0.5 flex items-center gap-2">
              Nivel {user.currentLevel}
              <span className="text-xs bg-brand-500/80 px-2 py-0.5 rounded-full font-medium">
                Objetivo {user.targetLevel}
              </span>
            </h1>
          </div>
          <button
            onClick={onOpenAssessment}
            className="bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Test Nivel</span>
          </button>
        </div>

        {/* C1 Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs text-brand-100 mb-1.5 font-medium">
            <span>Progreso acumulado hacia C1</span>
            <span className="font-bold text-white">{progressToC1}%</span>
          </div>
          <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressToC1}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Neurolinguistic PNL Booster Card */}
      {onOpenNeuroBooster && (
        <div
          onClick={onOpenNeuroBooster}
          className="bg-gradient-to-r from-indigo-950 via-slate-900 to-brand-950 rounded-2xl p-4 text-white shadow-card border border-brand-800/50 cursor-pointer hover:border-brand-500 transition-all flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-500/30 rounded-2xl border border-brand-400/40 text-amber-300">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-white">Gimnasio Neurolingüístico (PNL)</span>
                <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                  Neuro-Learning
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Práctica de Shadowing vocal, chunks neuronales y anclajes multisensoriales VAK.
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-brand-400 shrink-0" />
        </div>
      )}

      {/* 4-Hour Daily Study Goal Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-50 text-brand-600 rounded-xl">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Meta Diaria (4 Horas)</h2>
              <p className="text-xs text-slate-500">
                {percentDailyGoal >= 100 ? '¡Objetivo diario cumplido!' : `Faltan ${remainingHours}h para completar`}
              </p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
            {hoursToday}h / {targetHours}h
          </span>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentDailyGoal >= 100 ? 'bg-emerald-500' : 'bg-brand-500'
            }`}
            style={{ width: `${percentDailyGoal}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-2.5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {user.todayStudyMinutes} minutos estudiados hoy
          </span>
          <span className="font-semibold text-slate-700">{percentDailyGoal}%</span>
        </div>
      </div>

      {/* Recommended Next Activity (Smart Adaptive Engine) */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 text-white shadow-card relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-white px-2 py-0.5 rounded-md">
            {recommendation.badge}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Recomendado por IA</span>
        </div>

        <h3 className="text-base font-bold text-white mb-1">{recommendation.title}</h3>
        <p className="text-xs text-slate-300 mb-3 line-clamp-2">{recommendation.subtitle}</p>

        <p className="text-[11px] text-brand-200 bg-brand-950/60 p-2 rounded-xl mb-3 border border-brand-800/40">
          💡 {recommendation.reason}
        </p>

        <button
          onClick={() => {
            if (recommendation.type === 'lesson' && recommendation.targetId) {
              onNavigate('roadmap', { lessonId: recommendation.targetId });
            } else if (recommendation.type === 'review') {
              onNavigate('review');
            } else if (recommendation.type === 'writing') {
              onNavigate('writing');
            } else if (recommendation.type === 'speaking') {
              onNavigate('speaking');
            } else {
              onNavigate('roadmap');
            }
          }}
          className="w-full bg-white text-slate-900 hover:bg-slate-100 active:scale-98 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
        >
          <span>Iniciar Actividad</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
        </button>
      </div>

      {/* Skills Mastery Grid */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
        <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
          <span>Dominio por Habilidades</span>
          <span className="text-[11px] font-normal text-slate-400">Escala 0-100%</span>
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(user.masteryScores).map(([skill, score]) => (
            <div key={skill} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 capitalize mb-1">
                <span>{skill}</span>
                <span className="text-brand-600 font-bold">{score}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-500 h-full rounded-full"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptive Weak Spots Card */}
      {weakSpots.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-amber-900">Áreas que requieren mayor atención</h3>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Tus habilidades de <strong className="capitalize">{weakSpots[0]?.skill}</strong> ({weakSpots[0]?.score}%) y <strong className="capitalize">{weakSpots[1]?.skill}</strong> ({weakSpots[1]?.score}%) han registrado mayor tasa de dudas. Te sugerimos sesiones de refuerzo específicas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => onNavigate('speaking')}
          className="bg-white hover:bg-slate-50 border border-slate-200/90 p-3 rounded-2xl flex flex-col items-center text-center shadow-2xs active:scale-95 transition-all"
        >
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl mb-1.5">
            <Mic className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">Speaking</span>
          <span className="text-[10px] text-slate-400">Voz con IA</span>
        </button>

        <button
          onClick={() => onNavigate('writing')}
          className="bg-white hover:bg-slate-50 border border-slate-200/90 p-3 rounded-2xl flex flex-col items-center text-center shadow-2xs active:scale-95 transition-all"
        >
          <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl mb-1.5">
            <PenTool className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">Writing</span>
          <span className="text-[10px] text-slate-400">Corrección C1</span>
        </button>

        <button
          onClick={() => onNavigate('review')}
          className="bg-white hover:bg-slate-50 border border-slate-200/90 p-3 rounded-2xl flex flex-col items-center text-center shadow-2xs active:scale-95 transition-all"
        >
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl mb-1.5">
            <RotateCcw className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">Repaso</span>
          <span className="text-[10px] text-slate-400">Baúl errores</span>
        </button>
      </div>
    </div>
  );
};
