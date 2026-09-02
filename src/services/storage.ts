import { UserProfile, ErrorItem, WritingSubmission, SpeakingTurn, AssessmentResult } from '../types';
import { supabaseService } from './supabase';

const INITIAL_PROFILE: UserProfile = {
  id: 'learner-user-1',
  name: 'English Scholar',
  email: 'learner@example.com',
  currentLevel: 'B1.1',
  targetLevel: 'C1',
  streakDays: 4,
  lastStudyDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 240, // 4 hours daily as specified in PRD
  todayStudyMinutes: 42,
  totalStudyMinutes: 1380, // ~23 hours accumulated
  xp: 1450,
  completedLessonIds: ['lesson-b1-1-1'],
  masteryScores: {
    reading: 58,
    writing: 46,
    listening: 52,
    speaking: 42,
    grammar: 60,
    vocabulary: 54
  }
};

const INITIAL_ERROR_BANK: ErrorItem[] = [
  {
    id: 'err-seed-1',
    category: 'Past Perfect Sequences',
    skill: 'grammar',
    mistake: 'When I arrived at the station, the train left.',
    correction: 'When I arrived at the station, the train had already left.',
    explanation: 'Use the Past Perfect ("had left") for an action that was completed before another past event.',
    incorrectCount: 2,
    correctInARow: 1,
    isMastered: false,
    lastReviewedAt: new Date(Date.now() - 86400000).toISOString(),
    nextReviewDate: new Date().toISOString().split('T')[0] // Due today
  },
  {
    id: 'err-seed-2',
    category: 'Preposition Collocations',
    skill: 'vocabulary',
    mistake: 'It strictly depends of the budget.',
    correction: 'It strictly depends on the budget.',
    explanation: 'The verb "depend" always collocates with the preposition "on" (or "upon" in formal contexts), never "of".',
    incorrectCount: 3,
    correctInARow: 2,
    isMastered: false,
    lastReviewedAt: new Date(Date.now() - 172800000).toISOString(),
    nextReviewDate: new Date().toISOString().split('T')[0] // Due today
  },
  {
    id: 'err-seed-3',
    category: 'Negative Inversion Word Order',
    skill: 'grammar',
    mistake: 'Rarely I have witnessed such team commitment.',
    correction: 'Rarely have I witnessed such team commitment.',
    explanation: 'When starting a sentence with negative adverbs like Rarely/Seldom, invert the auxiliary verb and subject.',
    incorrectCount: 1,
    correctInARow: 0,
    isMastered: false,
    lastReviewedAt: new Date().toISOString(),
    nextReviewDate: new Date().toISOString().split('T')[0] // Due today
  }
];

class StorageService {
  private profileKey = 'mi_ingles_profile';
  private errorBankKey = 'mi_ingles_error_bank';
  private writingKey = 'mi_ingles_writing_subs';
  private speakingKey = 'mi_ingles_speaking_sessions';
  private assessmentKey = 'mi_ingles_assessments';
  private dailyLogsKey = 'mi_ingles_daily_logs';

  // PROFILE
  public getProfile(): UserProfile {
    const data = localStorage.getItem(this.profileKey);
    if (!data) {
      this.saveProfile(INITIAL_PROFILE);
      return INITIAL_PROFILE;
    }
    try {
      const parsed: UserProfile = JSON.parse(data);
      // Check if today is a new day to reset today's minutes
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastStudyDate !== today) {
        // If last study date was yesterday, maintain streak, otherwise handle streak
        const lastDate = new Date(parsed.lastStudyDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        
        let newStreak = parsed.streakDays;
        if (diffDays > 1) {
          // Streak broken
          newStreak = 1;
        } else if (diffDays === 1) {
          // New day continuation
          newStreak = parsed.streakDays + 1;
        }

        parsed.todayStudyMinutes = 0;
        parsed.lastStudyDate = today;
        parsed.streakDays = newStreak;
        this.saveProfile(parsed);
      }
      return parsed;
    } catch (e) {
      return INITIAL_PROFILE;
    }
  }

