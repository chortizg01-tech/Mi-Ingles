import React, { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface AudioSpeedControlProps {
  currentRate?: number;
  onChange?: (rate: number) => void;
  compact?: boolean;
}

const SPEED_OPTIONS = [
  { rate: 0.6, label: '0.6x', desc: 'Súper Claro' },
  { rate: 0.75, label: '0.75x', desc: 'Aprendiz' },
  { rate: 0.85, label: '0.85x', desc: 'Recomendado' },
  { rate: 1.0, label: '1.0x', desc: 'Normal' },
  { rate: 1.25, label: '1.25x', desc: 'Reto' }
];

export const AudioSpeedControl: React.FC<AudioSpeedControlProps> = ({
  currentRate,
  onChange,
  compact = false
}) => {
  const [activeRate, setActiveRate] = useState<number>(
    currentRate !== undefined ? currentRate : speechService.getPlaybackRate()
  );

  useEffect(() => {
    if (currentRate !== undefined) {
      setActiveRate(currentRate);
    }
  }, [currentRate]);

  const handleSelectRate = (rate: number) => {
    setActiveRate(rate);
    speechService.setPlaybackRate(rate);
    if (onChange) {
      onChange(rate);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-slate-100/90 rounded-xl p-1 border border-slate-200">
        <Gauge className="w-3.5 h-3.5 text-brand-600 ml-1 shrink-0" />
        <div className="flex items-center gap-0.5">
          {SPEED_OPTIONS.map(opt => {
            const isSelected = Math.abs(activeRate - opt.rate) < 0.04;
            return (
              <button
                key={opt.rate}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRate(opt.rate);
                }}
                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title={`Velocidad ${opt.label} (${opt.desc})`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2.5 space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold text-slate-700 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-brand-600" />
          <span>Velocidad de Audio y Voz:</span>
        </span>
        <span className="font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md text-[10px]">
          {activeRate}x • {SPEED_OPTIONS.find(o => Math.abs(o.rate - activeRate) < 0.04)?.desc || 'Personalizada'}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1 pt-0.5">
        {SPEED_OPTIONS.map(opt => {
          const isSelected = Math.abs(activeRate - opt.rate) < 0.04;
          return (
            <button
              key={opt.rate}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectRate(opt.rate);
              }}
              className={`py-1 px-1 rounded-xl text-center text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-brand-600 border-brand-600 text-white shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="leading-tight">{opt.label}</div>
              <div className="text-[8px] font-normal opacity-80 truncate">{opt.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
