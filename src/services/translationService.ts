// Servicio de Traducción Contextual e Instantánea con Anclajes PNL
// Soporta diccionario rico A2-C1, traducción de términos, colocaciones y oraciones completas.

export interface WordTranslation {
  word: string;
  spanish: string;
  phonetic: string;
  pos: 'sustantivo' | 'verbo' | 'adjetivo' | 'adverbio' | 'frase' | 'conector' | 'preposición';
  pnlAnchor: string; // Mnemotecnia visual y sensorial para memorizar rápido
  exampleEn: string;
  exampleEs: string;
}

// Diccionario integrado enriquecido con PNL para aprendizaje acelerado
const BILINGUAL_DICTIONARY: Record<string, WordTranslation> = {
  // A2 - Esenciales cotidianos
  'order': {
    word: 'order',
    spanish: 'pedir / ordenar / pedido',
    phonetic: '/ˈɔːr.dər/',
    pos: 'verbo',
    pnlAnchor: 'Imagina poner cada cosa en "orden" antes de pedirla al camarero.',
    exampleEn: 'Can I order a coffee, please?',
    exampleEs: '¿Puedo pedir un café, por favor?'
  },
  'coffee': {
    word: 'coffee',
    spanish: 'café',
    phonetic: '/ˈkɒf.i/',
    pos: 'sustantivo',
    pnlAnchor: 'Siente el aroma caliente de tu taza de café por la mañana.',
    exampleEn: 'I need a hot coffee.',
    exampleEs: 'Necesito un café caliente.'
  },
  'croissant': {
    word: 'croissant',
    spanish: 'cruasán / medialuna',
    phonetic: '/kwæˈsɒ̃/',
    pos: 'sustantivo',
    pnlAnchor: 'Visualiza la media luna dorada y crujiente.',
    exampleEn: 'A warm croissant, please.',
    exampleEs: 'Un cruasán caliente, por favor.'
  },
  'bill': {
    word: 'bill',
    spanish: 'la cuenta / factura',
    phonetic: '/bɪl/',
    pos: 'sustantivo',
    pnlAnchor: 'Asocia el billete (bill) con el papel que te entrega el camarero.',
    exampleEn: 'Could we have the bill?',
    exampleEs: '¿Podríamos tener la cuenta?'
  },
  'here': {
    word: 'here',
    spanish: 'aquí / acá',
    phonetic: '/hɪər/',
    pos: 'adverbio',
    pnlAnchor: 'Señala el suelo con tu dedo: ¡Justo aquí!',
    exampleEn: 'For here or to go?',
    exampleEs: '¿Para tomar aquí o para llevar?'
  },
  'straight': {
    word: 'straight',
    spanish: 'recto / derecho',
    phonetic: '/streɪt/',
    pos: 'adverbio',
    pnlAnchor: 'Imagina una flecha recta disparada hacia adelante sin desviarse.',
    exampleEn: 'Go straight ahead for two blocks.',
    exampleEs: 'Ve todo recto por dos cuadras.'
  },
  'turn': {
    word: 'turn',
    spanish: 'girar / doblar / turno',
    phonetic: '/tɜːn/',
    pos: 'verbo',
    pnlAnchor: 'Siente cómo tu cuerpo gira a la izquierda o derecha en una esquina.',
    exampleEn: 'Turn left at the traffic light.',
    exampleEs: 'Gira a la izquierda en el semáforo.'
  },
  'routine': {
    word: 'routine',
    spanish: 'rutina',
    phonetic: '/ruːˈtiːn/',
    pos: 'sustantivo',
    pnlAnchor: 'Imagina tu reloj sonando siempre a la misma hora matutina.',
    exampleEn: 'My morning routine starts at 7 AM.',
    exampleEs: 'Mi rutina matutina empieza a las 7 AM.'
  },
  'usually': {
    word: 'usually',
    spanish: 'habitualmente / usualmente',
    phonetic: '/ˈjuː.ʒu.ə.li/',
    pos: 'adverbio',
    pnlAnchor: 'Visualiza un calendario con casi todos los días marcados.',
    exampleEn: 'I usually drink green tea.',
    exampleEs: 'Usualmente tomo té verde.'
  },
  'always': {
    word: 'always',
    spanish: 'siempre',
    phonetic: '/ˈɔːl.weɪz/',
    pos: 'adverbio',
    pnlAnchor: 'Un círculo infinito: 100% de las veces, nunca para.',
    exampleEn: 'She always arrives on time.',
    exampleEs: 'Ella siempre llega a tiempo.'
  },
  'sometimes': {
    word: 'sometimes',
    spanish: 'a veces',
    phonetic: '/ˈsʌm.taɪmz/',
    pos: 'adverbio',
    pnlAnchor: 'Un semáforo que cambia entre sí y no de vez en cuando.',
    exampleEn: 'I sometimes work from home.',
    exampleEs: 'A veces trabajo desde casa.'
  },
  'never': {
    word: 'never',
    spanish: 'nunca / jamás',
    phonetic: '/ˈnev.ər/',
    pos: 'adverbio',
    pnlAnchor: 'Una gran "X" roja que prohíbe una acción para siempre.',
    exampleEn: 'I never skip breakfast.',
    exampleEs: 'Nunca me salto el desayuno.'
  },
  'arrive': {
    word: 'arrive',
    spanish: 'llegar',
    phonetic: '/əˈraɪv/',
    pos: 'verbo',
    pnlAnchor: 'Imagina la puerta del avión abriéndose al aterrizar en tu destino.',
    exampleEn: 'The train will arrive at 6:00 PM.',
    exampleEs: 'El tren llegará a las 6:00 PM.'
  },
  'leave': {
    word: 'leave',
    spanish: 'salir / marcharse / dejar',
    phonetic: '/liːv/',
    pos: 'verbo',
    pnlAnchor: 'Imagina hojas (leaves) desprendiéndose y marchándose con el viento.',
    exampleEn: 'We leave the office at 5 PM.',
    exampleEs: 'Salimos de la oficina a las 5 PM.'
  },
  'yesterday': {
    word: 'yesterday',
    spanish: 'ayer',
    phonetic: '/ˈjes.tə.deɪ/',
    pos: 'adverbio',
    pnlAnchor: 'Mira hacia atrás sobre tu hombro izquierdo: el día que ya pasó.',
    exampleEn: 'Yesterday was a productive day.',
    exampleEs: 'Ayer fue un día productivo.'
  },
  'tomorrow': {
    word: 'tomorrow',
    spanish: 'mañana (el día siguiente)',
    phonetic: '/təˈmɒr.əʊ/',
    pos: 'adverbio',
    pnlAnchor: 'Mira hacia adelante con los brazos abiertos hacia el nuevo día.',
    exampleEn: 'See you tomorrow morning!',
    exampleEs: '¡Nos vemos mañana por la mañana!'
  },
  'schedule': {
    word: 'schedule',
    spanish: 'horario / agenda / programar',
    phonetic: '/ˈskedʒ.uːl/',
    pos: 'sustantivo',
    pnlAnchor: 'Visualiza los bloques de colores de tu calendario digital.',
    exampleEn: 'Check the flight schedule.',
    exampleEs: 'Revisa el horario del vuelo.'
  },
  'delay': {
    word: 'delay',
    spanish: 'retraso / demora / retrasar',
    phonetic: '/dɪˈleɪ/',
    pos: 'sustantivo',
    pnlAnchor: 'Un reloj de arena cuyos granos caen muy despacio.',
    exampleEn: 'Sorry for the unexpected delay.',
    exampleEs: 'Disculpas por el retraso imprevisto.'
  },
  'boarding': {
    word: 'boarding',
    spanish: 'embarque',
    phonetic: '/ˈbɔː.dɪŋ/',
    pos: 'sustantivo',
    pnlAnchor: 'Caminar por el túnel que te conecta con el avión.',
    exampleEn: 'Boarding starts at gate 14.',
    exampleEs: 'El embarque comienza en la puerta 14.'
  },
  'luggage': {
    word: 'luggage',
    spanish: 'equipaje / maletas',
    phonetic: '/ˈlʌɡ.ɪdʒ/',
    pos: 'sustantivo',
    pnlAnchor: 'La maleta rodante con ruedas que llevas en la mano.',
    exampleEn: 'Where can I claim my luggage?',
    exampleEs: '¿Dónde puedo reclamar mi equipaje?'
  },

  // B1-C1 Claves
  'unforeseen': {
    word: 'unforeseen',
    spanish: 'imprevisto / inesperado',
    phonetic: '/ˌʌn.fɔːˈsiːn/',
    pos: 'adjetivo',
    pnlAnchor: 'Un (no) + Foreseen (visto antes) = Algo que nadie vio venir.',
    exampleEn: 'Due to unforeseen issues, we stopped.',
    exampleEs: 'Debido a problemas imprevistos, nos detuvimos.'
  },
  'simultaneously': {
    word: 'simultaneously',
    spanish: 'simultáneamente / al mismo tiempo',
    phonetic: '/ˌsɪm.əlˈteɪ.ni.əs.li/',
    pos: 'adverbio',
    pnlAnchor: 'Dos manos aplaudiendo en perfecta sincronía.',
    exampleEn: 'Both screens lit up simultaneously.',
    exampleEs: 'Ambas pantallas se encendieron simultáneamente.'
  },
  'ubiquitous': {
    word: 'ubiquitous',
    spanish: 'ubicuo / presente en todas partes',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    pos: 'adjetivo',
    pnlAnchor: 'Como el aire o el wifi: mires donde mires, ahí está.',
    exampleEn: 'Smartphones are now ubiquitous.',
    exampleEs: 'Los teléfonos inteligentes están ahora en todas partes.'
  },
  'address': {
    word: 'address',
    spanish: 'abordar (un problema) / dirección',
    phonetic: '/əˈdres/',
    pos: 'verbo',
    pnlAnchor: 'Ponerle la dirección a una carta y enfrentarla directamente.',
    exampleEn: 'We must address this challenge today.',
    exampleEs: 'Debemos abordar este desafío hoy.'
  },
  'viable': {
    word: 'viable',
    spanish: 'viable / realizable',
    phonetic: '/ˈvaɪ.ə.bəl/',
    pos: 'adjetivo',
    pnlAnchor: 'Una vía abierta por donde un tren puede circular sin obstáculos.',
    exampleEn: 'We need a financially viable solution.',
    exampleEs: 'Necesitamos una solución financieramente viable.'
  }
};

