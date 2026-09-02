import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, ErrorItem, SkillType, CEFRSubLevel } from '../types';
import { storageService } from '../services/storage';
import { adaptiveEngine } from '../services/adaptiveEngine';

interface StudyContextType {
  user: UserProfile;
  errorBank: ErrorItem[];
  isTimerRunning: boolean;
  activeSessionSeconds: number;
  toggleStudyTimer: () => void;
  completeLesson: (lessonId: string, skill: SkillType, scorePercentage: number) => void;
  recordMistake: (mistakeData: { category: string; skill: SkillType; mistake: string; correction: string; explanation: string }) => void;
  resolveErrorItem: (errorId: string) => void;
  updateMastery: (skill: SkillType, delta: number) => void;
  setUserLevel: (level: CEFRSubLevel) => void;
  refreshUserData: () => void;
  triggerConfetti: () => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => storageService.getProfile());
  const [errorBank, setErrorBank] = useState<ErrorItem[]>(() => storageService.getErrorBank());
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true); // Auto-starts on session open
  const [activeSessionSeconds, setActiveSessionSeconds] = useState<number>(0);

  // Periodic persistence of timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setActiveSessionSeconds(prev => {
          const next = prev + 1;
          // Every 60 seconds, log 1 minute of active study
          if (next % 60 === 0) {
            storageService.logStudyTime(1);
            setUser(storageService.getProfile());
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleStudyTimer = () => {
    setIsTimerRunning(prev => !prev);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore
    }
  };

  const completeLesson = (lessonId: string, skill: SkillType, scorePercentage: number) => {
    const current = { ...user };
    if (!current.completedLessonIds.includes(lessonId)) {
      current.completedLessonIds.push(lessonId);
    }

    // Award XP
    current.xp += Math.round((scorePercentage / 100) * 120);

    // Boost skill mastery
    const boost = Math.round((scorePercentage / 100) * 5);
    current.masteryScores[skill] = Math.min(100, (current.masteryScores[skill] || 50) + boost);

    storageService.saveProfile(current);
    setUser(current);
    triggerConfetti();
  };

  const recordMistake = (mistakeData: {
    category: string;
    skill: SkillType;
    mistake: string;
    correction: string;
    explanation: string;
  }) => {
    const updated = adaptiveEngine.recordMistake(errorBank, mistakeData);
    setErrorBank(updated);
    storageService.saveErrorBank(updated);

    // Slight reduction in skill mastery
    const current = { ...user };
    current.masteryScores[mistakeData.skill] = Math.max(20, (current.masteryScores[mistakeData.skill] || 50) - 2);
    storageService.saveProfile(current);
    setUser(current);
  };

  const resolveErrorItem = (errorId: string) => {
    const updated = adaptiveEngine.recordReviewSuccess(errorBank, errorId);
    setErrorBank(updated);
    storageService.saveErrorBank(updated);

    // Award XP for successful review
    const current = { ...user };
    current.xp += 25;
    storageService.saveProfile(current);
    setUser(current);
  };

  const updateMastery = (skill: SkillType, delta: number) => {
    const current = { ...user };
    current.masteryScores[skill] = Math.min(100, Math.max(10, (current.masteryScores[skill] || 50) + delta));
    storageService.saveProfile(current);
    setUser(current);
  };

  const setUserLevel = (level: CEFRSubLevel) => {
    const current = { ...user, currentLevel: level };
    storageService.saveProfile(current);
    setUser(current);
  };

  const refreshUserData = () => {
    setUser(storageService.getProfile());
    setErrorBank(storageService.getErrorBank());
  };

  return (
    <StudyContext.Provider
      value={{
        user,
        errorBank,
        isTimerRunning,
        activeSessionSeconds,
        toggleStudyTimer,
        completeLesson,
        recordMistake,
        resolveErrorItem,
        updateMastery,
        setUserLevel,
        refreshUserData,
        triggerConfetti
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
