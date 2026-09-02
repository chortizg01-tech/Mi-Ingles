import React, { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle, Sparkles, BookOpen, AlertTriangle, ArrowRight, Award, Flame, Volume2 } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { ErrorItem } from '../../types';
import { speechService } from '../../services/speechService';

export const SmartReviewView: React.FC = () => {
  const { errorBank, resolveErrorItem, recordMistake, triggerConfetti } = useStudy();
  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  const today = new Date().toISOString().split('T')[0];
  const pendingErrors = errorBank.filter(e => !e.isMastered && e.nextReviewDate <= today);
  const masteredErrors = errorBank.filter(e => e.isMastered);

  const currentItem: ErrorItem | undefined = pendingErrors[currentIdx];

  const handleStartSRS = () => {
    setActiveSession(true);
    setCurrentIdx(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  const handleReviewAnswer = (remembered: boolean) => {
    if (!currentItem) return;

    if (remembered) {
      resolveErrorItem(currentItem.id);
    } else {
      // Failed recall
      recordMistake({
        category: currentItem.category,
        skill: currentItem.skill,
        mistake: currentItem.mistake,
        correction: currentItem.correction,
        explanation: currentItem.explanation
      });
    }

    setIsFlipped(false);
    if (currentIdx + 1 < pendingErrors.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setSessionCompleted(true);
      triggerConfetti();
    }
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text, { accent: 'UK' });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">Repaso Inteligente</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Algoritmo adaptativo de repetición espaciada para erradicar errores.
        </p>
      </div>

      {!activeSession ? (
        /* OVERVIEW & ERROR VAULT */
        <div className="space-y-5">
          {/* SRS Status Card */}
          <div className="bg-gradient-to-br from-brand-600 to-indigo-800 rounded-3xl p-5 text-white shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-200">
                  Repetición Espaciada
                </span>
                <h2 className="text-base font-extrabold mt-0.5">
                  {pendingErrors.length > 0
                    ? `${pendingErrors.length} errores listos para repasar hoy`
                    : '¡Estás al día con tus repasos!'}
                </h2>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <RotateCcw className="w-5 h-5 text-amber-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                <span className="text-brand-200 text-[10px] block">Pendientes Hoy</span>
                <span className="text-lg font-extrabold text-white">{pendingErrors.length}</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                <span className="text-brand-200 text-[10px] block">Dominados (3+ Racha)</span>
                <span className="text-lg font-extrabold text-emerald-300">{masteredErrors.length}</span>
              </div>
            </div>

            {pendingErrors.length > 0 && (
              <button
                onClick={handleStartSRS}
                className="w-full bg-white text-slate-900 hover:bg-slate-100 active:scale-98 font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <span>Iniciar Sesión de Repaso SRS</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>
            )}
          </div>

          {/* Error Bank List */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center justify-between">
              <span>Baúl de Errores Registrados</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {errorBank.length} patrones detectados
              </span>
            </h2>

            {errorBank.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-400">
                <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-500 opacity-60" />
                <p className="text-sm font-semibold text-slate-700">Sin errores registrados</p>
                <p className="text-xs mt-1">
                  Cuando falles un ejercicio o redacción, la IA lo guardará aquí para que lo repases.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {errorBank.map(item => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl p-4 border transition-all space-y-2 ${
                      item.isMastered
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      {item.isMastered ? (
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Dominado
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          Racha: {item.correctInARow}/3
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="text-rose-700 line-through">"{item.mistake}"</p>
                      <p className="text-emerald-700 font-semibold flex items-center justify-between">
                        <span>"{item.correction}"</span>
                        <button
                          onClick={() => handleSpeak(item.correction)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      💡 {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : sessionCompleted ? (
        /* SESSION FINISHED SUMMARY */
        <div className="p-6 text-center space-y-5 bg-white rounded-3xl border border-slate-200 shadow-card">
          <Award className="w-12 h-12 mx-auto text-emerald-500 animate-bounce" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              ¡Repaso Completado!
            </span>
            <h2 className="text-lg font-extrabold text-slate-900 mt-2">Memoria a Largo Plazo Reforzada</h2>
            <p className="text-xs text-slate-500 mt-1">
              Has revisado todos los ítems pendientes para hoy. El algoritmo programará la siguiente repetición automáticamente.
            </p>
          </div>

          <button
            onClick={() => setActiveSession(false)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md"
          >
            Volver al Baúl de Errores
          </button>
        </div>
      ) : currentItem ? (
        /* INTERACTIVE SRS FLASHCARD CARD */
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Tarjeta {currentIdx + 1} de {pendingErrors.length}</span>
            <span className="font-bold text-brand-600">{currentItem.category}</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4 min-h-[260px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                Corrige el error en tu mente
              </span>
              <h2 className="text-base font-extrabold text-slate-900 mt-3 line-through text-rose-700">
                "{currentItem.mistake}"
              </h2>
            </div>

            {isFlipped ? (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Forma Correcta:</span>
                  <p className="text-sm font-extrabold text-emerald-800 mt-0.5 flex items-center justify-between">
                    <span>"{currentItem.correction}"</span>
                    <button
                      onClick={() => handleSpeak(currentItem.correction)}
                      className="p-1.5 bg-emerald-50 rounded-lg text-emerald-700 hover:bg-emerald-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </p>
                </div>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  💡 {currentItem.explanation}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs transition-all"
              >
                Voltear Tarjeta para Revelar Respuesta
              </button>
            )}
          </div>

          {isFlipped && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleReviewAnswer(false)}
                className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold py-3.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>No lo recordé</span>
              </button>

              <button
                onClick={() => handleReviewAnswer(true)}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-card transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>¡Lo recordé bien!</span>
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
