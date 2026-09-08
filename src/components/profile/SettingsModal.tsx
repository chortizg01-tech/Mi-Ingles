import React, { useState } from 'react';
import { X, Database, Bot, Volume2, Save, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { supabaseService } from '../../services/supabase';
import { aiService, AISettings } from '../../services/aiService';
import { storageService } from '../../services/storage';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  // Supabase State
  const initialSb = supabaseService.getConfig();
  const [sbUrl, setSbUrl] = useState<string>(initialSb.url);
  const [sbKey, setSbKey] = useState<string>(initialSb.anonKey);
  const [sbStatus, setSbStatus] = useState<'connected' | 'offline' | 'saved'>(
    initialSb.isConnected ? 'connected' : 'offline'
  );

  // AI State
  const [aiProvider, setAiProvider] = useState<AISettings['provider']>('built-in');
  const [aiKey, setAiKey] = useState<string>('');
  const [aiSaved, setAiSaved] = useState<boolean>(false);

  const handleSaveSupabase = () => {
    const success = supabaseService.setConfig(sbUrl.trim(), sbKey.trim());
    if (success) {
      setSbStatus('connected');
    } else {
      setSbStatus('offline');
    }
  };

  const handleSaveAI = () => {
    aiService.saveSettings({
      provider: aiProvider,
      apiKey: aiKey.trim()
    });
    setAiSaved(true);
    setTimeout(() => setAiSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Configuración y Conexiones</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 text-xs">
          {/* SUPABASE BACKEND SECTION */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Base de Datos Supabase</span>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  sbStatus === 'connected'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {sbStatus === 'connected' ? '● Conectado' : '○ Modo Local'}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Conecta tu proyecto Supabase para sincronizar progreso, banco de errores y horas de estudio en tiempo real.
            </p>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={sbUrl}
                  onChange={e => setSbUrl(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Supabase Anon Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                  value={sbKey}
                  onChange={e => setSbKey(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleSaveSupabase}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Credenciales Supabase</span>
            </button>
          </div>

          {/* AI ENGINE SECTION */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Bot className="w-4 h-4 text-brand-600" />
              <span>Motor de Inteligencia Artificial</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              La app incluye un evaluador pedagógico nativo. Opcionalmente puedes conectar tu propia API key para análisis avanzado.
            </p>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Proveedor de IA
                </label>
                <select
                  value={aiProvider}
                  onChange={e => setAiProvider(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="built-in">Evaluador Nativo Integrado (Recomendado)</option>
                  <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                  <option value="gemini">Google Gemini API</option>
                  <option value="groq">Groq Llama 3 Fast</option>
                </select>
              </div>

              {aiProvider !== 'built-in' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={aiKey}
                    onChange={e => setAiKey(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleSaveAI}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{aiSaved ? '¡Configuración Guardada!' : 'Guardar Ajustes de IA'}</span>
            </button>
          </div>

          {/* RESET PROGRESS SECTION */}
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Reiniciar Progreso a Cero</span>
            </div>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              Borra todo el histórico de prueba para comenzar tu aprendizaje desde cero (0 minutos, 0 lecciones, baúl limpio).
            </p>
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas reiniciar todo tu progreso a cero para empezar desde el principio?')) {
                  storageService.resetAllProgress();
                  window.location.reload();
                }
              }}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs"
            >
              🔄 Reiniciar Todo a Cero
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
