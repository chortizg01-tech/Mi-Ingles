// Servicio de Voz: Speech-to-Text (STT) y Text-to-Speech (TTS)

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
  private playbackRate: number = 0.85; // Calibrado para aprendizaje claro sin frustración

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

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mi_ingles_speech_rate', rate.toString());
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices().filter(v => v.lang.startsWith('en'));
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
   * Pronuncia un texto en inglés usando síntesis de voz natural a velocidad graduable.
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
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        console.warn('SpeechSynthesis is not supported in this browser.');
        if (options.onEnd) options.onEnd();
        resolve();
        return;
      }

      this.synth.cancel(); // Stop any pending audio

      const utterance = new SpeechSynthesisUtterance(text);
      // Usar la velocidad especificada o la velocidad global graduada por el usuario (default: 0.85x)
      utterance.rate = options.rate !== undefined ? options.rate : this.playbackRate;
      utterance.pitch = options.pitch || 1.0;

      // Select matching voice
      const targetLang = options.accent === 'UK' ? 'en-GB' : 'en-US';
      const selectedVoice =
        this.voices.find(v => v.lang === targetLang) ||
        this.voices.find(v => v.lang.startsWith('en')) ||
        null;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = targetLang;

      utterance.onend = () => {
        if (options.onEnd) options.onEnd();
        resolve();
      };

      utterance.onerror = (err) => {
        console.error('Speech synthesis error:', err);
        if (options.onError) options.onError(err);
        resolve(); // Avoid blocking
      };

      this.synth.speak(utterance);
    });
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
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
