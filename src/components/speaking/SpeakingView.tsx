import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, User, Bot, Play, Square, Award, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { SPEAKING_SCENARIOS } from '../../data/curriculum';
import { SpeakingScenario, SpeakingTurn } from '../../types';
import { speechService } from '../../services/speechService';
import { aiService } from '../../services/aiService';
import { useStudy } from '../../context/StudyContext';

export const SpeakingView: React.FC = () => {
  const { user, updateMastery, triggerConfetti } = useStudy();
  const [selectedScenario, setSelectedScenario] = useState<SpeakingScenario>(SPEAKING_SCENARIOS[0]);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [turns, setTurns] = useState<SpeakingTurn[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [activeTurnFeedback, setActiveTurnFeedback] = useState<SpeakingTurn['feedback'] | null>(null);
  const [showFinalReport, setShowFinalReport] = useState<boolean>(false);

  const turnsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    turnsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isAiThinking]);

  const startScenario = () => {
    setIsSessionActive(true);
    setShowFinalReport(false);
    setActiveTurnFeedback(null);

    const initialTurn: SpeakingTurn = {
      id: `turn-${Date.now()}`,
      speaker: 'tutor',
      text: selectedScenario.starterPrompt,
      timestamp: new Date().toISOString()
    };

    setTurns([initialTurn]);

    // Speak initial prompt
    setIsAiSpeaking(true);
    speechService.speak(selectedScenario.starterPrompt, {
      accent: selectedScenario.accent,
      onEnd: () => setIsAiSpeaking(false),
      onError: () => setIsAiSpeaking(false)
    });
  };

  const handleToggleMic = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setInterimTranscript('');
      const started = speechService.startListening({
        onInterimResult: (text) => setInterimTranscript(text),
        onFinalResult: (finalText) => {
          setIsListening(false);
          setInterimTranscript('');
          handleUserSpeechFinished(finalText);
        },
        onError: (err) => {
          console.warn('Mic error:', err);
          setIsListening(false);
        },
        onEnd: () => setIsListening(false)
      });

      if (started) {
        setIsListening(true);
      }
    }
  };

  const handleUserSpeechFinished = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    const userTurn: SpeakingTurn = {
      id: `turn-${Date.now()}`,
      speaker: 'user',
      text: spokenText,
      timestamp: new Date().toISOString()
    };

    const newHistory = [...turns, userTurn];
    setTurns(newHistory);
    setIsAiThinking(true);

    try {
      const response = await aiService.generateSpeakingTurn(
        selectedScenario.context,
        selectedScenario.tutorRole,
        newHistory,
        spokenText,
        selectedScenario.level
      );

      // Attach feedback to user turn
      userTurn.feedback = response.feedback;
      setActiveTurnFeedback(response.feedback);

      const tutorTurn: SpeakingTurn = {
        id: `turn-${Date.now() + 1}`,
        speaker: 'tutor',
        text: response.tutorResponse,
        timestamp: new Date().toISOString()
      };

      setTurns([...newHistory, tutorTurn]);
      setIsAiThinking(false);

      // Speak tutor response
      setIsAiSpeaking(true);
      speechService.speak(response.tutorResponse, {
        accent: selectedScenario.accent,
        onEnd: () => setIsAiSpeaking(false),
        onError: () => setIsAiSpeaking(false)
      });

      // Update Speaking mastery score
      updateMastery('speaking', 3);
    } catch (e) {
      console.error(e);
      setIsAiThinking(false);
    }
  };

  const endSession = () => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsListening(false);
    setIsAiSpeaking(false);
    setShowFinalReport(true);
    triggerConfetti();
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-full">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block">
            Speaking & AI Voice Tutor
          </span>
          <h1 className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
            {selectedScenario.title}
          </h1>
        </div>

        {isSessionActive && !showFinalReport && (
          <button
            onClick={endSession}
            className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all border border-rose-200"
          >
            Finalizar Sesión
          </button>
        )}
      </div>

      {!isSessionActive ? (
        /* SCENARIO SELECTOR */
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          <div className="text-center space-y-1 mb-2">
            <h2 className="text-base font-extrabold text-slate-900">Selecciona un Escenario de Conversación</h2>
            <p className="text-xs text-slate-500">
              Habla por voz con la IA en situaciones reales graduadas de B1 a C1.
            </p>
          </div>

          <div className="space-y-3">
            {SPEAKING_SCENARIOS.map(sc => (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`bg-white rounded-3xl p-4 border transition-all cursor-pointer space-y-2.5 ${
                  selectedScenario.id === sc.id
                    ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-card'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                    Nivel {sc.level} • {sc.accent} Accent
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    ~{sc.suggestedDurationMinutes} min
                  </span>
                </div>

                <h3 className="text-xs font-extrabold text-slate-900">{sc.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {sc.context}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Tutor: <strong className="text-slate-800">{sc.tutorRole}</strong></span>
                  <span>Tú: <strong className="text-brand-600">{sc.userRole}</strong></span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={startScenario}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-card transition-all"
          >
            <Mic className="w-5 h-5" />
            <span>Iniciar Conversación por Voz</span>
          </button>
        </div>
      ) : showFinalReport ? (
        /* FINAL SESSION REPORT */
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-5 text-white shadow-card space-y-3 text-center">
            <Award className="w-12 h-12 mx-auto text-amber-300 animate-bounce" />
            <h2 className="text-lg font-extrabold">¡Excelente Sesión de Speaking!</h2>
            <p className="text-xs text-emerald-100">
              Has completado la simulación con {turns.filter(t => t.speaker === 'user').length} intervenciones habladas.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 text-slate-900">
              <div className="bg-white p-2.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 block font-semibold">Fluidez</span>
                <span className="text-base font-extrabold text-emerald-600">88%</span>
              </div>
              <div className="bg-white p-2.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 block font-semibold">Pronunciación</span>
                <span className="text-base font-extrabold text-brand-600">85%</span>
              </div>
              <div className="bg-white p-2.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 block font-semibold">Naturalidad</span>
                <span className="text-base font-extrabold text-amber-600">90%</span>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Puntos Clave para Nivel C1</h3>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span>Mantuviste una cadencia continua sin vacilaciones excesivas.</span>
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></span>
                <span>Incorpora más marcadores de discurso como <em>"On the contrary", "Arguably"</em> para pulir el registro.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setIsSessionActive(false);
              setShowFinalReport(false);
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md"
          >
            Volver a Escenarios
          </button>
        </div>
      ) : (
        /* LIVE VOICE ROOM */
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Conversation Chat Bubbles */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {turns.map(turn => {
              const isTutor = turn.speaker === 'tutor';

              return (
                <div
                  key={turn.id}
                  className={`flex items-start gap-2.5 ${isTutor ? 'justify-start' : 'justify-end'}`}
                >
                  {isTutor && (
                    <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isTutor
                        ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                        : 'bg-brand-600 text-white shadow-2xs'
                    }`}
                  >
                    <p>{turn.text}</p>

                    {isTutor && (
                      <button
                        onClick={() => speechService.speak(turn.text, { accent: selectedScenario.accent })}
                        className="mt-1.5 text-[10px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay Audio</span>
                      </button>
                    )}
                  </div>

                  {!isTutor && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white p-2.5 rounded-2xl w-fit border border-slate-200">
                <Sparkles className="w-4 h-4 animate-spin text-brand-600" />
                <span>{selectedScenario.tutorRole} está pensando la respuesta...</span>
              </div>
            )}

            {interimTranscript && (
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-brand-50 border border-brand-200 text-brand-900 rounded-2xl p-3 text-xs italic animate-pulse">
                  "{interimTranscript}..."
                </div>
              </div>
            )}

            <div ref={turnsEndRef} />
          </div>

          {/* Turn Feedback Card */}
          {activeTurnFeedback && (
            <div className="bg-amber-50/90 border-t border-amber-200 px-4 py-2 text-[11px] text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Feedback de tu última respuesta: </span>
                {activeTurnFeedback.betterPhrasing || activeTurnFeedback.notes || '¡Muy buena respuesta y fluidez!'}
              </div>
            </div>
          )}

          {/* Voice Controls Bottom Area */}
          <div className="bg-white border-t border-slate-200 p-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              {/* Mic Push to Talk */}
              <button
                onClick={handleToggleMic}
                disabled={isAiThinking}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-floating ${
                  isListening
                    ? 'bg-rose-500 text-white scale-110 animate-pulse'
                    : isAiSpeaking
                    ? 'bg-brand-500 text-white ring-4 ring-brand-100'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-7 h-7" />
                ) : (
                  <Mic className="w-7 h-7" />
                )}
              </button>
            </div>

            <span className="text-[11px] font-semibold text-slate-500">
              {isListening
                ? '🎙️ Escuchando... habla en inglés (haz clic para detener)'
                : isAiSpeaking
                ? '🔊 El tutor está hablando...'
                : 'Pulsa el micrófono para responder en voz alta'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
