import React, { useState } from 'react';
import { PenTool, Sparkles, CheckCircle, AlertCircle, ArrowRight, BookOpen, Clock, Award, History, Volume2 } from 'lucide-react';
import { WRITING_PROMPTS } from '../../data/curriculum';
import { aiService } from '../../services/aiService';
import { storageService } from '../../services/storage';
import { WritingSubmission } from '../../types';
import { useStudy } from '../../context/StudyContext';
import { speechService } from '../../services/speechService';

export const WritingView: React.FC = () => {
  const { user, updateMastery, triggerConfetti } = useStudy();
  const [selectedPrompt, setSelectedPrompt] = useState(WRITING_PROMPTS[0]);
  const [userText, setUserText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<WritingSubmission | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<WritingSubmission[]>(() => storageService.getWritingSubmissions());

  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;
  const isWordCountAdequate = wordCount >= selectedPrompt.minWords;

  const handleEvaluate = async () => {
    if (!userText.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const evaluation = await aiService.evaluateWriting(
        selectedPrompt.title,
        selectedPrompt.instructions,
        userText,
        selectedPrompt.level
      );

      const submission: WritingSubmission = {
        id: `sub-${Date.now()}`,
        promptId: selectedPrompt.id,
        promptTitle: selectedPrompt.title,
        promptDescription: selectedPrompt.instructions,
        level: selectedPrompt.level,
        userText,
        wordCount,
        createdAt: new Date().toISOString(),
        scores: evaluation.scores,
        feedback: {
          strengths: evaluation.strengths,
          weaknesses: evaluation.weaknesses,
          grammarCorrections: evaluation.grammarCorrections,
          advancedVocabularySuggestions: evaluation.advancedVocabularySuggestions,
          rewrittenNativeVersion: evaluation.rewrittenNativeVersion
        }
      };

      storageService.saveWritingSubmission(submission);
      setSubmissionResult(submission);
      setHistoryList(storageService.getWritingSubmissions());

      // Update Writing mastery
      updateMastery('writing', 4);
      triggerConfetti();
    } catch (err) {
      console.error('Evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSpeakNative = (text: string) => {
    speechService.speak(text, { accent: 'UK' });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Writing Lab</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Redacción profesional con corrección pedagógica y sugerencias C1.
          </p>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <History className="w-4 h-4" />
          <span>{showHistory ? 'Editor' : 'Historial'}</span>
        </button>
      </div>

      {showHistory ? (
        /* SUBMISSIONS HISTORY */
        <div className="space-y-3">
          {historyList.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-400">
              <PenTool className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">Aún no has enviado ningún texto.</p>
              <p className="text-xs mt-1">Completa un prompt de escritura para recibir tu feedback.</p>
            </div>
          ) : (
            historyList.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  setSubmissionResult(item);
                  setShowHistory(false);
                }}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-300 transition-all cursor-pointer space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {item.level}
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {item.scores.overall}/100
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{item.promptTitle}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 italic">"{item.userText}"</p>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>{item.wordCount} palabras</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : !submissionResult ? (
        /* PROMPT SELECTION & WRITING EDITOR */
        <div className="space-y-4">
          {/* Prompt Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {WRITING_PROMPTS.map(p => {
              const isSelected = selectedPrompt.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPrompt(p);
                    setUserText('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p.level} • {p.type}
                </button>
              );
            })}
          </div>

          {/* Prompt Detail Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                Nivel {selectedPrompt.level}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Meta: {selectedPrompt.targetWords}</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900">{selectedPrompt.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedPrompt.instructions}
            </p>
          </div>

          {/* Writing Editor */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-card space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Tu Redacción en Inglés</span>
              <span
                className={`font-mono font-bold ${
                  isWordCountAdequate ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {wordCount} palabras {!isWordCountAdequate && `(mínimo ${selectedPrompt.minWords})`}
              </span>
            </div>

            <textarea
              rows={8}
              value={userText}
              onChange={e => setUserText(e.target.value)}
              placeholder="Start drafting your response here in English..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none font-sans"
            />

            <button
              onClick={handleEvaluate}
              disabled={!userText.trim() || isEvaluating}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-card transition-all"
            >
              {isEvaluating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Analizando con IA pedagógica...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Evaluar y Obtener Feedback C1</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* AI EVALUATION & CORRECTION RESULTS VIEW */
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-brand-600 to-indigo-900 rounded-3xl p-5 text-white shadow-card space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-200">
                  Informe CEFR Evaluado
                </span>
                <h2 className="text-base font-extrabold mt-0.5">{submissionResult.promptTitle}</h2>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20">
                <span className="text-[10px] block text-brand-100 uppercase font-semibold">Overall</span>
                <span className="text-xl font-extrabold">{submissionResult.scores.overall}/100</span>
              </div>
            </div>

            {/* Rubric Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/15">
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-brand-200 text-[10px] block">Gramática & Sintaxis</span>
                <span className="font-bold">{submissionResult.scores.grammar}%</span>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-brand-200 text-[10px] block">Riqueza de Vocabulario</span>
                <span className="font-bold">{submissionResult.scores.vocabulary}%</span>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-brand-200 text-[10px] block">Cohesión y Conectores</span>
                <span className="font-bold">{submissionResult.scores.cohesion}%</span>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-brand-200 text-[10px] block">Cumplimiento de Tarea</span>
                <span className="font-bold">{submissionResult.scores.taskAchievement}%</span>
              </div>
            </div>
          </div>

          {/* Grammar Corrections */}
          {submissionResult.feedback.grammarCorrections.length > 0 && (
            <div className="bg-white rounded-3xl p-4 border border-rose-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Correcciones Gramaticales Detectadas ({submissionResult.feedback.grammarCorrections.length})</span>
              </h3>
              <div className="space-y-2.5">
                {submissionResult.feedback.grammarCorrections.map((item, idx) => (
                  <div key={idx} className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-rose-800 line-through font-mono">"{item.original}"</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-emerald-700 font-bold font-mono">"{item.suggested}"</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced C1 Vocabulary Alternatives */}
          {submissionResult.feedback.advancedVocabularySuggestions.length > 0 && (
            <div className="bg-white rounded-3xl p-4 border border-brand-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Alternativas de Vocabulario C1</span>
              </h3>
              <div className="space-y-2.5">
                {submissionResult.feedback.advancedVocabularySuggestions.map((item, idx) => (
                  <div key={idx} className="bg-brand-50/70 p-3 rounded-2xl border border-brand-100 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">Original: "{item.originalWord}"</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                      <span className="text-brand-700 font-extrabold">C1: "{item.c1Alternative}"</span>
                    </div>
                    <p className="text-[11px] text-brand-900 italic">Ejemplo: "{item.example}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewritten Native Version */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Versión Reescrita con Estilo Nativo C1</span>
              </h3>
              <button
                onClick={() => handleSpeakNative(submissionResult.feedback.rewrittenNativeVersion)}
                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1"
                title="Escuchar audio nativo"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio</span>
              </button>
            </div>
            <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed whitespace-pre-line font-serif">
              "{submissionResult.feedback.rewrittenNativeVersion}"
            </p>
          </div>

          <button
            onClick={() => {
              setSubmissionResult(null);
              setUserText('');
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md"
          >
            Escribir Otra Redacción
          </button>
        </div>
      )}
    </div>
  );
};
