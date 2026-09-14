import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, User, Bot, Award, AlertCircle, Brain, HelpCircle, ChevronDown, ChevronUp, CheckCircle, MessageCircle, Lightbulb } from 'lucide-react';
import { SPEAKING_SCENARIOS } from '../../data/curriculum';
import { SpeakingScenario, SpeakingTurn } from '../../types';
import { speechService } from '../../services/speechService';
import { aiService } from '../../services/aiService';
import { useStudy } from '../../context/StudyContext';
import { InteractiveText } from '../common/InteractiveText';
import { AudioSpeedControl } from '../common/AudioSpeedControl';

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
  const [activeSpeed, setActiveSpeed] = useState<number>(speechService.getPlaybackRate());
  const [showFeedbackDetails, setShowFeedbackDetails] = useState<boolean>(false);
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);
  const [showHelpPrompts, setShowHelpPrompts] = useState<boolean>(false);

  const turnsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    turnsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isAiThinking]);

  // Get initial suggestions when starting a scenario
  const getInitialSuggestions = (scenario: SpeakingScenario): string[] => {
    if (scenario.conversationFlow?.turns?.[0]) {
      return scenario.conversationFlow.turns[0].suggestedUserResponses;
    }
    // Generic fallback
    const contextLower = scenario.context.toLowerCase();
    if (contextLower.includes('café') || contextLower.includes('coffee')) {
      return ['Hi! Could I have a latte, please?', 'What do you recommend?', 'Can I see the menu?'];
    }
    if (contextLower.includes('direction') || contextLower.includes('station')) {
      return ['Yes, I\'m looking for the train station.', 'Could you help me find my way?', 'Where is the nearest bus stop?'];
    }
    return ['Hello! Nice to meet you.', 'Thank you for your time.', 'Could you tell me more?'];
  };

  const getHelpPrompts = (): string[] => {
    if (selectedScenario.conversationFlow?.turns) {
      const userTurnCount = turns.filter(t => t.speaker === 'user').length;
      const turnIndex = Math.min(userTurnCount, selectedScenario.conversationFlow.turns.length - 1);
      return selectedScenario.conversationFlow.turns[turnIndex].helpPrompts;
    }
    return [
      'Try to describe what you want or need in simple words.',
      'Use short sentences — you don\'t need to be perfect!',
      'Start with: "I would like..." or "Could you...?"'
    ];
  };

  const startScenario = () => {
    setIsSessionActive(true);
    setShowFinalReport(false);
    setActiveTurnFeedback(null);
    setShowFeedbackDetails(false);
    setShowHelpPrompts(false);

    const initialTurn: SpeakingTurn = {
      id: `turn-${Date.now()}`,
      speaker: 'tutor',
      text: selectedScenario.starterPrompt,
      timestamp: new Date().toISOString()
    };

    setTurns([initialTurn]);
    setSuggestedResponses(getInitialSuggestions(selectedScenario));

    // Speak initial prompt
    setIsAiSpeaking(true);
    speechService.speak(selectedScenario.starterPrompt, {
      accent: selectedScenario.accent,
      rate: activeSpeed,
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
      setShowHelpPrompts(false);
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

  const handleSuggestionClick = (suggestion: string) => {
    setShowHelpPrompts(false);
    handleUserSpeechFinished(suggestion);
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
    setSuggestedResponses([]);
    setShowFeedbackDetails(false);

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

      // Update suggested responses for next turn
      if (response.feedback.suggestedResponses && response.feedback.suggestedResponses.length > 0) {
        setSuggestedResponses(response.feedback.suggestedResponses);
      }

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

  // Calculate real session scores from feedback
  const getSessionScores = () => {
    const userTurns = turns.filter(t => t.speaker === 'user' && t.feedback);
    if (userTurns.length === 0) return { fluency: 80, pronunciation: 80, grammar: 85 };

    const avgFluency = Math.round(userTurns.reduce((sum, t) => sum + (t.feedback?.fluencyScore || 80), 0) / userTurns.length);
    const avgPronunciation = Math.round(userTurns.reduce((sum, t) => sum + (t.feedback?.pronunciationScore || 80), 0) / userTurns.length);
    const avgGrammar = Math.round(userTurns.reduce((sum, t) => sum + (t.feedback?.grammarScore || 85), 0) / userTurns.length);

    return { fluency: avgFluency, pronunciation: avgPronunciation, grammar: avgGrammar };
  };

  // Get all grammar errors from the session for the final report
  const getSessionErrors = () => {
    const userTurns = turns.filter(t => t.speaker === 'user' && t.feedback?.grammarErrors?.length);
    const allErrors: { original: string; corrected: string; explanation: string }[] = [];
    for (const t of userTurns) {
      if (t.feedback?.grammarErrors) {
        allErrors.push(...t.feedback.grammarErrors);
      }
    }
    return allErrors;
  };

  // Get conversation progress
  const getConversationProgress = () => {
    const userTurnCount = turns.filter(t => t.speaker === 'user').length;
    const totalTurns = selectedScenario.conversationFlow?.turns?.length || 4;
    return { current: userTurnCount, total: totalTurns };
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-full">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block">
            Speaking & AI Voice Tutor
          </span>
          <h1 className="text-xs font-bold text-slate-900 truncate max-w-[150px]">
            {selectedScenario.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <AudioSpeedControl
            compact={true}
            currentRate={activeSpeed}
            onChange={(r) => setActiveSpeed(r)}
          />

          {isSessionActive && !showFinalReport && (
            <button
              onClick={endSession}
              className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-[11px] font-bold transition-all border border-rose-200"
            >
              Terminar
            </button>
          )}
        </div>
      </div>

      {!isSessionActive ? (
        /* SCENARIO SELECTOR */
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          <div className="text-center space-y-1 mb-2">
            <h2 className="text-base font-extrabold text-slate-900">Selecciona un Escenario de Conversación</h2>
            <p className="text-xs text-slate-500">
              Habla por voz con la IA en situaciones reales graduadas de A2 a C1.
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

                {sc.pnlTip && (
                  <div className="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200/80 flex items-start gap-1">
                    <Brain className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Tip PNL:</strong> {sc.pnlTip}</span>
                  </div>
                )}

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

            {(() => {
              const scores = getSessionScores();
              return (
                <div className="grid grid-cols-3 gap-2 pt-2 text-slate-900">
                  <div className="bg-white p-2.5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block font-semibold">Fluidez</span>
                    <span className="text-base font-extrabold text-emerald-600">{scores.fluency}%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block font-semibold">Pronunciación</span>
                    <span className="text-base font-extrabold text-brand-600">{scores.pronunciation}%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block font-semibold">Gramática</span>
                    <span className="text-base font-extrabold text-amber-600">{scores.grammar}%</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Grammar Errors Summary */}
          {(() => {
            const errors = getSessionErrors();
            if (errors.length === 0) return null;
            return (
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  Errores Detectados y Correcciones
                </h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  {errors.map((err, i) => (
                    <li key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold line-through text-[11px]">{err.original}</span>
                        <span className="text-[11px] text-slate-400">→</span>
                        <span className="text-emerald-600 font-bold text-[11px]">{err.corrected}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{err.explanation}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}

          {/* Key Takeaways */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Puntos Clave Neurolingüísticos</h3>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span>Mantuviste una cadencia continua y buena respuesta auditiva.</span>
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></span>
                <span>Toca cualquier frase del tutor para ver su traducción y reforzar el vocabulario.</span>
              </li>
              {getSessionErrors().length > 0 && (
                <li className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>Revisa los errores corregidos arriba — practica las frases correctas en voz alta para reforzarlas.</span>
                </li>
              )}
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

          {/* Conversation Progress Bar */}
          {selectedScenario.conversationFlow && (
            <div className="bg-white border-b border-slate-100 px-4 py-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-semibold">Progreso de conversación</span>
                <span className="font-bold text-brand-600">
                  {getConversationProgress().current}/{getConversationProgress().total} turnos
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-brand-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (getConversationProgress().current / getConversationProgress().total) * 100)}%` }}
                />
              </div>
            </div>
          )}

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
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isTutor
                        ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                        : 'bg-brand-600 text-white shadow-2xs'
                    }`}
                  >
                    {isTutor ? (
                      <InteractiveText
                        text={turn.text}
                        showFullSpanishToggle={false}
                        accent={selectedScenario.accent}
                      />
                    ) : (
                      <p>{turn.text}</p>
                    )}

                    {isTutor && (
                      <button
                        onClick={() => speechService.speak(turn.text, { accent: selectedScenario.accent, rate: activeSpeed })}
                        className="mt-1.5 text-[10px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay ({activeSpeed}x)</span>
                      </button>
                    )}

                    {/* Inline grammar correction for user turns */}
                    {!isTutor && turn.feedback?.correctedSentence && (
                      <div className="mt-2 pt-2 border-t border-white/20 text-[10px]">
                        <div className="flex items-center gap-1 text-amber-200 font-semibold mb-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>Corrección:</span>
                        </div>
                        <p className="text-white/90 italic">"{turn.feedback.correctedSentence}"</p>
                      </div>
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

          {/* Turn Feedback Card (expanded) */}
          {activeTurnFeedback && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 px-4 py-2.5 space-y-2">
              {/* Main feedback line */}
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900">
                      Feedback de tu última respuesta
                    </span>
                    <button
                      onClick={() => setShowFeedbackDetails(!showFeedbackDetails)}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      {showFeedbackDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    {activeTurnFeedback.notes || '¡Muy buena respuesta y fluidez!'}
                  </p>
                </div>
              </div>

              {/* Expanded details */}
              {showFeedbackDetails && (
                <div className="space-y-2 pt-1 border-t border-amber-200/50">
                  {/* Scores */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/60 rounded-xl p-1.5 text-center">
                      <span className="text-[9px] text-slate-500 block">Fluidez</span>
                      <span className="text-[11px] font-extrabold text-emerald-600">{activeTurnFeedback.fluencyScore}%</span>
                    </div>
                    <div className="flex-1 bg-white/60 rounded-xl p-1.5 text-center">
                      <span className="text-[9px] text-slate-500 block">Pronunciación</span>
                      <span className="text-[11px] font-extrabold text-brand-600">{activeTurnFeedback.pronunciationScore}%</span>
                    </div>
                    <div className="flex-1 bg-white/60 rounded-xl p-1.5 text-center">
                      <span className="text-[9px] text-slate-500 block">Gramática</span>
                      <span className="text-[11px] font-extrabold text-amber-600">{activeTurnFeedback.grammarScore}%</span>
                    </div>
                  </div>

                  {/* Grammar errors */}
                  {activeTurnFeedback.grammarErrors && activeTurnFeedback.grammarErrors.length > 0 && (
                    <div className="space-y-1.5">
                      {activeTurnFeedback.grammarErrors.map((err, i) => (
                        <div key={i} className="bg-white/70 rounded-xl p-2 text-[10px]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-rose-500 line-through font-semibold">{err.original}</span>
                            <span className="text-slate-400">→</span>
                            <span className="text-emerald-600 font-semibold">{err.corrected}</span>
                          </div>
                          <p className="text-slate-500 mt-0.5">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Better phrasing */}
                  {activeTurnFeedback.betterPhrasing && (
                    <div className="bg-blue-50/80 rounded-xl p-2 text-[10px] text-blue-800 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{activeTurnFeedback.betterPhrasing}</span>
                    </div>
                  )}

                  {/* Motivational note */}
                  {activeTurnFeedback.motivationalNote && (
                    <div className="bg-emerald-50/80 rounded-xl p-2 text-[10px] text-emerald-800 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{activeTurnFeedback.motivationalNote}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Help Prompts Overlay */}
          {showHelpPrompts && (
            <div className="bg-blue-50 border-t border-blue-200 px-4 py-3 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-800">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>💡 Pistas para tu respuesta:</span>
              </div>
              <div className="space-y-1.5">
                {getHelpPrompts().map((prompt, i) => (
                  <div key={i} className="bg-white rounded-xl p-2.5 text-[11px] text-blue-900 border border-blue-100 flex items-start gap-2">
                    <MessageCircle className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    <span>{prompt}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowHelpPrompts(false)}
                className="text-[10px] text-blue-600 font-semibold hover:text-blue-700"
              >
                Cerrar pistas
              </button>
            </div>
          )}

          {/* Suggested Responses Chips */}
          {suggestedResponses.length > 0 && !isAiThinking && !isListening && (
            <div className="bg-white/90 border-t border-slate-100 px-4 py-2.5 space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" />
                Sugerencias — toca una para responder:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedResponses.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="bg-brand-50 hover:bg-brand-100 active:bg-brand-200 text-brand-800 text-[11px] font-medium px-3 py-1.5 rounded-2xl border border-brand-200 transition-all hover:shadow-sm active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voice Controls Bottom Area */}
          <div className="bg-white border-t border-slate-200 p-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              {/* Help Button */}
              <button
                onClick={() => setShowHelpPrompts(!showHelpPrompts)}
                className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-all border border-blue-200"
                title="No sé qué decir"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

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

              {/* Placeholder for symmetry */}
              <div className="w-10 h-10" />
            </div>

            <span className="text-[11px] font-semibold text-slate-500 text-center">
              {isListening
                ? '🎙️ Escuchando... habla en inglés (haz clic para detener)'
                : isAiSpeaking
                ? '🔊 El tutor está hablando...'
                : isAiThinking
                ? '⏳ Procesando tu respuesta...'
                : '🎤 Pulsa el micrófono o toca una sugerencia'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
