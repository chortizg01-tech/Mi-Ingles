import { Unit, SpeakingScenario, WritingSubmission } from '../types';

export const CURRICULUM_UNITS: Unit[] = [
  // ==========================================
  // LEVEL A2.1: Everyday Routines, Clear Sentences & Essential Needs
  // ==========================================
  {
    id: 'unit-a2-1',
    level: 'A2.1',
    number: 1,
    title: 'Rutinas Diarias y Comunicación Cotidiana',
    description: 'Estructura oraciones en presente, aprende a pedir con cortesía en cafeterías y describe tu día sin miedo.',
    badgeIcon: 'Coffee',
    lessons: [
      {
        id: 'lesson-a2-1-1',
        unitId: 'unit-a2-1',
        level: 'A2.1',
        title: 'Present Simple vs. Present Continuous & Adverbios de Frecuencia',
        subtitle: 'Distingue entre tus hábitos constantes y lo que está ocurriendo ahora mismo.',
        durationMinutes: 20,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'Presente Simple vs. Presente Continuo',
          rules: [
            'Present Simple: Úsalo para rutinas, hábitos y verdades permanentes (ej: "I work from home every Monday").',
            'Present Continuous (am/is/are + verb-ing): Úsalo para acciones que suceden exactamente ahora (ej: "I am studying English right now").',
            'Adverbios de frecuencia: always (100%), usually (80%), sometimes (50%), never (0%). Se colocan antes del verbo principal (ej: "I always drink coffee").'
          ],
          neuroChunks: [
            { chunk: 'I usually + [verb]', meaning: 'Normalmente hago...', pnlVisual: 'Azul Hábito' },
            { chunk: 'Right now I am + [verb-ing]', meaning: 'Justo ahora estoy haciendo...', pnlVisual: 'Verde Presente Activo' },
            { chunk: 'Do you want to + [verb]?', meaning: '¿Quieres [hacer algo]?', pnlVisual: 'Amarillo Invitación' }
          ],
          examples: [
            { en: 'I usually drink green tea in the morning, but today I am drinking black coffee.', es: 'Usualmente tomo té verde por la mañana, pero hoy estoy tomando café negro.' },
            { en: 'She works at a technology company, and she is currently leading a new project.', es: 'Ella trabaja en una empresa de tecnología y actualmente está liderando un nuevo proyecto.' }
          ],
          commonMistakes: [
            'No olvides la "s" en tercera persona singular (he/she/it works, he goes).',
            'No digas "I am agree" ❌ -> Di "I agree" ✅.'
          ]
        },
        vocabularyItems: [
          {
            term: 'Routine',
            phonetic: '/ruːˈtiːn/',
            definition: 'A sequence of actions regularly followed',
            example: 'A healthy morning routine gives you energy.',
            spanish: 'Rutina',
            pnlAnchor: 'Imagina tu reloj despertador sonando a la misma hora matutina.'
          },
          {
            term: 'Usually',
            phonetic: '/ˈjuː.ʒu.ə.li/',
            definition: 'Under normal conditions; generally',
            example: 'I usually start work at 8:30 AM.',
            spanish: 'Usualmente / habitualmente',
            pnlAnchor: 'Visualiza un calendario con casi todos los días marcados con un visto bueno.'
          },
          {
            term: 'Order',
            phonetic: '/ˈɔːr.dər/',
            definition: 'To ask for food or drink in a restaurant or store',
            example: 'Can I order a cappuccino and a croissant?',
            spanish: 'Pedir / ordenar (en restaurante)',
            pnlAnchor: 'Imagina poner en orden lo que vas a pedir antes de que venga el camarero.'
          }
        ],
        exercises: [
          {
            id: 'ex-a2-1-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Selecciona la opción correcta para completar la oración de rutina.',
            question: 'Sarah usually _____ by subway, but today she is taking a taxi.',
            options: [
              { id: 'a', text: 'commutes' },
              { id: 'b', text: 'is commuting' },
              { id: 'c', text: 'commute' },
              { id: 'd', text: 'has commute' }
            ],
            correctAnswer: 'a',
            explanation: 'Usamos Present Simple con tercera persona (Sarah -> commutes) porque la palabra clave "usually" indica un hábito.',
            difficulty: 'A2.1',
            grammarTopic: 'Present Simple'
          },
          {
            id: 'ex-a2-1-2',
            type: 'fill_blank',
            skill: 'grammar',
            instruction: 'Completa la oración con la forma correcta de "study" para una acción que pasa ahora mismo.',
            question: 'Be quiet please! My brother is _____ (study) for his exam right now.',
            correctAnswer: 'studying',
            explanation: 'Con "right now" usamos Present Continuous: is studying.',
            difficulty: 'A2.1'
          }
        ]
      },
      {
        id: 'lesson-a2-1-2',
        unitId: 'unit-a2-1',
        level: 'A2.1',
        title: 'A Day in the Life of Alex (Remote Worker)',
        subtitle: 'Lectura guiada: vocabulario diario, horarios y comprensión directa con traducción táctil.',
        durationMinutes: 25,
        focusSkill: 'reading',
        readingPassage: {
          title: 'My Daily Routine in London',
          text: `My name is Alex and I work as a graphic designer from home. Every weekday, I wake up at 7:00 AM. First, I drink a glass of fresh water and prepare breakfast. I usually eat scrambled eggs, toast, and black coffee.
          
At 8:30 AM, I sit at my desk and check my urgent emails. At 11:00 AM, my team has a brief online video call to coordinate our design projects. During lunch, I like to take a 20-minute walk in the park near my apartment to get fresh air and relax my eyes.
          
In the afternoon, I focus on creative tasks without distractions. I finish my workday around 5:30 PM. In the evening, I often cook dinner with my partner, listen to a podcast, and read a few pages of a good book before going to sleep at 10:30 PM.`,
          spanishTranslation: `Mi nombre es Alex y trabajo como diseñador gráfico desde casa. Todos los días entre semana, me despierto a las 7:00 AM. Primero, bebo un vaso de agua fresca y preparo el desayuno. Usualmente como huevos revueltos, tostadas y café negro.

A las 8:30 AM, me siento en mi escritorio y reviso mis correos urgentes. A las 11:00 AM, mi equipo tiene una breve videollamada en línea para coordinar nuestros proyectos de diseño. Durante el almuerzo, me gusta dar una caminata de 20 minutos en el parque cerca de mi apartamento para tomar aire fresco y relajar mis ojos.

Por la tarde, me enfoco en tareas creativas sin distracciones. Termino mi jornada laboral alrededor de las 5:30 PM. Por la noche, a menudo preparo la cena con mi pareja, escucho un podcast y leo algunas páginas de un buen libro antes de ir a dormir a las 10:30 PM.`,
          wordCount: 155,
          difficulty: 'A2.1',
          pnlTip: 'Toca cualquier palabra que no conozcas para ver su traducción al español y fijarla en tu memoria visual.'
        },
        exercises: [
          {
            id: 'ex-a2-1-3',
            type: 'multiple_choice',
            skill: 'reading',
            instruction: 'Responde la pregunta basada en la lectura.',
            question: 'Why does Alex take a walk during lunch?',
            options: [
              { id: 'a', text: 'To buy groceries at the supermarket.' },
              { id: 'b', text: 'To get fresh air and relax his eyes in the park.' },
              { id: 'c', text: 'To meet his manager for coffee.' },
              { id: 'd', text: 'To catch the subway to the office.' }
            ],
            correctAnswer: 'b',
            explanation: 'El texto dice textualmente: "I like to take a 20-minute walk in the park near my apartment to get fresh air and relax my eyes".',
            difficulty: 'A2.1'
          }
        ]
      },
      {
        id: 'lesson-a2-1-3',
        unitId: 'unit-a2-1',
        level: 'A2.1',
        title: 'Ordering at a Café & Hotel Check-in',
        subtitle: 'Comprensión auditiva: fórmulas de cortesía, precios y confirmación en inglés real.',
        durationMinutes: 25,
        focusSkill: 'listening',
        listeningScript: {
          title: 'Morning Order at Greenwich Coffee Roasters',
          speakerA: 'Barista (Sam)',
          speakerB: 'Customer (Laura)',
          accent: 'US',
          fullText: `Barista: Good morning! Welcome to Greenwich Coffee. What can I get started for you today?
Laura: Hi there! Could I please have a medium iced latte with oat milk?
Barista: Sure thing! Would you like any flavor syrup in that, like vanilla or caramel?
Laura: Just a shot of sugar-free vanilla, please. And could I also get one heated almond croissant?
Barista: Absolutely. Is that for here or to go?
Laura: For here, please. How much is the total?
Barista: That comes to seven dollars and fifty cents. You can tap your card right on the terminal screen.
Laura: Perfect. Thank you so much!`,
          spanishTranslation: `Barista: ¡Buenos días! Bienvenido a Greenwich Coffee. ¿Qué puedo prepararte hoy?
Laura: ¡Hola! ¿Podría darme un latte helado mediano con leche de avena, por favor?
Barista: ¡Claro que sí! ¿Te gustaría algún sirope de sabor, como vainilla o caramelo?
Laura: Solo un toque de vainilla sin azúcar, por favor. ¿Y podría pedir también un cruasán de almendras caliente?
Barista: Por supuesto. ¿Es para tomar aquí o para llevar?
Laura: Para tomar aquí, por favor. ¿Cuánto es el total?
Barista: Serían siete dólares con cincuenta centavos. Puedes pasar tu tarjeta directamente en la pantalla del terminal.
Laura: Perfecto. ¡Muchísimas gracias!`,
          pnlFocus: 'Aprende las 3 fórmulas automáticas de cortesía: "Could I please have...", "For here or to go?", "How much is the total?".'
        },
        exercises: [
          {
            id: 'ex-a2-1-4',
            type: 'multiple_choice',
            skill: 'listening',
            instruction: 'Escucha el diálogo y selecciona la opción correcta.',
            audioText: 'Could I please have a medium iced latte with oat milk?',
            question: 'What kind of milk does Laura request for her iced latte?',
            options: [
              { id: 'a', text: 'Whole regular cow milk' },
              { id: 'b', text: 'Oat milk' },
              { id: 'c', text: 'Soy milk' },
              { id: 'd', text: 'Almond milk' }
            ],
            correctAnswer: 'b',
            explanation: 'Laura pide específicamente "oat milk" (leche de avena).',
            difficulty: 'A2.1'
          }
        ]
      }
    ]
  },

  // ==========================================
  // LEVEL A2.2: Past Experiences, Travel & Making Plans
  // ==========================================
  {
    id: 'unit-a2-2',
    level: 'A2.2',
    number: 2,
    title: 'Experiencias Pasadas, Viajes y Direcciones',
    description: 'Aprende a contar qué hiciste ayer o en tus últimas vacaciones (Past Simple) y a orientarte en una ciudad.',
    badgeIcon: 'Compass',
    lessons: [
      {
        id: 'lesson-a2-2-1',
        unitId: 'unit-a2-2',
        level: 'A2.2',
        title: 'Past Simple: Regular & Irregular Verbs in Action',
        subtitle: 'Cuenta historias pasadas sin trabarte: verbos con -ed y los irregulares más usados.',
        durationMinutes: 25,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'Dominando el Pasado Simple',
          rules: [
            'Verbos Regulares: Añade -ed (ej: work -> worked, visit -> visited, clean -> cleaned).',
            'Verbos Irregulares clave: go -> went, have -> had, see -> saw, buy -> bought, meet -> met, eat -> ate.',
            'Negación en Pasado: Sujeto + didn\'t + verbo en infinitivo (ej: "I didn\'t go to the party", NUNCA "didn\'t went").',
            'Pregunta en Pasado: Did + sujeto + verbo en infinitivo? (ej: "Did you enjoy the trip?").'
          ],
          neuroChunks: [
            { chunk: 'Yesterday I went to + [lugar]', meaning: 'Ayer fui a...', pnlVisual: 'Rojo Pasado' },
            { chunk: 'I didn\'t have time to + [verbo]', meaning: 'No tuve tiempo de...', pnlVisual: 'Azul Bloqueo' },
            { chunk: 'Did you see + [persona/cosa]?', meaning: '¿Viste a...?', pnlVisual: 'Amarillo Pregunta Pasada' }
          ],
          examples: [
            { en: 'Last weekend, we traveled to the mountains and had a wonderful picnic.', es: 'El fin de semana pasado viajamos a las montañas y tuvimos un pícnic maravilloso.' },
            { en: 'I didn\'t receive the confirmation email yesterday.', es: 'No recibí el correo de confirmación ayer.' }
          ],
          commonMistakes: [
            'Recuerda que con "didn\'t" el verbo vuelve a su forma base: "I didn\'t see" ✅, NO "I didn\'t saw" ❌.'
          ]
        },
        vocabularyItems: [
          {
            term: 'Yesterday',
            phonetic: '/ˈjes.tə.deɪ/',
            definition: 'On the day before today',
            example: 'Yesterday was a very sunny day.',
            spanish: 'Ayer',
            pnlAnchor: 'Mira hacia atrás sobre tu hombro: el día que ya quedó en el pasado.'
          },
          {
            term: 'Arrive',
            phonetic: '/əˈraɪv/',
            definition: 'Reach a destination at the end of a journey',
            example: 'We arrived at the hotel at 9:00 PM.',
            spanish: 'Llegar',
            pnlAnchor: 'Imagina la puerta abriéndose y pisando el suelo del hotel.'
          },
          {
            term: 'Straight',
            phonetic: '/streɪt/',
            definition: 'In a continuous line without turning',
            example: 'Walk straight ahead for two blocks.',
            spanish: 'Recto / derecho',
            pnlAnchor: 'Una flecha directa que no se desvía a ningún lado.'
          }
        ],
        exercises: [
          {
            id: 'ex-a2-2-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Selecciona la forma correcta del verbo en pasado irregular.',
            question: 'Last night, we _____ to a traditional Italian restaurant and ate delicious pasta.',
            options: [
              { id: 'a', text: 'went' },
              { id: 'b', text: 'goed' },
              { id: 'c', text: 'gone' },
              { id: 'd', text: 'was go' }
            ],
            correctAnswer: 'a',
            explanation: 'El pasado del verbo "go" es irregular: "went".',
            difficulty: 'A2.2'
          },
          {
            id: 'ex-a2-2-2',
            type: 'fill_blank',
            skill: 'grammar',
            instruction: 'Completa la negación en pasado simple con "not buy". Escribe: didn\'t buy',
            question: 'The flight was too expensive, so I _____ (not buy) the ticket. Type: didn\'t buy',
            correctAnswer: "didn't buy",
            explanation: 'La negación en pasado simple se forma con didn\'t + verbo base (buy).',
            difficulty: 'A2.2'
          }
        ]
      },
      {
        id: 'lesson-a2-2-2',
        unitId: 'unit-a2-2',
        level: 'A2.2',
        title: 'Airport Announcements & Flight Boarding',
        subtitle: 'Listening en contexto real: horarios de vuelo, puertas de embarque y equipaje.',
        durationMinutes: 25,
        focusSkill: 'listening',
        listeningScript: {
          title: 'Final Boarding Call at Gate 14',
          speakerA: 'Airport Announcer',
          speakerB: 'Traveler (Carlos)',
          accent: 'UK',
          fullText: `Announcer: Attention all passengers on British Airways flight BA249 to Barcelona. This is the final boarding call. All ticketed passengers should proceed immediately to Gate 14.
Carlos: Excuse me, officer! Is Gate 14 straight down this corridor?
Officer: Yes, sir. Walk straight past the duty-free shops and turn right at the information desk. Gate 14 is right at the end.
Carlos: Thank you so much! Have a great day.`,
          spanishTranslation: `Locutor: Atención a todos los pasajeros del vuelo BA249 de British Airways con destino a Barcelona. Esta es la última llamada de embarque. Todos los pasajeros con boleto deben dirigirse inmediatamente a la Puerta 14.
Carlos: ¡Disculpe, oficial! ¿La Puerta 14 queda todo recto por este pasillo?
Oficial: Sí, señor. Camine todo recto pasando las tiendas libres de impuestos y gire a la derecha en el mostrador de información. La Puerta 14 está justo al final.
Carlos: ¡Muchísimas gracias! Que tenga un excelente día.`,
          pnlFocus: 'Escucha cómo se enlazan las palabras en inglés británico: "proceed immediately", "straight down".'
        },
        exercises: [
          {
            id: 'ex-a2-2-3',
            type: 'multiple_choice',
            skill: 'listening',
            instruction: 'Escucha el anuncio y responde la pregunta.',
            audioText: 'All ticketed passengers should proceed immediately to Gate 14.',
            question: 'Which gate is announced for the flight to Barcelona?',
            options: [
              { id: 'a', text: 'Gate 4' },
              { id: 'b', text: 'Gate 14' },
              { id: 'c', text: 'Gate 40' },
              { id: 'd', text: 'Gate 24' }
            ],
            correctAnswer: 'b',
            explanation: 'El locutor indica claramente "Gate 14" (Puerta 14).',
            difficulty: 'A2.2'
          }
        ]
      }
    ]
  },

  // ==========================================
  // LEVEL B1.1: Foundations & Narrative Power
  // ==========================================
  {
    id: 'unit-b1-1',
    level: 'B1.1',
    number: 3,
    title: 'Narratives, Time & Life Events',
    description: 'Master past tenses combination, temporal markers, and conversational storytelling.',
    badgeIcon: 'Compass',
    lessons: [
      {
        id: 'lesson-b1-1-1',
        unitId: 'unit-b1-1',
        level: 'B1.1',
        title: 'Past Simple vs. Past Continuous vs. Past Perfect',
        subtitle: 'Connecting multiple past events seamlessly without losing sequence.',
        durationMinutes: 25,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'The Three Past Pillars',
          rules: [
            'Past Simple: Completed actions at a specific time in the past (e.g., "I arrived at 9:00 PM").',
            'Past Continuous: An action that was ongoing when interrupted (e.g., "I was driving when it started raining").',
            'Past Perfect (had + past participle): An action completed BEFORE another past event (e.g., "When I arrived, the train had already left").'
          ],
          examples: [
            { en: 'By the time Sarah called me, I had already finished the quarterly report.', es: 'Para cuando Sarah me llamó, yo ya había terminado el informe trimestral.' },
            { en: 'While they were discussing the budget, someone knocked on the door.', es: 'Mientras estaban debatiendo el presupuesto, alguien llamó a la puerta.' }
          ],
          commonMistakes: [
            'Avoid using Past Simple for both events when one clearly happened earlier (e.g., "When I came, they left" -> "When I arrived, they had already left").',
            'Do not use "was having" for state verbs like know, believe, or want.'
          ]
        },
        vocabularyItems: [
          { term: 'Unforeseen', phonetic: '/ˌʌn.fɔːˈsiːn/', definition: 'Not anticipated or expected beforehand', example: 'Due to unforeseen circumstances, the flight was delayed.', spanish: 'Imprevisto' },
          { term: 'Simultaneously', phonetic: '/ˌsɪm.əlˈteɪ.ni.əs.li/', definition: 'Happening at exactly the same time', example: 'Two alerts popped up simultaneously on my screen.', spanish: 'Simultáneamente' },
          { term: 'Turn out', phonetic: '/tɜːn aʊt/', definition: 'To result or be discovered in the end', example: 'The presentation turned out much better than expected.', spanish: 'Resultar / salir' }
        ],
        exercises: [
          {
            id: 'ex-b1-1-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Choose the correct form of the verb to complete the chronological sequence.',
            question: 'When Mark finally arrived at the conference hall, the keynote speaker _____ for twenty minutes.',
            options: [
              { id: 'a', text: 'was speaking' },
              { id: 'b', text: 'had already been speaking', explanation: 'Correct! Past Perfect Continuous emphasizes the duration leading up to another past moment.' },
              { id: 'c', text: 'has spoken' },
              { id: 'd', text: 'spoke' }
            ],
            correctAnswer: 'b',
            explanation: 'We use the Past Perfect form because the action began and continued before Mark\'s past arrival.',
            difficulty: 'B1.1',
            grammarTopic: 'Past Perfect'
          },
          {
            id: 'ex-b1-1-2',
            type: 'fill_blank',
            skill: 'grammar',
            instruction: 'Complete the sentence with the past perfect form of "leave".',
            question: 'By the time we got to the cinema, the movie had already _____ (leave -> started/departed). Type: left',
            correctAnswer: 'left',
            explanation: 'Past participle of leave is left.',
            difficulty: 'B1.1'
          }
        ]
      },
      {
        id: 'lesson-b1-1-2',
        unitId: 'unit-b1-1',
        level: 'B1.1',
        title: 'An Unexpected Journey in the Scottish Highlands',
        subtitle: 'Reading comprehension with descriptive vocabulary and context inference.',
        durationMinutes: 30,
        focusSkill: 'reading',
        readingPassage: {
          title: 'Lost in the Mist of Glencoe',
          text: `It was late October when Liam decided to hike the remote trails of Glencoe. The morning had begun with deceptive tranquility: crisp air, an amber sunrise, and a gentle breeze rustling through the heather. However, by mid-afternoon, dense fog rolled down the peaks, obliterating all visible landmarks. 

Liam checked his GPS, but the cold battery had suddenly drained. Realizing daylight was rapidly fading, he recalled the ranger's advice: always stick to the stream bed if disoriented. Following the babbling sound of water, he descended steadily for two hours until a distant warm light emerged through the twilight—a stone shepherd's bothy with smoke curling from the chimney.`,
          wordCount: 120,
          difficulty: 'B1.1'
        },
        exercises: [
          {
            id: 'ex-b1-1-3',
            type: 'multiple_choice',
            skill: 'reading',
            instruction: 'Select the best answer based on the reading text.',
            question: 'Why did Liam decide to follow the stream bed?',
            options: [
              { id: 'a', text: 'He wanted to drink fresh mountain water.' },
              { id: 'b', text: 'His phone told him the bothy was along the river.' },
              { id: 'c', text: 'He remembered a forest ranger\'s safety instruction for lost hikers.' },
              { id: 'd', text: 'The fog was thinner near the water.' }
            ],
            correctAnswer: 'c',
            explanation: 'The text states: "he recalled the ranger\'s advice: always stick to the stream bed if disoriented."',
            difficulty: 'B1.1'
          }
        ]
      },
      {
        id: 'lesson-b1-1-3',
        unitId: 'unit-b1-1',
        level: 'B1.1',
        title: 'Travel Mishaps & Emergency Calls',
        subtitle: 'Listening comprehension: real-time accent training and conversational clues.',
        durationMinutes: 30,
        focusSkill: 'listening',
        listeningScript: {
          title: 'Lost Luggage at Heathrow Terminal 5',
          speakerA: 'Customer Service Agent (UK)',
          speakerB: 'Traveler (David)',
          accent: 'UK',
          fullText: `Agent: Good afternoon, British Airways baggage desk, how may I assist you today?
David: Hi. I've just come off flight BA412 from Madrid, and my two checked suitcases haven't appeared on carousel 4.
Agent: I am terribly sorry to hear that, sir. Could you please hand me your passport and the baggage claim receipts attached to your boarding pass?
David: Here you go. One is a navy hard-shell Samsonite and the other is a black duffel bag with a bright yellow tag.
Agent: Thank you. Let me scan the tags in our central locator system... Right. It appears the connection in Barcelona was tight, so your bags were re-routed onto flight BA418. They will arrive here at 7:30 PM. Would you like them couriered to your hotel directly?`
        },
        exercises: [
          {
            id: 'ex-b1-1-4',
            type: 'multiple_choice',
            skill: 'listening',
            instruction: 'Listen to the conversation transcript and identify the cause of the delay.',
            audioText: 'It appears the connection in Barcelona was tight, so your bags were re-routed onto flight BA418.',
            question: 'Why were David\'s bags delayed?',
            options: [
              { id: 'a', text: 'They were stolen at the Madrid terminal.' },
              { id: 'b', text: 'The connection window during the layover in Barcelona was very short.' },
              { id: 'c', text: 'He forgot to register them at check-in.' },
              { id: 'd', text: 'The bags were placed on the wrong carousel by mistake.' }
            ],
            correctAnswer: 'b',
            explanation: 'The agent explains that the connection was "tight", meaning there wasn\'t enough time to transfer luggage.',
            difficulty: 'B1.1'
          }
        ]
      }
    ]
  },

  // ==========================================
  // LEVEL B1.2: Fluency, Modals & Work Dynamics
  // ==========================================
  {
    id: 'unit-b1-2',
    level: 'B1.2',
    number: 2,
    title: 'Workplace Interactions & Future Projections',
    description: 'Master modal verbs of deduction, conditional structures, and professional negotiations.',
    badgeIcon: 'Briefcase',
    lessons: [
      {
        id: 'lesson-b1-2-1',
        unitId: 'unit-b1-2',
        level: 'B1.2',
        title: 'Modals of Deduction (Must, Can\'t, Might, Should)',
        subtitle: 'Speculating with precision about present and past scenarios.',
        durationMinutes: 25,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'Expressing Certainty vs Probability',
          rules: [
            'Must be: 95%+ sure it is true based on evidence (e.g. "Her car is parked outside; she must be in her office").',
            'Can\'t be / Couldn\'t be: 95%+ sure it is impossible (e.g. "He only left 2 minutes ago; he can\'t be at home yet").',
            'Might / May / Could: 50% possibility (e.g. "The client might ask for a discount during the meeting").',
            'Past Deduction: Modal + have + past participle (e.g. "They must have sent the invoice yesterday").'
          ],
          examples: [
            { en: 'You haven’t eaten all day; you must be starving!', es: 'No has comido en todo el día; ¡debes estar hambriento!' },
            { en: 'That email can’t have come from the CEO; the spelling is full of typos.', es: 'Ese correo no puede haber venido del CEO; está lleno de faltas de ortografía.' }
          ],
          commonMistakes: [
            'Never say "mustn\'t be" when you mean "cannot be" for impossibility.',
            'Remember that "could have" implies it was possible in the past, but didn\'t necessarily happen.'
          ]
        },
        exercises: [
          {
            id: 'ex-b1-2-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Choose the most appropriate modal of deduction.',
            question: 'Look at the lights off and the closed gate. The store _____ closed already.',
            options: [
              { id: 'a', text: 'must be' },
              { id: 'b', text: 'should to be' },
              { id: 'c', text: 'can be' },
              { id: 'd', text: 'might not be' }
            ],
            correctAnswer: 'a',
            explanation: '"Must be" expresses strong certainty based on physical evidence (dark lights, locked gate).',
            difficulty: 'B1.2'
          }
        ]
      },
      {
        id: 'lesson-b1-2-2',
        unitId: 'unit-b1-2',
        level: 'B1.2',
        title: 'Second vs. Third Conditionals',
        subtitle: 'Hypothetical present situations vs. Past regrets and alternate realities.',
        durationMinutes: 30,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'Conditionals in Action',
          rules: [
            'Second Conditional (Hypothetical Present/Future): If + Past Simple, would + base verb ("If I had more time, I would learn German").',
            'Third Conditional (Unchangeable Past): If + Past Perfect, would have + past participle ("If we had left earlier, we wouldn\'t have missed the flight").'
          ],
          examples: [
            { en: 'If the team had tested the software thoroughly, the bug wouldn\'t have reached production.', es: 'Si el equipo hubiera probado el software a fondo, el error no habría llegado a producción.' }
          ],
          commonMistakes: [
            'Never put "would" inside the "if" clause (e.g. avoid "If I would have known").'
          ]
        },
        exercises: [
          {
            id: 'ex-b1-2-2',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Select the grammatically correct conditional sentence.',
            question: 'If they _____ the contract last week, we would be working on the project right now.',
            options: [
              { id: 'a', text: 'had signed' },
              { id: 'b', text: 'signed' },
              { id: 'c', text: 'would sign' },
              { id: 'd', text: 'have signed' }
            ],
            correctAnswer: 'a',
            explanation: 'This is a mixed conditional: past action (had signed) having a direct result in the present (would be working).',
            difficulty: 'B1.2'
          }
        ]
      }
    ]
  },

  // ==========================================
  // LEVEL B2.1: Nuance, Idioms & Debate
  // ==========================================
  {
    id: 'unit-b2-1',
    level: 'B2.1',
    number: 3,
    title: 'Professional Nuance & Persuasive Discourse',
    description: 'Master advanced linkers, passive reporting verbs, and professional idioms.',
    badgeIcon: 'Sparkles',
    lessons: [
      {
        id: 'lesson-b2-1-1',
        unitId: 'unit-b2-1',
        level: 'B2.1',
        title: 'Passive Reporting Verbs (It is claimed / He is alleged to...)',
        subtitle: 'Formal objectivity used in journalism, reports, and executive summaries.',
        durationMinutes: 30,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'Distancing Language & Formal Reporting',
          rules: [
            'Pattern 1: It + passive verb + that clause (e.g., "It is widely believed that renewable energy will dominate by 2040").',
            'Pattern 2: Subject + passive verb + to-infinitive (e.g., "The company is said to be negotiating a multi-million merger").'
          ],
          examples: [
            { en: 'The new CEO is presumed to have restructured the entire sales department.', es: 'Se presume que el nuevo CEO ha reestructurado todo el departamento de ventas.' }
          ],
          commonMistakes: [
            'Don\'t forget the to-infinitive with Pattern 2 (e.g. "He is said to be", NOT "He is said that he is").'
          ]
        },
        vocabularyItems: [
          { term: 'Serendipitous', phonetic: '/ˌser.ənˈdɪp.ɪ.təs/', definition: 'Occurring or discovered by chance in a beneficial way', example: 'Our meeting at the airport was entirely serendipitous.', spanish: 'Fortuito / providencial' },
          { term: 'Unprecedented', phonetic: '/ʌnˈpres.ɪ.den.tɪd/', definition: 'Never done or known before', example: 'The tech sector is experiencing unprecedented growth.', spanish: 'Sin precedentes' },
          { term: 'Viable', phonetic: '/ˈvaɪ.ə.bəl/', definition: 'Capable of working successfully; feasible', example: 'We need a financially viable business model.', spanish: 'Viable' }
        ],
        exercises: [
          {
            id: 'ex-b2-1-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Transform into formal passive reporting.',
            question: 'People believe that the economy will recover in the third quarter.',
            options: [
              { id: 'a', text: 'The economy is believed to recover in the third quarter.' },
              { id: 'b', text: 'The economy is believed recovering in the third quarter.' },
              { id: 'c', text: 'It is believe that the economy recovers in the third quarter.' },
              { id: 'd', text: 'The economy believes to recover in the third quarter.' }
            ],
            correctAnswer: 'a',
            explanation: 'Subject + is believed + to-infinitive is the standard formal reporting construction.',
            difficulty: 'B2.1'
          }
        ]
      }
    ]
  },

  // ==========================================
  // LEVEL B2.2: Precision & Inversion
  // ==========================================
  {
    id: 'unit-b2-2',
    level: 'B2.2',
    number: 4,
    title: 'Advanced Inversion & Rhetorical Emphasis',
    description: 'Enhance your style with negative adverbial inversion and cleft sentences.',
    badgeIcon: 'Zap',
    lessons: [
      {
        id: 'lesson-b2-2-1',
        unitId: 'unit-b2-2',
        level: 'B2.2',
        title: 'Negative Adverbial Inversion (Rarely, Seldom, Not only)',
        subtitle: 'Creating dramatic, highly sophisticated sentence structure.',
        durationMinutes: 35,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'The Art of Inversion',
          rules: [
            'When negative or restrictive adverbs start a sentence, invert the auxiliary verb and subject just like a question.',
            'Key triggers: Rarely, Seldom, Barely... when, No sooner... than, Under no circumstances, Not only... but also.',
            'Formula: Negative Adverb + Auxiliary Verb + Subject + Main Verb.'
          ],
          examples: [
            { en: 'Rarely have I witnessed such dedication from a project team.', es: 'Raras veces he presenciado tanta dedicación de un equipo de proyecto.' },
            { en: 'Not only did they exceed their sales target, but they also expanded into two new markets.', es: 'No solo superaron su objetivo de ventas, sino que también se expandieron a dos nuevos mercados.' },
            { en: 'Under no circumstances should confidential files be shared externally.', es: 'Bajo ninguna circunstancia se deben compartir archivos confidenciales externamente.' }
          ],
          commonMistakes: [
            'Forgetting the auxiliary verb: "Rarely I have seen" ❌ -> "Rarely have I seen" ✅',
            'Using standard word order after "Not only did...": "Not only did he arrive" ✅, NOT "Not only he arrived" ❌'
          ]
        },
        exercises: [
          {
            id: 'ex-b2-2-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Select the inverted sentence with correct auxiliary placement.',
            question: 'Under no circumstances _____ the building without notifying security.',
            options: [
              { id: 'a', text: 'employees should leave' },
              { id: 'b', text: 'should employees leave' },
              { id: 'c', text: 'employees shall leaving' },
              { id: 'd', text: 'leave should employees' }
            ],
            correctAnswer: 'b',
            explanation: 'After "Under no circumstances", auxiliary "should" precedes the subject "employees".',
            difficulty: 'B2.2'
          }
        ]
      }
    ]
  },

  // ==========================================
  // LEVEL C1.1 & C1.2: Native Elegance & C1 Mastery
  // ==========================================
  {
    id: 'unit-c1-1',
    level: 'C1.1',
    number: 5,
    title: 'Cleft Sentences & Advanced Pragmatics',
    description: 'Focusing information with precision, sophisticated collocations, and idiomatic command.',
    badgeIcon: 'Award',
    lessons: [
      {
        id: 'lesson-c1-1-1',
        unitId: 'unit-c1-1',
        level: 'C1.1',
        title: 'Cleft Sentences (What strikes me is... / It was only when...)',
        subtitle: 'Shifting rhetorical focus for persuasive speech and executive writing.',
        durationMinutes: 35,
        focusSkill: 'grammar',
        grammarNote: {
          title: 'Mastering Cleft Structures for Maximum Impact',
          rules: [
            'Wh- Clefts: "What we need to address first is the retention rate."',
            'It- Clefts: "It was Helen who orchestrated the entire strategy."',
            'All- Clefts: "All they wanted was a fair assessment of their proposal."'
          ],
          examples: [
            { en: 'What really surprised the board was the sheer speed of user adoption.', es: 'Lo que realmente sorprendió a la junta directiva fue la pura velocidad de adopción de los usuarios.' },
            { en: 'It was only after the audit that the financial discrepancies came to light.', es: 'Fue solo después de la auditoría que salieron a la luz las discrepancias financieras.' }
          ],
          commonMistakes: [
            'Mismatching the verb tense inside the cleft clause with the main clause.'
          ]
        },
        vocabularyItems: [
          { term: 'Ubiquitous', phonetic: '/juːˈbɪk.wɪ.təs/', definition: 'Present, appearing, or found everywhere', example: 'Smartphones have become ubiquitous across the globe.', spanish: 'Ubicuo / omnipresente' },
          { term: 'Juxtaposition', phonetic: '/ˌdʒʌk.stə.pəˈzɪʃ.ən/', definition: 'Placing two things close together with contrasting effect', example: 'The juxtaposition of ancient stone and modern glass created a striking visual.', spanish: 'Yuxtaposición' },
          { term: 'Tenacious', phonetic: '/təˈneɪ.ʃəs/', definition: 'Tending to keep a firm hold of something; persistent', example: 'Her tenacious pursuit of accuracy earned her the award.', spanish: 'Tenaz / perseverante' }
        ],
        exercises: [
          {
            id: 'ex-c1-1-1',
            type: 'multiple_choice',
            skill: 'grammar',
            instruction: 'Choose the most natural C1 cleft sentence to emphasize the financial aspect.',
            question: 'Original: "The lack of initial funding slowed our research."',
            options: [
              { id: 'a', text: 'What slowed our research was the lack of initial funding.' },
              { id: 'b', text: 'The thing why research slowed was funding lack.' },
              { id: 'c', text: 'It was our research that slowed the funding lack.' },
              { id: 'd', text: 'Which slowed our research is no initial funds.' }
            ],
            correctAnswer: 'a',
            explanation: '"What slowed our research was..." is a textbook wh-cleft sentence with natural native emphasis.',
            difficulty: 'C1.1'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-c1-2',
    level: 'C1.2',
    number: 6,
    title: 'Academic, Executive & Nuanced Discourse',
    description: 'High-level synthesis, idiomatic nuance, subtext comprehension, and effortless fluency.',
    badgeIcon: 'Crown',
    lessons: [
      {
        id: 'lesson-c1-2-1',
        unitId: 'unit-c1-2',
        level: 'C1.2',
        title: 'Subtext, Hedging & Nuanced Pragmatics in Business English',
        subtitle: 'Deciphering unwritten cues, diplomacy, and polite assertions in high-stakes settings.',
        durationMinutes: 40,
        focusSkill: 'speaking',
        grammarNote: {
          title: 'The Art of British & American Business Hedging',
          rules: [
            'Softening critical statements with cautious qualifiers (e.g. "I have a slight reservation regarding...", "It could be argued that...").',
            'Using modal adverbs: arguably, tentatively, ostensibly, invariably.',
            'Using hypothetical framing: "Would I be right in assuming that...?"'
          ],
          examples: [
            { en: 'I am somewhat skeptical that this timeline is feasible without additional headcount.', es: 'Soy algo escéptico de que este cronograma sea viable sin personal adicional.' },
            { en: 'It might be prudent to stress-test the assumptions before pitching to the angel investors.', es: 'Podría ser prudente poner a prueba los supuestos antes de presentar a los inversores ángeles.' }
          ],
          commonMistakes: [
            'Sounding overly blunt in international meetings (e.g. "You are wrong" vs "I see your point, though I wonder if we might consider an alternative angle").'
          ]
        },
        exercises: [
          {
            id: 'ex-c1-2-1',
            type: 'multiple_choice',
            skill: 'speaking',
            instruction: 'Choose the most diplomatic and sophisticated C1 hedge.',
            question: 'You want to disagree with a colleague\'s proposal politely in an executive meeting:',
            options: [
              { id: 'a', text: 'I am not entirely convinced that this methodology will yield the projected outcomes.' },
              { id: 'b', text: 'Your plan will fail because numbers are bad.' },
              { id: 'c', text: 'I don\'t like this idea at all.' },
              { id: 'd', text: 'We must cancel this right now.' }
            ],
            correctAnswer: 'a',
            explanation: '"I am not entirely convinced that..." conveys professional skepticism with utmost diplomatic elegance.',
            difficulty: 'C1.2'
          }
        ]
      }
    ]
  }
];

// Escenarios para el Tutor de Speaking
export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: 'scenario-a2-1',
    level: 'A2.1',
    title: 'At the Café: Ordering Coffee & Snacks',
    context: 'You are ordering your breakfast at a friendly café in New York.',
    tutorRole: 'Friendly Barista (Sam)',
    userRole: 'Customer',
    starterPrompt: 'Good morning! Welcome to Soho Roasters. What can I get started for you today?',
    accent: 'US',
    targetVocab: ['Order', 'Latte', 'Croissant', 'For here', 'Total'],
    suggestedDurationMinutes: 8,
    pnlTip: 'Usa la fórmula automática: "Hi! Could I please have a [bebida] and a [comida]?"'
  },
  {
    id: 'scenario-a2-2',
    level: 'A2.2',
    title: 'Asking for Directions in the City',
    context: 'You are looking for the central train station in London.',
    tutorRole: 'Local Resident (Oliver)',
    userRole: 'Traveler',
    starterPrompt: 'Hello there! You look a bit lost. Can I help you find your way?',
    accent: 'UK',
    targetVocab: ['Straight', 'Turn left', 'Turn right', 'Blocks', 'Station'],
    suggestedDurationMinutes: 8,
    pnlTip: 'Responde usando: "Excuse me, could you tell me how to get to the station?"'
  },
  {
    id: 'scenario-1',
    level: 'B1.2',
    title: 'Job Interview: Describing Strengths & Prior Challenges',
    context: 'You are interviewing for a mid-level project coordinator role at a multinational tech firm.',
    tutorRole: 'Senior Hiring Manager (Emma)',
    userRole: 'Job Candidate',
    starterPrompt: 'Hello! Thank you for joining us today. To kick off our conversation, could you briefly introduce yourself and describe a challenging project you successfully navigated in your past role?',
    accent: 'US',
    targetVocab: ['Overcome', 'Deadlines', 'Streamline', 'Collaborative', 'Outcome'],
    suggestedDurationMinutes: 10
  },
  {
    id: 'scenario-2',
    level: 'B2.1',
    title: 'Negotiating a Strategic Project Timeline',
    context: 'The client is requesting to move the delivery date forward by two weeks, but quality might be compromised.',
    tutorRole: 'Client Product Owner (David)',
    userRole: 'Lead Consultant',
    starterPrompt: 'David here. Look, our stakeholders are pushing hard to launch this by the 15th. We really need your team to expedite the delivery. What are the realistic options on the table?',
    accent: 'UK',
    targetVocab: ['Compromise', 'Bottleneck', 'Feasible', 'Trade-off', 'Contingency'],
    suggestedDurationMinutes: 15
  },
  {
    id: 'scenario-3',
    level: 'C1.1',
    title: 'Executive Debate: AI Ethics & Workplace Automation',
    context: 'You are participating in an executive roundtable discussing whether generative AI tools should be strictly regulated in corporate environments.',
    tutorRole: 'Roundtable Moderator (Dr. Harrison)',
    userRole: 'Director of Technology Strategy',
    starterPrompt: 'Welcome. Given the rapid proliferation of autonomous agents in knowledge work, there is a fierce debate between unfettered innovation and stringent governance. Where do you stand on this continuum?',
    accent: 'UK',
    targetVocab: ['Ubiquitous', 'Stringent', 'Mitigate', 'Disruption', 'Paradigm shift', 'Imperative'],
    suggestedDurationMinutes: 20
  }
];

// Prompts para el Laboratorio de Writing
export const WRITING_PROMPTS = [
  {
    id: 'write-a2-1',
    level: 'A2.1' as const,
    title: 'Friendly Message: Inviting a Friend for Coffee',
    type: 'Casual Note',
    targetWords: '40 - 70 words',
    minWords: 30,
    instructions: 'Write a short message to your friend inviting them for a coffee tomorrow afternoon. Suggest a time (e.g. 4:00 PM) and a place.',
    sampleContext: 'Hi Mark! Are you free tomorrow afternoon? Would you like to meet for a coffee around 4:00 PM at...'
  },
  {
    id: 'write-a2-2',
    level: 'A2.2' as const,
    title: 'Short Journal: My Last Weekend Trip',
    type: 'Personal Journal',
    targetWords: '60 - 90 words',
    minWords: 50,
    instructions: 'Describe what you did last weekend. Mention where you went, who you were with, what you ate, and whether you had fun (using Past Simple).',
    sampleContext: 'Last Saturday, I visited the botanical gardens with my family. The weather was fantastic and we ate...'
  },
  {
    id: 'write-1',
    level: 'B1.2' as const,
    title: 'Professional Email: Inquiring About a Delivery Delay',
    type: 'Business Email',
    targetWords: '100 - 140 words',
    minWords: 80,
    instructions: 'Write an email to a supplier regarding an order that was supposed to arrive last Tuesday. State the order reference (#TX-902), explain why the delay affects your team, and politely request a revised delivery date.',
    sampleContext: 'Subject: Urgent Inquiry: Order #TX-902 Status Update'
  },
  {
    id: 'write-2',
    level: 'B2.2' as const,
    title: 'Opinion Essay: The Long-Term Impact of Hybrid Work',
    type: 'Formal Essay',
    targetWords: '180 - 240 words',
    minWords: 150,
    instructions: 'Discuss the advantages and drawbacks of hybrid work models for modern companies. Support your arguments with specific examples regarding productivity, company culture, and employee well-being.',
    sampleContext: 'Provide a structured introduction with a thesis statement, two body paragraphs, and a balanced conclusion.'
  },
  {
    id: 'write-3',
    level: 'C1.1' as const,
    title: 'Executive Proposal: Sustainable Urban Logistics Strategy',
    type: 'Proposal / Whitepaper',
    targetWords: '220 - 300 words',
    minWords: 200,
    instructions: 'Draft a formal proposal to the City Council recommending the implementation of zero-emission micro-hubs for last-mile deliveries. Include cost-benefit analysis, environmental impact, and potential roadblocks with mitigation strategies.',
    sampleContext: 'Use formal C1 connectors (e.g., In light of recent data, Notwithstanding the upfront investment, It is imperative that...).'
  }
];
