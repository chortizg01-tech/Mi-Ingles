// Servicio de Voz: Speech-to-Text (STT) y Text-to-Speech (TTS)
// Corregido para bugs de Chrome/Edge con SpeechSynthesis

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
  private voicesReady: Promise<void>;
  private isSpeaking: boolean = false;
  private audioUnlocked: boolean = false;
  private currentChainAbort: AbortController | null = null;

  constructor() {
    let resolveVoices: () => void;
    this.voicesReady = new Promise((resolve) => {
      resolveVoices = resolve;
    });

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

        // Cargar voces con múltiples intentos (bug de Chrome: getVoices() retorna [] la primera vez)
        const tryLoadVoices = () => {
          if (!this.synth) return;
          const available = this.synth.getVoices();
          if (available.length > 0) {
            this.voices = available.filter(v => v.lang.startsWith('en'));
            resolveVoices!();
          }
        };

        tryLoadVoices();

        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => {
            tryLoadVoices();
          };
        }

        // Fallback: reintentar carga de voces con timeout progresivo
        const retryLoadVoices = (attempt: number) => {
          if (this.voices.length > 0 || attempt > 10) {
            if (this.voices.length === 0) resolveVoices!(); // Resolver igualmente para no bloquear
            return;
          }
          setTimeout(() => {
            tryLoadVoices();
            retryLoadVoices(attempt + 1);
          }, attempt * 100); // 100ms, 200ms, 300ms...
        };
        retryLoadVoices(1);

        // Chrome bug fix: mantener el synth "vivo" con un resume periódico
        // Chrome pausa la síntesis internamente después de ~15 segundos
        this.startChromeWorkaround();

      } else {
        resolveVoices!();
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

      // Desbloquear audio con el primer gesto del usuario
      this.setupAudioUnlock();
    } else {
      resolveVoices!();
    }
  }

  /**
   * Chrome tiene un bug donde pausa internamente la síntesis de voz 
   * después de ~15 segundos. Este workaround llama a resume() periódicamente
   * mientras hay audio reproduciéndose.
   */
  private startChromeWorkaround() {
    if (typeof window === 'undefined' || !this.synth) return;

    setInterval(() => {
      if (this.synth && this.isSpeaking) {
        // Chrome bug: la síntesis se pausa silenciosamente
        // Llamar a resume() la reactiva
        this.synth.resume();
      }
    }, 5000); // Cada 5 segundos
  }

  /**
   * Algunos navegadores requieren que la primera interacción con
   * SpeechSynthesis sea dentro de un gesto del usuario.
   * Este método reproduce un utterance silencioso al primer click/touch.
   */
  private setupAudioUnlock() {
    const unlock = () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      if (this.synth) {
        // Utterance vacío para "desbloquear" el contexto de audio
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        this.synth.speak(silentUtterance);
      }

      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
    };

    document.addEventListener('click', unlock, { once: false });
    document.addEventListener('touchstart', unlock, { once: false });
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
   * Selecciona la mejor voz disponible para el acento solicitado.
   */
  private selectVoice(accent: 'US' | 'UK' | undefined): SpeechSynthesisVoice | null {
    const targetLang = accent === 'UK' ? 'en-GB' : 'en-US';

    // Intentar cargar voces una vez más si están vacías
    if (this.voices.length === 0 && this.synth) {
      const available = this.synth.getVoices();
      this.voices = available.filter(v => v.lang.startsWith('en'));
    }

    return (
      this.voices.find(v => v.lang === targetLang) ||
      this.voices.find(v => v.lang.startsWith('en')) ||
      null
    );
  }

  /**
   * Divide texto largo en chunks por oraciones para evitar el bug de Chrome
   * donde utterances de más de ~15 segundos se cortan silenciosamente.
   */
  private splitTextIntoChunks(text: string): string[] {
    // Si el texto es corto, no dividir
    if (text.length <= 200) return [text];

    // Dividir por oraciones (punto, signo de interrogación, signo de exclamación)
    const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];

    // Agrupar oraciones en chunks de ~180 caracteres máximo
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
   * Pronuncia un texto en inglés usando síntesis de voz natural a velocidad graduable.
   * Corregido para funcionar en Chrome, Edge, Safari y Firefox.
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
    return new Promise(async (resolve) => {
      if (!this.synth) {
        console.warn('SpeechSynthesis is not supported in this browser.');
        if (options.onEnd) options.onEnd();
        resolve();
        return;
      }

      // Abortar cualquier cadena de chunks anterior
      if (this.currentChainAbort) {
        this.currentChainAbort.abort();
      }
      const abortController = new AbortController();
      this.currentChainAbort = abortController;

      // 1. Cancelar cualquier audio previo
      this.synth.cancel();
      this.isSpeaking = false;

      // 2. Esperar un breve momento después de cancel() para evitar el bug de Chrome
      //    donde cancel() seguido inmediatamente por speak() causa que el audio no suene
      await new Promise(r => setTimeout(r, 100));

      // Verificar si se abortó durante la espera
      if (abortController.signal.aborted) {
        if (options.onEnd) options.onEnd();
        resolve();
        return;
      }

      // 3. Esperar a que las voces estén disponibles (con timeout de 1s)
      await Promise.race([
        this.voicesReady,
        new Promise<void>(r => setTimeout(r, 1000))
      ]);

      if (abortController.signal.aborted) {
        if (options.onEnd) options.onEnd();
        resolve();
        return;
      }

      // 4. Dividir texto largo en chunks para evitar cortes silenciosos de Chrome
      const chunks = this.splitTextIntoChunks(text);
      const targetLang = options.accent === 'UK' ? 'en-GB' : 'en-US';
      const selectedVoice = this.selectVoice(options.accent);
      const rate = options.rate !== undefined ? options.rate : this.playbackRate;

      // 5. Reproducir cada chunk secuencialmente
      const speakChunk = (index: number) => {
        if (abortController.signal.aborted) {
          this.isSpeaking = false;
          if (options.onEnd) options.onEnd();
          resolve();
          return;
        }

        if (index >= chunks.length) {
          this.isSpeaking = false;
          if (options.onEnd) options.onEnd();
          resolve();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        utterance.rate = rate;
        utterance.pitch = options.pitch || 1.0;
        utterance.lang = targetLang;

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.onend = () => {
          // Pequeña pausa entre chunks para naturalidad
          if (index + 1 < chunks.length) {
            setTimeout(() => speakChunk(index + 1), 80);
          } else {
            this.isSpeaking = false;
            if (options.onEnd) options.onEnd();
            resolve();
          }
        };

        utterance.onerror = (err) => {
          console.error('Speech synthesis error on chunk', index, ':', err);
          // Intentar continuar con el siguiente chunk en vez de abortar todo
          if (index + 1 < chunks.length) {
            setTimeout(() => speakChunk(index + 1), 80);
          } else {
            this.isSpeaking = false;
            if (options.onError) options.onError(err);
            resolve();
          }
        };

        this.isSpeaking = true;
        this.synth!.speak(utterance);
      };

      speakChunk(0);
    });
  }

  public stopSpeaking() {
    if (this.currentChainAbort) {
      this.currentChainAbort.abort();
      this.currentChainAbort = null;
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
