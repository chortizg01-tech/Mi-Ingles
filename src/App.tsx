import React, { useState } from 'react';
import { StudyProvider } from './context/StudyContext';
import { MobileContainer } from './components/layout/MobileContainer';
import { TopBar } from './components/layout/TopBar';
import { BottomNav, TabType } from './components/layout/BottomNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { LessonPlayerView } from './components/lesson/LessonPlayerView';
import { WritingView } from './components/writing/WritingView';
import { SpeakingView } from './components/speaking/SpeakingView';
import { SmartReviewView } from './components/review/SmartReviewView';
import { ProfileView } from './components/profile/ProfileView';
import { AssessmentModal } from './components/assessment/AssessmentModal';
import { SettingsModal } from './components/profile/SettingsModal';
import { NeuroBoosterModal } from './components/common/NeuroBoosterModal';
import { Lesson } from './types';
import { CURRICULUM_UNITS } from './data/curriculum';

export const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isNeuroBoosterOpen, setIsNeuroBoosterOpen] = useState<boolean>(false);

  const handleNavigate = (tab: TabType, extra?: { lessonId?: string; scenarioId?: string }) => {
    setActiveLesson(null);
    setActiveTab(tab);

    if (extra?.lessonId) {
      for (const u of CURRICULUM_UNITS) {
        const found = u.lessons.find(l => l.id === extra.lessonId);
        if (found) {
          setActiveLesson(found);
          break;
        }
      }
    }
  };

  return (
    <MobileContainer>
      {/* Top Bar with Streak, Level, Neuro Booster & 4-Hour Daily Study Goal */}
      {!activeLesson && (
        <TopBar
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAssessment={() => setIsAssessmentOpen(true)}
          onOpenNeuroBooster={() => setIsNeuroBoosterOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeLesson ? (
          <LessonPlayerView
            lesson={activeLesson}
            onBack={() => setActiveLesson(null)}
            onComplete={() => {
              setActiveLesson(null);
              setActiveTab('roadmap');
            }}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                onNavigate={handleNavigate}
                onOpenAssessment={() => setIsAssessmentOpen(true)}
                onOpenNeuroBooster={() => setIsNeuroBoosterOpen(true)}
              />
            )}
            {activeTab === 'roadmap' && (
              <RoadmapView onSelectLesson={(lesson) => setActiveLesson(lesson)} />
            )}
            {activeTab === 'writing' && <WritingView />}
            {activeTab === 'speaking' && <SpeakingView />}
            {activeTab === 'review' && <SmartReviewView />}
            {activeTab === 'profile' && (
              <ProfileView
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenAssessment={() => setIsAssessmentOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Nav Bar */}
      {!activeLesson && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveLesson(null);
            setActiveTab(tab);
          }}
        />
      )}

      {/* Modals */}
      {isAssessmentOpen && (
        <AssessmentModal onClose={() => setIsAssessmentOpen(false)} />
      )}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
      {isNeuroBoosterOpen && (
        <NeuroBoosterModal onClose={() => setIsNeuroBoosterOpen(false)} />
      )}
    </MobileContainer>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <MainAppContent />
    </StudyProvider>
  );
}
