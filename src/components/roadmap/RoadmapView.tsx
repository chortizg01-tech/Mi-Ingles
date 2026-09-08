import React, { useState } from 'react';
import { CheckCircle2, Lock, Play, BookOpen, Headphones, PenTool, Mic, Sparkles, ChevronRight, Award } from 'lucide-react';
import { CURRICULUM_UNITS } from '../../data/curriculum';
import { CEFRSubLevel, Lesson, SkillType } from '../../types';
import { useStudy } from '../../context/StudyContext';

interface RoadmapViewProps {
  onSelectLesson: (lesson: Lesson) => void;
  initialLessonId?: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectLesson, initialLessonId }) => {
  const { user } = useStudy();
  const [selectedLevel, setSelectedLevel] = useState<CEFRSubLevel>(user.currentLevel || 'A2.1');

  const levels: CEFRSubLevel[] = ['A2.1', 'A2.2', 'B1.1', 'B1.2', 'B2.1', 'B2.2', 'C1.1', 'C1.2'];
  const filteredUnits = CURRICULUM_UNITS.filter(u => u.level === selectedLevel);

  const getSkillIcon = (skill: SkillType) => {
    switch (skill) {
      case 'reading': return BookOpen;
      case 'listening': return Headphones;
      case 'writing': return PenTool;
      case 'speaking': return Mic;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">Ruta de Aprendizaje</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Progresión estructurada y continua de A2/B1 a nivel C1.
        </p>
      </div>

      {/* Level Selection Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {levels.map(lvl => {
          const isSelected = selectedLevel === lvl;
          const isCurrent = user.currentLevel === lvl;

          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{lvl}</span>
              {isCurrent && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Units & Lessons */}
      <div className="space-y-6">
        {filteredUnits.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 text-slate-500">
            <p className="text-sm">Próximamente más unidades para {selectedLevel}.</p>
          </div>
        ) : (
          filteredUnits.map(unit => {
            const completedCount = unit.lessons.filter(l => user.completedLessonIds.includes(l.id)).length;
            const isUnitFinished = completedCount === unit.lessons.length && unit.lessons.length > 0;

            return (
              <div key={unit.id} className="space-y-3">
                {/* Unit Header */}
                <div className="bg-slate-100/90 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                      Unidad {unit.number} • {unit.level}
                    </span>
                    <h2 className="text-sm font-bold text-slate-800 mt-1">{unit.title}</h2>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{unit.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-600">
                      {completedCount}/{unit.lessons.length}
                    </span>
                    <span className="text-[10px] block text-slate-400">completadas</span>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-2.5">
                  {unit.lessons.map((lesson, idx) => {
                    const isCompleted = user.completedLessonIds.includes(lesson.id);
                    const SkillIcon = getSkillIcon(lesson.focusSkill);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isCompleted
                            ? 'border-emerald-200 hover:border-emerald-300 shadow-2xs'
                            : 'border-slate-200 hover:border-brand-300 shadow-card hover:shadow-card-hover'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-brand-50 text-brand-600'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <SkillIcon className="w-5 h-5" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                Lección {idx + 1} • {lesson.durationMinutes} min
                              </span>
                              <span className="text-[10px] font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded capitalize">
                                {lesson.focusSkill}
                              </span>
                            </div>
                            <h3 className="text-xs font-bold text-slate-900 leading-snug">{lesson.title}</h3>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{lesson.subtitle}</p>
                          </div>
                        </div>

                        <button
                          className={`p-2 rounded-xl transition-all ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95 shadow-xs'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
