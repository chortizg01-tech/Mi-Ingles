import { UserProfile, ErrorItem, WritingSubmission, SpeakingTurn, AssessmentResult, SavedWord } from '../types';
import { supabaseService } from './supabase';

const CLEAN_INITIAL_PROFILE: UserProfile = {
  id: 'learner-user-1',
  name: 'Estudiante',
  email: 'learner@example.com',
  currentLevel: 'A2.1', // Iniciando en A2.1 para progresión amigable
  targetLevel: 'C1',
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 240, // 4 horas diarias
  todayStudyMinutes: 0,
  totalStudyMinutes: 0,
  xp: 0,
  completedLessonIds: [],
  masteryScores: {
    reading: 25,
    writing: 25,
    listening: 25,
    speaking: 25,
    grammar: 25,
    vocabulary: 25
  },
  savedWords: []
};

class StorageService {
  private profileKey = 'mi_ingles_profile';
  private errorBankKey = 'mi_ingles_error_bank';
  private writingKey = 'mi_ingles_writing_subs';
  private speakingKey = 'mi_ingles_speaking_sessions';
  private assessmentKey = 'mi_ingles_assessments';
  private dailyLogsKey = 'mi_ingles_daily_logs';
  private savedWordsKey = 'mi_ingles_saved_words';

  // PROFILE
  public getProfile(): UserProfile {
    const data = localStorage.getItem(this.profileKey);
    if (!data) {
      this.saveProfile(CLEAN_INITIAL_PROFILE);
      return CLEAN_INITIAL_PROFILE;
    }
    try {
      const parsed: UserProfile = JSON.parse(data);
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastStudyDate !== today) {
        const lastDate = new Date(parsed.lastStudyDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        
        let newStreak = parsed.streakDays;
        if (diffDays > 1) {
          newStreak = 1;
        } else if (diffDays === 1) {
          newStreak = parsed.streakDays + 1;
        }

        parsed.todayStudyMinutes = 0;
        parsed.lastStudyDate = today;
        parsed.streakDays = newStreak;
        this.saveProfile(parsed);
      }
      return parsed;
    } catch (e) {
      return CLEAN_INITIAL_PROFILE;
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
      this.saveErrorBank([]);
      return [];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
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

  // SAVED VOCABULARY WORDS (Tap-to-Translate)
  public getSavedWords(): SavedWord[] {
    const data = localStorage.getItem(this.savedWordsKey);
    return data ? JSON.parse(data) : [];
  }

  public saveWord(word: SavedWord): boolean {
    const existing = this.getSavedWords();
    if (!existing.some(w => w.term.toLowerCase() === word.term.toLowerCase())) {
      const updated = [word, ...existing];
      localStorage.setItem(this.savedWordsKey, JSON.stringify(updated));
      return true;
    }
    return false;
  }

  // DAILY LOGS
  public getDailyLogs(): { date: string; minutes: number }[] {
    const data = localStorage.getItem(this.dailyLogsKey);
    if (!data) {
      const today = new Date().toISOString().split('T')[0];
      const cleanLogs = [{ date: today, minutes: 0 }];
      localStorage.setItem(this.dailyLogsKey, JSON.stringify(cleanLogs));
      return cleanLogs;
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

  // RESET TO ZERO (Comenzar desde cero)
  public resetAllProgress(): void {
    localStorage.removeItem(this.profileKey);
    localStorage.removeItem(this.errorBankKey);
    localStorage.removeItem(this.writingKey);
    localStorage.removeItem(this.speakingKey);
    localStorage.removeItem(this.assessmentKey);
    localStorage.removeItem(this.dailyLogsKey);
    this.saveProfile(CLEAN_INITIAL_PROFILE);
    this.saveErrorBank([]);
  }

  // SUPABASE SYNC
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
      // Sync
    } catch (e) {
      // Silent
    }
  }
}

export const storageService = new StorageService();
