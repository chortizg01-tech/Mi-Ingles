// Servicio de Voz: Speech-to-Text (STT) y Text-to-Speech (TTS)
// Compatible con iOS Safari, Chrome Android, Chrome Desktop, Edge, Firefox

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  accent: 'US' | 'UK' | 'AU' | 'Other';
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isRecognizing: boolean = false;
  private playbackRate: number = 0.85;
  private isSpeaking: boolean = false;
  private pendingChunks: string[] = [];
  private currentOptions: {
    rate: number;
    pitch: number;
    lang: string;
    voice: SpeechSynthesisVoice | null;
    onEnd?: () => void;
    onError?: (err: any) => void;
  } | null = null;
  private resolveCurrentSpeak: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedRate = localStorage.getItem('mi_ingles_speech_rate');
      if (savedRate) {
        const parsed = parseFloat(savedRate);
        if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.5) {
          this.playbackRate = parsed;
        }
      }

      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadVoices();

        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadVoices();
        }

        // Chrome bug: la síntesis se pausa silenciosamente después de ~15s
        // Llamar resume() periódicamente mientras se reproduce
        setInterval(() => {
          if (this.synth && this.isSpeaking) {
            this.synth.resume();
          }
        }, 5000);
      }

      // Initialize Web Speech Recognition
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const all = this.synth.getVoices();
    if (all.length > 0) {
      this.voices = all.filter(v => v.lang.startsWith('en'));
    }
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mi_ingles_speech_rate', rate.toString());
    }
  }

  public getAvailableVoices(): VoiceOption[] {
    return this.voices.map(v => {
      let accent: 'US' | 'UK' | 'AU' | 'Other' = 'Other';
      if (v.lang === 'en-US') accent = 'US';
      else if (v.lang === 'en-GB') accent = 'UK';
      else if (v.lang === 'en-AU') accent = 'AU';

      return {
        voice: v,
        name: v.name,
        lang: v.lang,
        accent
      };
    });
  }

  /**
   * Selecciona la mejor voz inglesa disponible.
   * Intenta recargar voces si están vacías (bug de Chrome).
   */
  private selectVoice(accent: 'US' | 'UK' | undefined): SpeechSynthesisVoice | null {
    // Intentar cargar voces si aún no se han cargado
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const targetLang = accent === 'UK' ? 'en-GB' : 'en-US';
    return (
      this.voices.find(v => v.lang === targetLang) ||
      this.voices.find(v => v.lang.startsWith('en')) ||
      null
    );
  }

  /**
   * Divide texto largo en chunks para evitar que Chrome
   * corte silenciosamente utterances largos (>15 segundos).
   */
  private splitTextIntoChunks(text: string): string[] {
    if (text.length <= 200) return [text];

    const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > 180 && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence;
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks.length > 0 ? chunks : [text];
  }

  /**
   * Reproduce el siguiente chunk pendiente en la cola.
   * Se llama desde onend del chunk anterior.
   */
  private speakNextChunk() {
    if (!this.synth || !this.currentOptions || this.pendingChunks.length === 0) {
      this.isSpeaking = false;
      if (this.currentOptions?.onEnd) this.currentOptions.onEnd();
      if (this.resolveCurrentSpeak) this.resolveCurrentSpeak();
      this.currentOptions = null;
      this.resolveCurrentSpeak = null;
      return;
    }

    const chunkText = this.pendingChunks.shift()!;
    const opts = this.currentOptions;

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = opts.rate;
    utterance.pitch = opts.pitch;
    utterance.lang = opts.lang;

    if (opts.voice) {
      utterance.voice = opts.voice;
    }

    utterance.onend = () => {
      if (this.pendingChunks.length > 0) {
        // Pequeña pausa entre chunks para naturalidad
        setTimeout(() => this.speakNextChunk(), 60);
      } else {
        this.isSpeaking = false;
        if (opts.onEnd) opts.onEnd();
        if (this.resolveCurrentSpeak) this.resolveCurrentSpeak();
        this.currentOptions = null;
        this.resolveCurrentSpeak = null;
      }
    };

    utterance.onerror = (err) => {
      console.error('Speech synthesis error:', err);
      // Intentar continuar con el siguiente chunk
      if (this.pendingChunks.length > 0) {
        setTimeout(() => this.speakNextChunk(), 60);
      } else {
        this.isSpeaking = false;
        if (opts.onError) opts.onError(err);
        if (this.resolveCurrentSpeak) this.resolveCurrentSpeak();
        this.currentOptions = null;
        this.resolveCurrentSpeak = null;
      }
    };

    this.synth.speak(utterance);
  }

  /**
   * Pronuncia un texto en inglés usando síntesis de voz natural.
   * 
   * IMPORTANTE: Este método es SÍNCRONO en su llamada a synth.speak()
   * para garantizar compatibilidad con iOS Safari y Chrome Android,
   * que requieren que speak() se ejecute directamente dentro del
   * gesto del usuario (click/touch) sin delays async intermedios.
   */
  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      accent?: 'US' | 'UK';
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('SpeechSynthesis is not supported in this browser.');
        if (options.onEnd) options.onEnd();
        resolve();
        return;
      }

      // 1. Cancelar cualquier audio previo (síncrono)
      this.synth.cancel();
      this.isSpeaking = false;
      this.pendingChunks = [];
      this.currentOptions = null;
      if (this.resolveCurrentSpeak) {
        this.resolveCurrentSpeak();
      }

      // 2. Preparar configuración (síncrono)
      const targetLang = options.accent === 'UK' ? 'en-GB' : 'en-US';
      const selectedVoice = this.selectVoice(options.accent);
      const rate = options.rate !== undefined ? options.rate : this.playbackRate;

      // 3. Dividir texto en chunks si es largo
      const chunks = this.splitTextIntoChunks(text);

      // 4. Guardar configuración para los chunks siguientes
      this.currentOptions = {
        rate,
        pitch: options.pitch || 1.0,
        lang: targetLang,
        voice: selectedVoice,
        onEnd: options.onEnd,
        onError: options.onError
      };
      this.resolveCurrentSpeak = resolve;

      // 5. Crear y hablar el PRIMER chunk SINCRÓNICAMENTE (crítico para móviles)
      //    Los chunks restantes se encolan y se procesan via onend
      const firstChunk = chunks.shift()!;
      this.pendingChunks = chunks; // los restantes

      const utterance = new SpeechSynthesisUtterance(firstChunk);
      utterance.rate = rate;
      utterance.pitch = options.pitch || 1.0;
      utterance.lang = targetLang;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        if (this.pendingChunks.length > 0) {
          setTimeout(() => this.speakNextChunk(), 60);
        } else {
          this.isSpeaking = false;
          if (options.onEnd) options.onEnd();
          this.currentOptions = null;
          this.resolveCurrentSpeak = null;
          resolve();
        }
      };

      utterance.onerror = (err) => {
        console.error('Speech synthesis error:', err);
        if (this.pendingChunks.length > 0) {
          setTimeout(() => this.speakNextChunk(), 60);
        } else {
          this.isSpeaking = false;
          if (options.onError) options.onError(err);
          this.currentOptions = null;
          this.resolveCurrentSpeak = null;
          resolve();
        }
      };

      // 6. ¡REPRODUCIR! - Esto DEBE ser síncrono, directo en el click handler
      this.isSpeaking = true;
      this.synth.speak(utterance);
    });
  }

  public stopSpeaking() {
    this.pendingChunks = [];
    if (this.currentOptions?.onEnd) {
      this.currentOptions.onEnd();
    }
    this.currentOptions = null;
    if (this.resolveCurrentSpeak) {
      this.resolveCurrentSpeak();
      this.resolveCurrentSpeak = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
  }

  /**
   * Inicia la escucha por micrófono del usuario para transcribir su voz a texto.
   */
  public startListening(callbacks: {
    onInterimResult?: (transcript: string) => void;
    onFinalResult: (transcript: string) => void;
    onError?: (error: string) => void;
    onEnd?: () => void;
  }): boolean {
    if (!this.recognition) {
      if (callbacks.onError) {
        callbacks.onError('El reconocimiento de voz no está soportado en este navegador. Por favor usa Chrome, Edge o Safari.');
      }
      return false;
    }

    if (this.isRecognizing) {
      this.stopListening();
    }

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalTranscript += item[0].transcript;
        } else {
          interimTranscript += item[0].transcript;
        }
      }

      if (interimTranscript && callbacks.onInterimResult) {
        callbacks.onInterimResult(interimTranscript);
      }

      if (finalTranscript) {
        callbacks.onFinalResult(finalTranscript.trim());
      }
    };

    this.recognition.onerror = (event: any) => {
      console.warn('Speech recognition event error:', event.error);
      if (callbacks.onError) {
        callbacks.onError(event.error === 'not-allowed' ? 'Permiso de micrófono denegado' : event.error);
      }
      this.isRecognizing = false;
    };

    this.recognition.onend = () => {
      this.isRecognizing = false;
      if (callbacks.onEnd) {
        callbacks.onEnd();
      }
    };

    try {
      this.recognition.start();
      this.isRecognizing = true;
      return true;
    } catch (e) {
      console.error('Failed to start recognition:', e);
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignored
      }
      this.isRecognizing = false;
    }
  }
}

export const speechService = new SpeechService();
