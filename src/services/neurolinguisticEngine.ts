// Motor Neurolingüístico (PNL) para Aprendizaje Acelerado del Inglés
// Aplica: Sistema VAK (Visual, Auditivo, Kinestésico), Neuro-Chunking, Shadowing y Anclajes Positivos.

export interface NeuroChunk {
  id: string;
  pattern: string; // e.g. "I would like to + [verb]"
  meaning: string;
  category: 'cortesía' | 'opinión' | 'tiempo' | 'pregunta' | 'conexión' | 'emoción';
  exampleEn: string;
  exampleEs: string;
  vakVisual: string; // Estímulo visual/color
  pnlMnemonic: string; // Anclaje mental
}

export interface ShadowingExercise {
  id: string;
  title: string;
  sentence: string;
  spanish: string;
  rhythmSegments: string[]; // Rhythmic breakdown for mirroring
  accent: 'US' | 'UK';
  difficulty: 'A2' | 'B1' | 'B2' | 'C1';
}

class NeurolinguisticEngine {
  // Micro-afirmaciones para reducir el filtro afectivo (miedo a equivocarse)
  private neuroAffirmations = [
    '🧠 Tu cerebro crea nuevas sinapsis neuronales con cada repetición auditiva.',
    '✨ Los errores no son fallos: son datos de calibración para tu corteza cerebral.',
    '👂 Al escuchar a velocidad lenta, tus neuronas espejo fijan los fonemas del inglés de forma natural.',
    '🚀 No traduzcas palabra por palabra: absorbe la idea completa en bloques (Chunks).',
    '🎯 La respiración pausada relaja tu aparato fonador para una pronunciación fluida.',
    '🌟 Estudiar de forma multisensorial (ver, oír, tocar) acelera tu retención un 300%.'
  ];

  // Chunks neuronales de alta frecuencia
  private formulaicChunks: NeuroChunk[] = [
    {
      id: 'chunk-1',
      pattern: 'Could I have + [objeto]?',
      meaning: '¿Me da / podría darme [algo]?',
      category: 'cortesía',
      exampleEn: 'Could I have a glass of water, please?',
      exampleEs: '¿Podría darme un vaso de agua, por favor?',
      vakVisual: 'Azul Calma (Fórmula de Cortesía Automática)',
      pnlMnemonic: 'Úsalo siempre en restaurantes y tiendas: nunca falla y suena 100% nativo.'
    },
    {
      id: 'chunk-2',
      pattern: 'I am looking forward to + [verbo-ing / sustantivo]',
      meaning: 'Espero con muchas ganas / entusiasmo...',
      category: 'emoción',
      exampleEn: 'I am looking forward to seeing you tomorrow.',
      exampleEs: 'Espero con muchas ganas verte mañana.',
      vakVisual: 'Verde Esperanza (Mirada hacia el futuro positivo)',
      pnlMnemonic: 'Visualiza mirar al horizonte con una sonrisa antes de que llegue algo bueno.'
    },
    {
      id: 'chunk-3',
      pattern: 'How long does it take to + [verbo]?',
      meaning: '¿Cuánto tiempo se tarda en [hacer algo]?',
      category: 'tiempo',
      exampleEn: 'How long does it take to get to the airport?',
      exampleEs: '¿Cuánto tiempo se tarda en llegar al aeropuerto?',
      vakVisual: 'Naranja Alerta (Medición de Tiempo)',
      pnlMnemonic: 'Asocia "How long" con la longitud de una cinta métrica en el reloj.'
    },
    {
      id: 'chunk-4',
      pattern: 'As far as I know...',
      meaning: 'Hasta donde yo sé / que yo sepa...',
      category: 'opinión',
      exampleEn: 'As far as I know, the meeting is at 3 PM.',
      exampleEs: 'Hasta donde yo sé, la reunión es a las 3 PM.',
      vakVisual: 'Púrpura Reflexivo (Certeza Moderada)',
      pnlMnemonic: 'Señala hacia la distancia con la mano para expresar el alcance de tu conocimiento.'
    },
    {
      id: 'chunk-5',
      pattern: 'It turns out that + [frase]',
      meaning: 'Resulta que / al final resultó que...',
      category: 'conexión',
      exampleEn: 'It turns out that we were in the same flight!',
      exampleEs: '¡Resulta que estábamos en el mismo vuelo!',
      vakVisual: 'Amarillo Revelación (Giro inesperado)',
      pnlMnemonic: 'Imagina girar una carta sobre la mesa para descubrir una sorpresa.'
    }
  ];

  // Ejercicios de Shadowing Guiado
  private shadowingExercises: ShadowingExercise[] = [
    {
      id: 'shad-1',
      title: 'Rutina y Café en la Mañana (A2)',
      sentence: 'I would like a regular cappuccino for here, please.',
      spanish: 'Me gustaría un capuchino normal para tomar aquí, por favor.',
      rhythmSegments: ['I would like', 'a regular cappuccino', 'for here, please.'],
      accent: 'US',
      difficulty: 'A2'
    },
    {
      id: 'shad-2',
      title: 'Preguntando en el Aeropuerto (A2)',
      sentence: 'Excuse me, could you tell me which gate is for flight 302?',
      spanish: 'Disculpe, ¿podría decirme qué puerta es para el vuelo 302?',
      rhythmSegments: ['Excuse me,', 'could you tell me', 'which gate is', 'for flight 302?'],
      accent: 'UK',
      difficulty: 'A2'
    },
    {
      id: 'shad-3',
      title: 'Narrando una Experiencia Pasada (B1)',
      sentence: 'When I arrived at the hotel, they had already prepared my room.',
      spanish: 'Cuando llegué al hotel, ya habían preparado mi habitación.',
      rhythmSegments: ['When I arrived at the hotel,', 'they had already prepared', 'my room.'],
      accent: 'US',
      difficulty: 'B1'
    }
  ];

  /**
   * Obtiene una afirmación neuro-positiva aleatoria
   */
  public getRandomAffirmation(): string {
    const idx = Math.floor(Math.random() * this.neuroAffirmations.length);
    return this.neuroAffirmations[idx];
  }

  /**
   * Obtiene todos los chunks neuronales
   */
  public getFormulaicChunks(): NeuroChunk[] {
    return this.formulaicChunks;
  }

  /**
   * Obtiene ejercicios de Shadowing
   */
  public getShadowingExercises(): ShadowingExercise[] {
    return this.shadowingExercises;
  }
}

export const neurolinguisticEngine = new NeurolinguisticEngine();
