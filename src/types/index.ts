// Tipos principales para el sistema de aprendizaje 'Mi Inglés'

export type CEFRLevel = 'A2' | 'B1' | 'B2' | 'C1';
export type CEFRSubLevel = 'A2.1' | 'A2.2' | 'B1.1' | 'B1.2' | 'B2.1' | 'B2.2' | 'C1.1' | 'C1.2';

export type SkillType = 'reading' | 'writing' | 'listening' | 'speaking' | 'grammar' | 'vocabulary';

export interface SavedWord {
  id: string;
  term: string;
  phonetic: string;
  definition: string;
  spanish: string;
  example: string;
  pnlAnchor?: string;
  savedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  currentLevel: CEFRSubLevel;
  targetLevel: CEFRLevel;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  dailyGoalMinutes: number; // e.g., 240 mins (4 hours)
  todayStudyMinutes: number;
  totalStudyMinutes: number;
  xp: number;
  completedLessonIds: string[];
  masteryScores: Record<SkillType, number>; // 0 to 100
  savedWords?: SavedWord[];
  playbackSpeed?: number; // 0.6, 0.75, 0.9, 1.0, 1.25
}

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'sentence_order'
  | 'listening_comprehension'
  | 'reading_comprehension'
  | 'match_pairs'
  | 'speaking_prompt';

export interface ExerciseOption {
  id: string;
  text: string;
  explanation?: string;
  spanishText?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  skill: SkillType;
  instruction: string;
  question?: string;
  contextText?: string; // For reading or listening audio transcript
  audioText?: string; // Text to be spoken via TTS
  options?: ExerciseOption[];
  correctAnswer: string | string[]; // string or array for order/match
  explanation: string;
  difficulty: CEFRSubLevel;
  grammarTopic?: string;
  vocabTerms?: string[];
  pnlTip?: string;
  spanishTranslation?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  level: CEFRSubLevel;
  title: string;
  subtitle: string;
  durationMinutes: number;
  focusSkill: SkillType;
  grammarNote?: {
    title: string;
    rules: string[];
    examples: { en: string; es: string }[];
    commonMistakes: string[];
    neuroChunks?: { chunk: string; meaning: string; pnlVisual: string }[];
  };
  vocabularyItems?: {
    term: string;
    phonetic: string;
    definition: string;
    example: string;
    spanish: string;
    pnlAnchor?: string; // Mental/visual association anchor
  }[];
  readingPassage?: {
    title: string;
    text: string;
    spanishTranslation?: string;
    wordCount: number;
    difficulty: CEFRSubLevel;
    pnlTip?: string;
  };
  listeningScript?: {
    title: string;
    speakerA: string;
    speakerB?: string;
    fullText: string;
    spanishTranslation?: string;
    accent: 'US' | 'UK';
    pnlFocus?: string;
  };
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  level: CEFRSubLevel;
  number: number;
  title: string;
  description: string;
  badgeIcon: string;
  lessons: Lesson[];
}

export interface ErrorItem {
  id: string;
  category: string; // e.g. "Third Conditional", "Phrasal Verbs with Look", "Inversion"
  skill: SkillType;
  mistake: string;
  correction: string;
  explanation: string;
  incorrectCount: number;
  correctInARow: number; // SRS: resets on fail, 3 in a row = mastered
  isMastered: boolean;
  lastReviewedAt: string;
  nextReviewDate: string;
}

export interface WritingSubmission {
  id: string;
  promptId: string;
  promptTitle: string;
  promptDescription: string;
  level: CEFRSubLevel;
  userText: string;
  wordCount: number;
  createdAt: string;
  scores: {
    overall: number; // 0 - 100
    grammar: number;
    vocabulary: number;
    cohesion: number;
    taskAchievement: number;
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    grammarCorrections: {
      original: string;
      suggested: string;
      reason: string;
    }[];
    advancedVocabularySuggestions: {
      originalWord: string;
      c1Alternative: string;
      example: string;
    }[];
    rewrittenNativeVersion: string;
  };
}

export interface SpeakingTurn {
  id: string;
  speaker: 'tutor' | 'user';
  text: string;
  spanishTranslation?: string;
  audioUrl?: string;
  timestamp: string;
  feedback?: {
    fluencyScore: number;
    pronunciationScore: number;
    grammarScore: number;
    correctedSentence?: string;
    betterPhrasing?: string;
    notes?: string;
  };
}

export interface SpeakingScenario {
  id: string;
  level: CEFRSubLevel;
  title: string;
  context: string;
  tutorRole: string;
  userRole: string;
  starterPrompt: string;
  accent: 'US' | 'UK';
  targetVocab: string[];
  suggestedDurationMinutes: number;
  pnlTip?: string;
}

export interface AssessmentQuestion {
  id: string;
  levelTarget: CEFRSubLevel;
  skill: SkillType;
  prompt: string;
  context?: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface AssessmentResult {
  id: string;
  date: string;
  type: 'placement' | 'milestone_a2' | 'milestone_b1' | 'milestone_b2' | 'milestone_c1';
  calculatedLevel: CEFRSubLevel;
  overallScore: number;
  skillBreakdown: Record<SkillType, number>;
  recommendations: string[];
}