// Traducciones comunes de frases y colocaciones completas
const PHRASE_TRANSLATIONS: Record<string, string> = {
  'good morning': 'buenos días',
  'good afternoon': 'buenas tardes',
  'can i help you': '¿en qué puedo ayudarle?',
  'how may i assist you': '¿cómo puedo asistirle?',
  'here you go': 'aquí tiene',
  'for here or to go': '¿para tomar aquí o para llevar?',
  'how much is it': '¿cuánto cuesta?',
  'turn left': 'gira a la izquierda',
  'turn right': 'gira a la derecha',
  'straight ahead': 'todo recto / hacia adelante',
  'excuse me': 'disculpe / perdón',
  'by the time': 'para cuando / en el momento en que',
  'as soon as': 'tan pronto como',
  'on the other hand': 'por otra parte / por otro lado',
  'in my opinion': 'en mi opinión',
  'looking forward to': 'esperando con entusiasmo',
  'take care': 'cuídate'
};

class TranslationService {
  /**
   * Limpia y normaliza una palabra quitando puntuación
   */
  public cleanWord(raw: string): string {
    return raw.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, '');
  }

  /**
   * Busca traducción individual con anclaje PNL
   */
  public lookupWord(rawWord: string): WordTranslation {
    const cleaned = this.cleanWord(rawWord);
    
    // Direct match
    if (BILINGUAL_DICTIONARY[cleaned]) {
      return BILINGUAL_DICTIONARY[cleaned];
    }

    // Stem matching
    if (cleaned.endsWith('ing') && BILINGUAL_DICTIONARY[cleaned.slice(0, -3)]) {
      const base = BILINGUAL_DICTIONARY[cleaned.slice(0, -3)];
      return {
        ...base,
        word: rawWord,
        spanish: `${base.spanish} (en progreso / gerundio)`
      };
    }

    if (cleaned.endsWith('ed') && BILINGUAL_DICTIONARY[cleaned.slice(0, -2)]) {
      const base = BILINGUAL_DICTIONARY[cleaned.slice(0, -2)];
      return {
        ...base,
        word: rawWord,
        spanish: `${base.spanish} (en pasado)`
      };
    }

    if (cleaned.endsWith('s') && BILINGUAL_DICTIONARY[cleaned.slice(0, -1)]) {
      const base = BILINGUAL_DICTIONARY[cleaned.slice(0, -1)];
      return {
        ...base,
        word: rawWord,
        spanish: `${base.spanish} (plural/3ra persona)`
      };
    }

    // Dynamic heuristic translation for common grammatical tokens
    const commonTokens: Record<string, { es: string; pos: any; pnl: string }> = {
      'the': { es: 'el / la / los / las', pos: 'adjetivo', pnl: 'El artículo que señala algo específico.' },
      'a': { es: 'un / una', pos: 'adjetivo', pnl: 'Señala un elemento único indeterminado.' },
      'an': { es: 'un / una (antes de vocal)', pos: 'adjetivo', pnl: 'Evita el choque de sonidos vocálicos.' },
      'i': { es: 'yo', pos: 'sustantivo', pnl: 'Tú mismo, el protagonista de la acción.' },
      'you': { es: 'tú / usted / ustedes', pos: 'sustantivo', pnl: 'La persona frente a ti.' },
      'he': { es: 'él', pos: 'sustantivo', pnl: 'Tercera persona masculina.' },
      'she': { es: 'ella', pos: 'sustantivo', pnl: 'Tercera persona femenina.' },
      'we': { es: 'nosotros / nosotras', pos: 'sustantivo', pnl: 'El equipo, todos juntos.' },
      'they': { es: 'ellos / ellas', pos: 'sustantivo', pnl: 'El grupo exterior de personas.' },
      'is': { es: 'es / está', pos: 'verbo', pnl: 'Estado o cualidad presente.' },
      'are': { es: 'son / están / eres', pos: 'verbo', pnl: 'Plural o segunda persona presente.' },
      'was': { es: 'era / estaba / fue', pos: 'verbo', pnl: 'Pasado singular.' },
      'were': { es: 'eran / estaban / fuimos', pos: 'verbo', pnl: 'Pasado plural.' },
      'have': { es: 'tener / haber', pos: 'verbo', pnl: 'Posesión o auxiliar del pasado.' },
      'has': { es: 'tiene / ha', pos: 'verbo', pnl: 'Posesión en 3ra persona singular.' },
      'had': { es: 'tenía / había tenido', pos: 'verbo', pnl: 'Acción anterior en el pasado.' },
      'do': { es: 'hacer (o auxiliar interrogativo)', pos: 'verbo', pnl: 'Motor de acción presente.' },
      'does': { es: 'hace (auxiliar 3ra persona)', pos: 'verbo', pnl: 'Motor de acción para él/ella.' },
      'did': { es: 'hizo (auxiliar pasado)', pos: 'verbo', pnl: 'Empuja la frase al pasado.' },
      'can': { es: 'poder / ser capaz de', pos: 'verbo', pnl: 'Habilidad o permiso.' },
      'could': { es: 'podría / pudo', pos: 'verbo', pnl: 'Posibilidad o cortesía.' },
      'will': { es: 'expresa futuro (hará)', pos: 'verbo', pnl: 'La flecha hacia el futuro.' },
      'would': { es: 'expresa condicional (haría)', pos: 'verbo', pnl: 'Escenario hipotético.' },
      'like': { es: 'gustar / como (comparación)', pos: 'verbo', pnl: 'Preferencia o similitud.' },
      'want': { es: 'querer / desear', pos: 'verbo', pnl: 'El deseo de obtener algo.' },
      'need': { es: 'necesitar', pos: 'verbo', pnl: 'Prioridad fundamental.' },
      'go': { es: 'ir', pos: 'verbo', pnl: 'Movimiento hacia un lugar.' },
      'come': { es: 'venir', pos: 'verbo', pnl: 'Movimiento hacia donde estás.' },
      'take': { es: 'tomar / llevar / tardar', pos: 'verbo', pnl: 'Agarrar con las manos o medir tiempo.' },
      'make': { es: 'hacer / fabricar / crear', pos: 'verbo', pnl: 'Construir algo tangible con las manos.' },
      'get': { es: 'conseguir / llegar / volverse', pos: 'verbo', pnl: 'El camaleón del inglés: adquirir o cambiar de estado.' },
      'at': { es: 'en (lugar exacto u hora)', pos: 'preposición', pnl: 'Un punto exacto en el mapa o reloj.' },
      'in': { es: 'en (dentro de)', pos: 'preposición', pnl: 'Estar adentro de un espacio o contenedor.' },
      'on': { es: 'en (sobre la superficie) / encendido', pos: 'preposición', pnl: 'Contacto físico sobre una mesa o pared.' },
      'for': { es: 'para / por / durante', pos: 'preposición', pnl: 'Propósito, destinatario o duración.' },
      'with': { es: 'con', pos: 'preposición', pnl: 'Compañía o herramienta.' },
      'from': { es: 'de / desde (origen)', pos: 'preposición', pnl: 'El punto de partida de donde vienes.' },
      'to': { es: 'a / hacia / para', pos: 'preposición', pnl: 'La flecha que indica destino o dirección.' },
      'about': { es: 'acerca de / sobre / aproximadamente', pos: 'preposición', pnl: 'El tema central que rodea la conversación.' },
      'because': { es: 'porque / ya que', pos: 'conector', pnl: 'El puente que explica el motivo de algo.' },
      'but': { es: 'pero / sin embargo', pos: 'conector', pnl: 'El freno que introduce un contraste.' },
      'and': { es: 'y', pos: 'conector', pnl: 'El pegamento que une dos ideas.' },
      'so': { es: 'así que / por lo tanto / tan', pos: 'conector', pnl: 'La consecuencia natural de lo que pasó.' },
      'if': { es: 'si (condicional)', pos: 'conector', pnl: 'La llave que abre una condición hipotética.' },
      'when': { es: 'cuando', pos: 'conector', pnl: 'El marcador en la línea del tiempo.' },
      'where': { es: 'dónde', pos: 'conector', pnl: 'El pin en el mapa geográfico.' },
      'how': { es: 'cómo / qué tan', pos: 'conector', pnl: 'El método o la forma de hacer las cosas.' },
      'what': { es: 'qué / cuál', pos: 'conector', pnl: 'El objeto o tema de pregunta.' },
      'who': { es: 'quién', pos: 'conector', pnl: 'La persona identificada.' },
      'why': { es: 'por qué', pos: 'conector', pnl: 'La búsqueda de la causa o razón.' }
    };

    if (commonTokens[cleaned]) {
      const match = commonTokens[cleaned];
      return {
        word: rawWord,
        spanish: match.es,
        phonetic: `/${cleaned}/`,
        pos: match.pos,
        pnlAnchor: match.pnl,
        exampleEn: `${rawWord}...`,
        exampleEs: `Significado en contexto: ${match.es}`
      };
    }

    // Default fallback translation
    return {
      word: rawWord,
      spanish: `"${cleaned}" (toca para contexto)`,
      phonetic: `/${cleaned}/`,
      pos: 'frase',
      pnlAnchor: 'Conecta esta palabra con su contexto en la frase.',
      exampleEn: rawWord,
      exampleEs: `Traducción sugerida: ${cleaned}`
    };
  }

  /**
   * Traduce una frase o expresión idiomática si coincide
   */
  public lookupPhrase(phrase: string): string | null {
    const normalized = phrase.toLowerCase().trim();
    return PHRASE_TRANSLATIONS[normalized] || null;
  }
}

export const translationService = new TranslationService();
