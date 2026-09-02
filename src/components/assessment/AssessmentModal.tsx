import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Award, ChevronRight, BookOpen, RotateCcw } from 'lucide-react';
import { PLACEMENT_TEST_QUESTIONS, LEVEL_CERTIFICATES } from '../../data/assessments';
import { CEFRSubLevel, AssessmentResult } from '../../types';
import { useStudy } from '../../context/StudyContext';
import { storageService } from '../../services/storage';

interface AssessmentModalProps {
  onClose: () => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ onClose }) => {
  const { user, setUserLevel, triggerConfetti } = useStudy();

  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<AssessmentResult | null>(null);

  const question = PLACEMENT_TEST_QUESTIONS[currentQIdx];

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = { ...userAnswers, [question.id]: selectedOption };
    setUserAnswers(newAnswers);
    setSelectedOption('');

    if (currentQIdx + 1 < PLACEMENT_TEST_QUESTIONS.length) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      // Calculate final level
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (answers: Record<string, string>) => {
    let correctCount = 0;
    const skillCorrect: Record<string, number> = { grammar: 0, vocabulary: 0, listening: 0 };
    const skillTotal: Record<string, number> = { grammar: 0, vocabulary: 0, listening: 0 };

    PLACEMENT_TEST_QUESTIONS.forEach(q => {
      skillTotal[q.skill] = (skillTotal[q.skill] || 0) + 1;
      if (answers[q.id] === q.correctOptionId) {
        correctCount++;
        skillCorrect[q.skill] = (skillCorrect[q.skill] || 0) + 1;
      }
    });

    const percentage = Math.round((correctCount / PLACEMENT_TEST_QUESTIONS.length) * 100);

    // Determine level placement
    let assignedLevel: CEFRSubLevel = 'B1.1';
    if (correctCount >= 7) assignedLevel = 'C1.1';
    else if (correctCount >= 5) assignedLevel = 'B2.1';
    else if (correctCount >= 3) assignedLevel = 'B1.2';
    else assignedLevel = 'B1.1';

    const result: AssessmentResult = {
      id: `diag-${Date.now()}`,
      date: new Date().toISOString(),
      type: 'placement',
      calculatedLevel: assignedLevel,
      overallScore: percentage,
      skillBreakdown: {
        grammar: Math.round(((skillCorrect.grammar || 0) / Math.max(1, skillTotal.grammar || 1)) * 100),
        vocabulary: Math.round(((skillCorrect.vocabulary || 0) / Math.max(1, skillTotal.vocabulary || 1)) * 100),
        listening: Math.round(((skillCorrect.listening || 0) / Math.max(1, skillTotal.listening || 1)) * 100),
        reading: percentage,
        writing: percentage - 5,
        speaking: percentage - 10
      },
      recommendations: [
        `Tu nivel calibrado es ${assignedLevel}. Tu plan pedagógico adaptativo se ha ajustado para enfocarse en llevarte a C1.`
      ]
    };

    storageService.saveAssessmentResult(result);
    setTestResult(result);
    setUserLevel(assignedLevel);
    setIsTestFinished(true);
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h2 className="text-sm font-extrabold text-slate-900">
              {isTestFinished ? 'Diagnóstico Completado' : 'Test de Nivelación CEFR'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {!isTestFinished ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Pregunta {currentQIdx + 1} de {PLACEMENT_TEST_QUESTIONS.length}</span>
                <span className="font-bold text-brand-600 uppercase text-[10px] bg-brand-50 px-2 py-0.5 rounded">
                  {question.skill}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-600 h-full rounded-full transition-all"
                  style={{ width: `${((currentQIdx + 1) / PLACEMENT_TEST_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {question.context && (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-150 italic leading-relaxed">
                  {question.context}
                </p>
              )}

              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                {question.prompt}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-2">
                {question.options.map(opt => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl shadow-card transition-all mt-4 flex items-center justify-center gap-1.5"
              >
                <span>{currentQIdx + 1 < PLACEMENT_TEST_QUESTIONS.length ? 'Siguiente Pregunta' : 'Finalizar y Calibrar'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : testResult ? (
            /* RESULTS & CEFR CERTIFICATE BANNER */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-50 border-4 border-brand-200 flex items-center justify-center text-brand-600 mx-auto shadow-md">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  Nivel Calibrado: {testResult.calculatedLevel}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  ¡Diagnóstico Completado!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tu ruta hacia C1 se ha adaptado a tu desempeño exacto ({testResult.overallScore}%).
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(testResult.skillBreakdown).slice(0, 3).map(([sk, sc]) => (
                  <div key={sk} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-150">
                    <span className="text-[10px] text-slate-500 capitalize block">{sk}</span>
                    <span className="text-sm font-extrabold text-brand-600">{sc}%</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl shadow-card transition-all"
              >
                Continuar con mi Ruta
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
