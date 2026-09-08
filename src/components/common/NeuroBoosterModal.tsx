import React, { useState } from 'react';
import { X, Brain, Sparkles, Mic, MicOff, Volume2, Play, CheckCircle2, ChevronRight, Eye, Headphones, Activity } from 'lucide-react';
import { neurolinguisticEngine, NeuroChunk, ShadowingExercise } from '../../services/neurolinguisticEngine';
import { speechService } from '../../services/speechService';
import { AudioSpeedControl } from './AudioSpeedControl';

interface NeuroBoosterModalProps {
  onClose: () => void;
}

type PnlTab = 'chunks' | 'shadowing' | 'mindset';

export const NeuroBoosterModal: React.FC<NeuroBoosterModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<PnlTab>('chunks');
  const [selectedChunk, setSelectedChunk] = useState<NeuroChunk | null>(null);
  
  // Shadowing state
  const shadowingExercises = neurolinguisticEngine.getShadowingExercises();
  const [activeShadIdx, setActiveShadIdx] = useState<number>(0);
  const [isRecordingShadow, setIsRecordingShadow] = useState<boolean>(false);
  const [shadowSuccess, setShadowSuccess] = useState<boolean>(false);

  const chunks = neurolinguisticEngine.getFormulaicChunks();
  const currentShadowEx = shadowingExercises[activeShadIdx];

  const handleSpeak = (text: string, accent: 'US' | 'UK' = 'US') => {
    speechService.speak(text, { accent });
  };

  const handleToggleShadowMic = () => {
    if (isRecordingShadow) {
      speechService.stopListening();
      setIsRecordingShadow(false);
      setShadowSuccess(true);
      setTimeout(() => setShadowSuccess(false), 3000);
    } else {
      setShadowSuccess(false);
      speechService.startListening({
        onFinalResult: () => {
          setIsRecordingShadow(false);
          setShadowSuccess(true);
        },
        onError: () => setIsRecordingShadow(false),
        onEnd: () => setIsRecordingShadow(false)
      });
      setIsRecordingShadow(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-brand-900 to-indigo-950 text-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-500/30 rounded-xl border border-brand-400/40">
              <Brain className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <span>Gimnasio Neurolingüístico (PNL)</span>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.2 rounded">
                  Neuro-Learning
                </span>
              </h2>
              <p className="text-[10px] text-brand-200">
                Aprende inglés de forma natural activando neuronas espejo y memoria multisensorial.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Speed Control Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200">
          <AudioSpeedControl compact={false} />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('chunks')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'chunks'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chunks Automáticos</span>
          </button>

          <button
            onClick={() => setActiveTab('shadowing')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'shadowing'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Técnica Shadowing</span>
          </button>

          <button
            onClick={() => setActiveTab('mindset')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'mindset'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Sistema VAK</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* TAB 1: NEURO-CHUNKS */}
          {activeTab === 'chunks' && (
            <div className="space-y-3">
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">¿Qué es el Neuro-Chunking?</span> En lugar de traducir palabras sueltas, tu cerebro almacena bloques enteros listos para usar en cualquier conversación.
              </div>

              <div className="space-y-2.5">
                {chunks.map(chunk => (
                  <div
                    key={chunk.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-brand-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-xl">
                        {chunk.pattern}
                      </span>
                      <button
                        onClick={() => handleSpeak(chunk.exampleEn)}
                        className="p-1.5 bg-slate-100 hover:bg-brand-100 text-brand-600 rounded-xl"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-slate-900">
                      Significado: <span className="text-emerald-700">{chunk.meaning}</span>
                    </p>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                      <p className="font-medium text-slate-800">"{chunk.exampleEn}"</p>
                      <p className="text-[11px] text-slate-500 italic mt-0.5">{chunk.exampleEs}</p>
                    </div>

                    <div className="text-[10px] text-amber-800 bg-amber-50/60 p-2 rounded-xl flex items-start gap-1">
                      <Brain className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Anclaje:</strong> {chunk.pnlMnemonic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SHADOWING PRACTICE */}
          {activeTab === 'shadowing' && currentShadowEx && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-xs text-indigo-900 leading-relaxed">
                <span className="font-bold">Técnica de Shadowing:</span> Escucha la frase a velocidad pausada e imita el ritmo en voz alta inmediatamente para fijar la memoria neuromuscular de tu lengua y cuerdas vocales.
              </div>

              {/* Exercise Selector */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {shadowingExercises.map((ex, i) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveShadIdx(i)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      activeShadIdx === i
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>

              {/* Active Exercise Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4 text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                  Nivel {currentShadowEx.difficulty} • Acento {currentShadowEx.accent}
                </span>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  "{currentShadowEx.sentence}"
                </h3>

                <p className="text-xs text-slate-500 italic">
                  {currentShadowEx.spanish}
                </p>

                {/* Syllable/Rhythm Chunks */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {currentShadowEx.rhythmSegments.map((seg, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-200"
                    >
                      {seg}
                    </span>
                  ))}
                </div>

                {/* Audio and Record Controls */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleSpeak(currentShadowEx.sentence, currentShadowEx.accent)}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 px-4 rounded-2xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>1. Escuchar Audio</span>
                  </button>

                  <button
                    onClick={handleToggleShadowMic}
                    className={`text-xs font-bold py-2.5 px-4 rounded-2xl flex items-center gap-2 shadow-sm transition-all ${
                      isRecordingShadow
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isRecordingShadow ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isRecordingShadow ? 'Detener' : '2. Grabar Imitación'}</span>
                  </button>
                </div>

                {shadowSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-2.5 text-xs font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Excelente imitación! Tus neuronas espejo acaban de registrar el patrón.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: VAK & MINDSET */}
          {activeTab === 'mindset' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl space-y-1">
                  <Eye className="w-5 h-5 text-blue-600 mx-auto" />
                  <span className="font-extrabold text-blue-900 block">Visual (V)</span>
                  <p className="text-[10px] text-blue-700">Colores y mnemotecnias visuales.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-2xl space-y-1">
                  <Headphones className="w-5 h-5 text-purple-600 mx-auto" />
                  <span className="font-extrabold text-purple-900 block">Auditivo (A)</span>
                  <p className="text-[10px] text-purple-700">Audio graduable y ritmo sonoro.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl space-y-1">
                  <Activity className="w-5 h-5 text-amber-600 mx-auto" />
                  <span className="font-extrabold text-amber-900 block">Kinestésico (K)</span>
                  <p className="text-[10px] text-amber-700">Tocar palabras e imitación vocal.</p>
                </div>
              </div>

              {/* Micro-Affirmations */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 space-y-3">
                <h3 className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  <span>Reprogramación Lingüística Positiva</span>
                </h3>

                <ul className="space-y-2 text-xs text-slate-200 leading-relaxed">
                  <li className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                    ✨ <strong>Elimina el filtro afectivo:</strong> Hablar con imperfecciones es la única forma en que tu cerebro calibra la fluidez.
                  </li>
                  <li className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                    ⚡ <strong>Micro-hábitos de 15 minutos:</strong> La consistencia diaria supera a 4 horas de estudio exhaustivo un solo día.
                  </li>
                  <li className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                    🎯 <strong>Toca y aprende:</strong> Cada palabra que tocas para ver su traducción en español refuerza un anclaje visual y auditivo inmediato.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-sm"
          >
            Cerrar Gimnasio PNL
          </button>
        </div>
      </div>
    </div>
  );
};
