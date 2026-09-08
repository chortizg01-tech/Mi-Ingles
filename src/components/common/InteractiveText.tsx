import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Bookmark, Check, Globe, Sparkles, X, Brain } from 'lucide-react';
import { translationService, WordTranslation } from '../../services/translationService';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storage';

interface InteractiveTextProps {
  text: string;
  spanishTranslation?: string;
  pnlTip?: string;
  accent?: 'US' | 'UK';
  className?: string;
  showFullSpanishToggle?: boolean;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  spanishTranslation,
  pnlTip,
  accent = 'US',
  className = '',
  showFullSpanishToggle = true
}) => {
  const [selectedWordData, setSelectedWordData] = useState<WordTranslation | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showFullTranslation, setShowFullTranslation] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedWordData(null);
        setPopoverPos(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    const data = translationService.lookupWord(word);
    
    // Position relative to click / target element
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
    
    setPopoverPos({
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.bottom - parentRect.top + 6
    });
    
    setSelectedWordData(data);
    setIsSaved(false);
  };

  const handleSpeakWord = (word: string) => {
    speechService.speak(word, { accent });
  };

  const handleSaveWord = () => {
    if (!selectedWordData) return;
    storageService.saveWord({
      id: `word-${Date.now()}`,
      term: selectedWordData.word,
      phonetic: selectedWordData.phonetic,
      definition: selectedWordData.pos,
      spanish: selectedWordData.spanish,
      example: selectedWordData.exampleEn,
      pnlAnchor: selectedWordData.pnlAnchor,
      savedAt: new Date().toISOString()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Split text by words while preserving punctuation and line breaks
  const renderTokens = () => {
    const paragraphs = text.split('\n');

    return paragraphs.map((paragraph, pIdx) => {
      // Split tokens by spaces
      const tokens = paragraph.split(/(\s+)/);

      return (
        <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed">
          {tokens.map((token, tIdx) => {
            if (/^\s+$/.test(token)) {
              return <span key={tIdx}>{token}</span>;
            }

            const cleanWord = translationService.cleanWord(token);
            if (!cleanWord) {
              return <span key={tIdx}>{token}</span>;
            }

            const isSelected = selectedWordData?.word.toLowerCase() === cleanWord.toLowerCase();

            return (
              <span
                key={tIdx}
                onClick={(e) => handleWordClick(e, cleanWord)}
                className={`cursor-pointer inline-block rounded-md px-1 py-0.5 transition-all select-none ${
                  isSelected
                    ? 'bg-amber-300 text-amber-950 font-bold ring-2 ring-amber-400/60 shadow-2xs'
                    : 'hover:bg-brand-100 hover:text-brand-900 border-b border-dotted border-slate-300'
                }`}
                title="Toca para ver traducción en español"
              >
                {token}
              </span>
            );
          })}
        </p>
      );
    });
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Interactive Text Body */}
      <div className="text-slate-800 text-xs">
        {renderTokens()}
      </div>

      {/* Floating Word Popover Tooltip */}
      {selectedWordData && popoverPos && (
        <div
          className="absolute z-40 bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-700 w-64 max-w-[90vw] transform -translate-x-1/2 animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: `${Math.max(120, Math.min(popoverPos.x, (containerRef.current?.clientWidth || 300) - 120))}px`,
            top: `${popoverPos.y}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-amber-400 capitalize">
                {selectedWordData.word}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedWordData.phonetic}
              </span>
            </div>
            <button
              onClick={() => setSelectedWordData(null)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Spanish Translation */}
          <div className="mb-2">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wide block">
              🇪🇸 Español ({selectedWordData.pos})
            </span>
            <p className="text-xs font-bold text-white mt-0.5">
              {selectedWordData.spanish}
            </p>
          </div>

          {/* PNL Mnemonic Anchor */}
          {selectedWordData.pnlAnchor && (
            <div className="bg-brand-950/80 border border-brand-800/60 rounded-xl p-2 mb-2.5 text-[11px] text-brand-200 flex items-start gap-1.5">
              <Brain className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Anclaje PNL: </span>
                <span>{selectedWordData.pnlAnchor}</span>
              </div>
            </div>
          )}

          {/* Action Buttons: Speak & Bookmark */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[11px]">
            <button
              onClick={() => handleSpeakWord(selectedWordData.word)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Escuchar</span>
            </button>

            <button
              onClick={handleSaveWord}
              className={`flex-1 font-semibold py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-600 hover:bg-brand-700 text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Guardada!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* PNL Tip Box (if provided) */}
      {pnlTip && (
        <div className="mt-3 bg-amber-50/90 border border-amber-200/90 rounded-2xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Estrategia PNL: </span>
            <span>{pnlTip}</span>
          </div>
        </div>
      )}

      {/* Full Spanish Translation Accordion Toggle */}
      {showFullSpanishToggle && spanishTranslation && (
        <div className="mt-3 pt-2 border-t border-slate-200/80">
          <button
            onClick={() => setShowFullTranslation(prev => !prev)}
            className="text-[11px] font-bold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-brand-600" />
            <span>{showFullTranslation ? 'Ocultar Traducción en Español' : '🌐 Ver Traducción Completa en Español'}</span>
          </button>

          {showFullTranslation && (
            <div className="mt-2 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 leading-relaxed animate-in fade-in duration-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
                Traducción Literal y Contextual:
              </span>
              <p className="whitespace-pre-line">{spanishTranslation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
