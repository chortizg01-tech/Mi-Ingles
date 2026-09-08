import React, { useState } from 'react';
import { ArrowLeft, Volume2, CheckCircle, XCircle, Sparkles, BookOpen, ChevronRight, Check, Award, RotateCcw, Brain, Globe, Gauge } from 'lucide-react';
import { Lesson, Exercise } from '../../types';
import { speechService } from '../../services/speechService';
import { useStudy } from '../../context/StudyContext';
import { InteractiveText } from '../common/InteractiveText';
import { AudioSpeedControl } from '../common/AudioSpeedControl';

interface LessonPlayerViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
}

type LessonStep = 'intro' | 'vocab' | 'content' | 'quiz' | 'summary';

export const LessonPlayerView: React.FC<LessonPlayerViewProps> = ({ lesson, onBack, onComplete }) => {
  const { completeLesson, recordMistake } = useStudy();

  const [step, setStep] = useState<LessonStep>('intro');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [fillAnswer, setFillAnswer] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeSpeed, setActiveSpeed] = useState<number>(speechService.getPlaybackRate());

  const currentExercise: Exercise | undefined = lesson.exercises[currentExerciseIdx];

  const handleSpeak = (text: string, accent?: 'US' | 'UK') => {
    setIsPlayingAudio(true);
    speechService.speak(text, {
      accent,
      rate: activeSpeed,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let correct = false;
    if (currentExercise.type === 'multiple_choice' || currentExercise.type === 'listening_comprehension' || currentExercise.type === 'reading_comprehension' || currentExercise.type === 'speaking_prompt') {
      correct = selectedOption === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'fill_blank') {
      const normalizedInput = fillAnswer.trim().toLowerCase();
      const normalizedCorrect = (currentExercise.correctAnswer as string).trim().toLowerCase();
      correct = normalizedInput === normalizedCorrect;
    }

    setIsAnswerCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      // Record mistake in the adaptive error bank
      recordMistake({
        category: currentExercise.grammarTopic || `${lesson.focusSkill.toUpperCase()} Context`,
        skill: currentExercise.skill,
        mistake: selectedOption ? `Selected option (${selectedOption})` : fillAnswer || 'Incorrect answer',
        correction: String(currentExercise.correctAnswer),
        explanation: currentExercise.explanation
      });
    }
  };

  const handleNextExercise = () => {
    setIsAnswerChecked(false);
    setSelectedOption('');
    setFillAnswer('');

    if (currentExerciseIdx + 1 < lesson.exercises.length) {
      setCurrentExerciseIdx(prev => prev + 1);
    } else {
      // Lesson Finished!
      const total = Math.max(1, lesson.exercises.length);
      const scorePercentage = Math.round((correctAnswersCount / total) * 100);
      completeLesson(lesson.id, lesson.focusSkill, scorePercentage);
      setStep('summary');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-full">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center flex-1 mx-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 block">
            {lesson.level} • {lesson.focusSkill}
          </span>
          <h2 className="text-xs font-bold text-slate-900 truncate max-w-[200px] mx-auto">
            {lesson.title}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <AudioSpeedControl
            compact={true}
            currentRate={activeSpeed}
            onChange={(r) => setActiveSpeed(r)}
          />
        </div>
      </div>

      {/* STEP 1: INTRO & GRAMMAR NOTES */}
      {step === 'intro' && (
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
              {lesson.level} Marco Pedagógico
            </span>
            <h1 className="text-lg font-extrabold text-slate-900 mt-2 mb-1">{lesson.title}</h1>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{lesson.subtitle}</p>

            {lesson.grammarNote && (
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>{lesson.grammarNote.title}</span>
                </h3>

                {/* Neuro Chunks if available */}
                {lesson.grammarNote.neuroChunks && (
                  <div className="space-y-2 bg-gradient-to-br from-brand-900 to-indigo-950 p-4 rounded-2xl text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" />
                      <span>Fórmulas y Chunks Neuronales Clave</span>
                    </span>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {lesson.grammarNote.neuroChunks.map((nc, idx) => (
                        <div key={idx} className="bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-extrabold text-amber-300">{nc.chunk}</span>
                            <p className="text-[11px] text-slate-200">{nc.meaning}</p>
                          </div>
                          <span className="text-[9px] bg-brand-500/40 text-brand-200 px-2 py-0.5 rounded font-medium shrink-0">
                            {nc.pnlVisual}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="space-y-2">
                  {lesson.grammarNote.rules.map((rule, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-150 leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Ejemplos Contextualizados
                    </h4>
                    <span className="text-[10px] text-brand-600 font-semibold">Toca las palabras para traducir</span>
                  </div>

                  {lesson.grammarNote.examples.map((ex, i) => (
                    <div key={i} className="bg-brand-50/60 p-3 rounded-xl border border-brand-100 flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <InteractiveText
                          text={ex.en}
                          spanishTranslation={ex.es}
                          showFullSpanishToggle={false}
                        />
                        <p className="text-[11px] text-brand-700 mt-1">{ex.es}</p>
                      </div>
                      <button
                        onClick={() => handleSpeak(ex.en)}
                        className="p-1.5 bg-white text-brand-600 hover:bg-brand-100 rounded-lg shadow-2xs shrink-0"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {lesson.grammarNote.commonMistakes && (
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3">
                    <h4 className="text-xs font-bold text-amber-900 mb-1">⚠️ Errores Típicos a Evitar</h4>
                    {lesson.grammarNote.commonMistakes.map((mis, i) => (
                      <p key={i} className="text-[11px] text-amber-800 mb-1 last:mb-0 leading-relaxed">
                        • {mis}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (lesson.vocabularyItems && lesson.vocabularyItems.length > 0) {
                setStep('vocab');
              } else if (lesson.readingPassage || lesson.listeningScript) {
                setStep('content');
              } else {
                setStep('quiz');
              }
            }}
            className="w-full bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-card transition-all"
          >
            <span>Continuar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: VOCABULARY FLASHCARDS */}
      {step === 'vocab' && lesson.vocabularyItems && (
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">Vocabulario Clave • {lesson.level}</span>
            <h2 className="text-sm font-bold text-slate-800">Términos esenciales y anclajes mentales</h2>
          </div>

          <div className="space-y-3">
            {lesson.vocabularyItems.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{v.term}</h3>
                    <span className="text-xs text-slate-400 font-mono">{v.phonetic}</span>
                  </div>
                  <button
                    onClick={() => handleSpeak(v.term)}
                    className="p-2 bg-brand-50 text-brand-600 hover:bg-brand-100 rounded-xl"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900">Significado: </span>
                  {v.definition} (<strong className="text-emerald-700">{v.spanish}</strong>)
                </div>

                {v.pnlAnchor && (
                  <div className="text-[11px] text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 flex items-start gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800">Anclaje PNL: </span>
                      <span>{v.pnlAnchor}</span>
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-brand-900 bg-brand-50/50 p-2 rounded-xl italic">
                  "{v.example}"
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              if (lesson.readingPassage || lesson.listeningScript) {
                setStep('content');
              } else {
                setStep('quiz');
              }
            }}
            className="w-full bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-card transition-all"
          >
            <span>Ir a Práctica</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: READING PASSAGE OR LISTENING AUDIO SCRIPT */}
      {step === 'content' && (
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {lesson.readingPassage && (
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                  Lectura Guiada • {lesson.readingPassage.difficulty}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {lesson.readingPassage.wordCount} palabras
                </span>
              </div>

              <h2 className="text-base font-extrabold text-slate-900">{lesson.readingPassage.title}</h2>

              {/* Interactive Reading Text with Tap-to-Translate & Spanish Reveal */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <InteractiveText
                  text={lesson.readingPassage.text}
                  spanishTranslation={lesson.readingPassage.spanishTranslation}
                  pnlTip={lesson.readingPassage.pnlTip || 'Toca cualquier palabra para ver su significado inmediato en español.'}
                  showFullSpanishToggle={true}
                />
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleSpeak(lesson.readingPassage?.text || '')}
                  className="w-full bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-brand-600" />
                  <span>Escuchar Lectura en Voz Alta ({activeSpeed}x)</span>
                </button>
              </div>
            </div>
          )}

          {lesson.listeningScript && (
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                  Audio Listening • Acento {lesson.listeningScript.accent}
                </span>
              </div>

              <h2 className="text-base font-extrabold text-slate-900">{lesson.listeningScript.title}</h2>

              {/* Speed Controller for Listening */}
              <AudioSpeedControl
                compact={false}
                currentRate={activeSpeed}
                onChange={(r) => setActiveSpeed(r)}
              />

              <button
                onClick={() => handleSpeak(lesson.listeningScript?.fullText || '', lesson.listeningScript?.accent)}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Volume2 className="w-5 h-5 animate-pulse-subtle" />
                <span>Reproducir Conversación ({activeSpeed}x)</span>
              </button>

              {/* Interactive Audio Transcript with Tap-to-Translate */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 block mb-2">
                  Transcripción Guiada Interactivamente:
                </span>
                <InteractiveText
                  text={lesson.listeningScript.fullText}
                  spanishTranslation={lesson.listeningScript.spanishTranslation}
                  pnlTip={lesson.listeningScript.pnlFocus || 'Usa el control de velocidad para escuchar a 0.75x y seguir cada palabra.'}
                  accent={lesson.listeningScript.accent}
                  showFullSpanishToggle={true}
                />
              </div>
            </div>
          )}

          <button
            onClick={() => setStep('quiz')}
            className="w-full bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-card transition-all"
          >
            <span>Comenzar Ejercicios de Comprensión</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 4: INTERACTIVE QUIZ EXERCISES */}
      {step === 'quiz' && currentExercise && (
        <div className="flex-1 p-5 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                Ejercicio {currentExerciseIdx + 1} de {lesson.exercises.length}
              </span>

              <p className="text-xs font-semibold text-slate-600">{currentExercise.instruction}</p>

              {currentExercise.audioText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(currentExercise.audioText || '')}
                    className="bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Volume2 className="w-4 h-4 text-brand-600" />
                    <span>Escuchar Frase ({activeSpeed}x)</span>
                  </button>
                </div>
              )}

              {currentExercise.question && (
                <div className="pt-1">
                  <InteractiveText
                    text={currentExercise.question}
                    spanishTranslation={currentExercise.spanishTranslation}
                    showFullSpanishToggle={false}
                    className="font-extrabold text-sm text-slate-900"
                  />
                </div>
              )}

              {/* Multiple Choice Options */}
              {currentExercise.options && (
                <div className="space-y-2.5 pt-2">
                  {currentExercise.options.map(opt => {
                    const isSelected = selectedOption === opt.id;
                    let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                    if (isAnswerChecked) {
                      if (opt.id === currentExercise.correctAnswer) {
                        optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-brand-50 border-brand-500 text-brand-900 font-semibold shadow-2xs';
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={isAnswerChecked}
                        onClick={() => setSelectedOption(opt.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between gap-2 ${optionStyle}`}
                      >
                        <span>{opt.text}</span>
                        {isAnswerChecked && opt.id === currentExercise.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerChecked && isSelected && opt.id !== currentExercise.correctAnswer && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Fill in the Blank Input */}
              {currentExercise.type === 'fill_blank' && (
                <div className="pt-2">
                  <input
                    type="text"
                    disabled={isAnswerChecked}
                    value={fillAnswer}
                    onChange={e => setFillAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              )}

              {/* Explanation Card after check */}
              {isAnswerChecked && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed mt-3 ${
                    isAnswerCorrect
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/90 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {isAnswerCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>¡Excelente! Correcto</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Respuesta incorrecta</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] opacity-90">{currentExercise.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="pt-4">
            {!isAnswerChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption && !fillAnswer}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl shadow-card transition-all"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNextExercise}
                className="w-full bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl shadow-card transition-all flex items-center justify-center gap-2"
              >
                <span>{currentExerciseIdx + 1 < lesson.exercises.length ? 'Siguiente Ejercicio' : 'Ver Resumen'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: SUMMARY & XP REWARD */}
      {step === 'summary' && (
        <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-lg">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              ¡Lección Completada con Éxito!
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">{lesson.title}</h2>
            <p className="text-xs text-slate-500 mt-1">Has sumado progreso hacia tu certificación C1.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500">Puntuación</span>
              <p className="text-lg font-extrabold text-slate-900">
                {correctAnswersCount}/{lesson.exercises.length}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500">Recompensa</span>
              <p className="text-lg font-extrabold text-brand-600">+120 XP</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full max-w-xs bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl shadow-card transition-all"
          >
            Volver a la Ruta
          </button>
        </div>
      )}
    </div>
  );
};