  public saveProfile(profile: UserProfile) {
    localStorage.setItem(this.profileKey, JSON.stringify(profile));
    this.syncProfileToSupabase(profile);
  }

  // ERROR BANK
  public getErrorBank(): ErrorItem[] {
    const data = localStorage.getItem(this.errorBankKey);
    if (!data) {
      this.saveErrorBank(INITIAL_ERROR_BANK);
      return INITIAL_ERROR_BANK;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_ERROR_BANK;
    }
  }

  public saveErrorBank(errors: ErrorItem[]) {
    localStorage.setItem(this.errorBankKey, JSON.stringify(errors));
    this.syncErrorBankToSupabase(errors);
  }

  // WRITING SUBMISSIONS
  public getWritingSubmissions(): WritingSubmission[] {
    const data = localStorage.getItem(this.writingKey);
    return data ? JSON.parse(data) : [];
  }

  public saveWritingSubmission(sub: WritingSubmission) {
    const existing = this.getWritingSubmissions();
    const updated = [sub, ...existing];
    localStorage.setItem(this.writingKey, JSON.stringify(updated));
  }

  // ASSESSMENTS
  public getAssessmentResults(): AssessmentResult[] {
    const data = localStorage.getItem(this.assessmentKey);
    return data ? JSON.parse(data) : [];
  }

  public saveAssessmentResult(res: AssessmentResult) {
    const existing = this.getAssessmentResults();
    const updated = [res, ...existing];
    localStorage.setItem(this.assessmentKey, JSON.stringify(updated));
  }

  // DAILY LOGS (For 4-Hour Tracking)
  public getDailyLogs(): { date: string; minutes: number }[] {
    const data = localStorage.getItem(this.dailyLogsKey);
    if (!data) {
      // Seed last 7 days of realistic logs
      const seed = [
        { date: '2026-08-27', minutes: 180 },
        { date: '2026-08-28', minutes: 210 },
        { date: '2026-08-29', minutes: 240 },
        { date: '2026-08-30', minutes: 195 },
        { date: '2026-08-31', minutes: 240 },
        { date: '2026-09-01', minutes: 225 },
        { date: new Date().toISOString().split('T')[0], minutes: 42 }
      ];
      localStorage.setItem(this.dailyLogsKey, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(data);
  }

  public logStudyTime(addedMinutes: number) {
    const profile = this.getProfile();
    profile.todayStudyMinutes += addedMinutes;
    profile.totalStudyMinutes += addedMinutes;
    profile.xp += addedMinutes * 2;
    this.saveProfile(profile);

    const logs = this.getDailyLogs();
    const today = new Date().toISOString().split('T')[0];
    const todayLogIndex = logs.findIndex(l => l.date === today);
    if (todayLogIndex >= 0) {
      logs[todayLogIndex].minutes += addedMinutes;
    } else {
      logs.push({ date: today, minutes: addedMinutes });
    }
    localStorage.setItem(this.dailyLogsKey, JSON.stringify(logs));
  }

  // SUPABASE SYNC HELPERS (Silent background synchronization)
  private async syncProfileToSupabase(profile: UserProfile) {
    const sb = supabaseService.getClient();
    if (!sb) return;
    try {
      await sb.from('profiles').upsert({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        current_level: profile.currentLevel,
        target_level: profile.targetLevel,
        streak_days: profile.streakDays,
        last_study_date: profile.lastStudyDate,
        daily_goal_minutes: profile.dailyGoalMinutes,
        today_study_minutes: profile.todayStudyMinutes,
        total_study_minutes: profile.totalStudyMinutes,
        xp: profile.xp,
        completed_lessons: profile.completedLessonIds,
        mastery_scores: profile.masteryScores,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      // Background sync fail silent
    }
  }

  private async syncErrorBankToSupabase(errors: ErrorItem[]) {
    const sb = supabaseService.getClient();
    if (!sb) return;
    try {
      // Sync logic
    } catch (e) {
      // Silent
    }
  }
}

export const storageService = new StorageService();
