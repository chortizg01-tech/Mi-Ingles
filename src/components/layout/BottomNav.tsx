import React from 'react';
import { Home, Map, PenTool, Mic, RotateCcw, User } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export type TabType = 'dashboard' | 'roadmap' | 'writing' | 'speaking' | 'review' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const { errorBank } = useStudy();
  const today = new Date().toISOString().split('T')[0];
  const pendingErrorsCount = errorBank.filter(e => !e.isMastered && e.nextReviewDate <= today).length;

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'roadmap', label: 'Ruta', icon: Map },
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'review', label: 'Repaso', icon: RotateCcw, badge: pendingErrorsCount },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg safe-bottom flex items-center justify-around">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
              isActive
                ? 'text-brand-600 font-semibold'
                : 'text-slate-400 hover:text-slate-600 font-normal'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-0.5"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
