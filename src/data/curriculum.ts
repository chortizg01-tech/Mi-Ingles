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
    pnlTip: 'Usa la fórmula automática: "Hi! Could I please have a [bebida] and a [comida]?"',
    conversationFlow: {
      turns: [
        {
          turnNumber: 1,
          expectedTopics: ['ordering', 'coffee', 'drink', 'food'],
          tutorResponses: [
            {
              keywords: ['coffee', 'latte', 'cappuccino', 'espresso', 'americano', 'mocha'],
              response: 'Great choice! Would you like that hot or iced? And what size — small, medium, or large?',
              followUp: 'We also have oat milk and almond milk if you prefer a dairy-free option.'
            },
            {
              keywords: ['tea', 'green tea', 'black tea', 'chai'],
              response: 'Sure! We have green tea, chamomile, and English breakfast. Which one sounds good? And would you like honey with that?'
            },
            {
              keywords: ['menu', 'what do you have', 'options', 'recommend'],
              response: 'Of course! Our most popular drinks are the caramel latte, the iced americano, and our house blend drip coffee. For food, we have croissants, muffins, and avocado toast. What sounds good to you?'
            },
            {
              keywords: ['hello', 'hi', 'hey', 'good morning', 'morning'],
              response: 'Hey there! Good morning! So, are you in the mood for coffee, tea, or maybe a refreshing juice today?'
            }
          ],
          fallbackResponse: 'No worries! Take your time. Would you like to start with a coffee or a tea? We also have fresh juices and smoothies!',
          helpPrompts: [
            'Try saying: "Hi! Could I have a latte, please?"',
            'You could say: "What do you recommend?"',
            'Try: "Can I see the menu, please?"'
          ],
          suggestedUserResponses: [
            'Hi! Could I have a latte, please?',
            'What do you recommend?',
            'Can I see the menu?'
          ]
        },
        {
          turnNumber: 2,
          expectedTopics: ['size', 'milk', 'hot', 'cold', 'food'],
          tutorResponses: [
            {
              keywords: ['hot', 'warm'],
              response: 'Perfect, one hot drink coming right up! Would you like to add anything to eat? We have fresh croissants and blueberry muffins today.'
            },
            {
              keywords: ['iced', 'cold', 'ice'],
              response: 'Nice! Iced is perfect for today. Would you like any food with that? Our chocolate croissant is really popular!'
            },
            {
              keywords: ['large', 'big', 'grande'],
              response: 'A large one, got it! Would you also like something to eat? We just baked some fresh pastries.'
            },
            {
              keywords: ['small', 'medium', 'regular'],
              response: 'Got it! And would you like to pair that with a pastry or a sandwich? Our avocado toast is a customer favorite!'
            },
            {
              keywords: ['croissant', 'muffin', 'toast', 'sandwich', 'pastry', 'food', 'eat'],
              response: 'Excellent choice! That goes perfectly with your drink. Will that be for here or to go?'
            }
          ],
          fallbackResponse: 'That sounds lovely! And would you also like something to eat? We have croissants, muffins, and sandwiches.',
          helpPrompts: [
            'Say the size: "A medium one, please" or "Large, please"',
            'Talk about temperature: "Hot, please" or "Iced, please"',
            'Order food: "And a croissant, please"'
          ],
          suggestedUserResponses: [
            'A medium iced latte, please.',
            'Hot, please. And a croissant.',
            'Large, with oat milk.'
          ]
        },
        {
          turnNumber: 3,
          expectedTopics: ['here', 'go', 'takeaway', 'stay', 'pay'],
          tutorResponses: [
            {
              keywords: ['here', 'stay', 'sit', 'inside', 'dine in'],
              response: 'For here, awesome! I\'ll bring it right to your table. Your total comes to $7.50. Cash or card?'
            },
            {
              keywords: ['go', 'takeaway', 'take out', 'take away', 'leave'],
              response: 'To go, got it! I\'ll have that ready in just a minute. Your total is $7.50. How would you like to pay?'
            },
            {
              keywords: ['card', 'credit', 'debit', 'apple pay', 'pay'],
              response: 'Sure! Just tap your card right here. Your receipt is printing. Have a wonderful day!'
            },
            {
              keywords: ['cash', 'bill', 'change'],
              response: 'Cash works! Out of ten dollars... here\'s your change, $2.50. Your order will be ready in a moment!'
            }
          ],
          fallbackResponse: 'Great! Will that be for here or to go?',
          helpPrompts: [
            'Say: "For here, please" or "To go, please"',
            'You can say: "I\'ll eat here, thanks!"',
            'Try: "To take away, please"'
          ],
          suggestedUserResponses: [
            'For here, please.',
            'To go, please.',
            'I\'ll have it here, thanks!'
          ]
        },
        {
          turnNumber: 4,
          expectedTopics: ['pay', 'thanks', 'goodbye'],
          tutorResponses: [
            {
              keywords: ['card', 'credit', 'pay', 'apple'],
              response: 'Perfect! Just tap right here. All set! Your order will be ready at the counter in about 2 minutes. Enjoy your morning!'
            },
            {
              keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you'],
              response: 'You\'re welcome! Enjoy your coffee and have an amazing day! Come back anytime!'
            },
            {
              keywords: ['receipt', 'bag'],
              response: 'Of course! Here\'s your receipt. Your order is almost ready. Thank you for coming to Soho Roasters!'
            }
          ],
          fallbackResponse: 'Alright, your total is $7.50. Cash or card? And thanks for visiting us!',
          helpPrompts: [
            'Say: "I\'ll pay with card, please"',
            'Try: "Thank you! Have a nice day!"',
            'You could say: "Can I have a receipt, please?"'
          ],
          suggestedUserResponses: [
            'I\'ll pay by card, please.',
            'Thank you so much! Have a nice day!',
            'Can I have a receipt?'
          ]
        },
        {
          turnNumber: 5,
          expectedTopics: ['farewell'],
          tutorResponses: [
            {
              keywords: ['thank', 'thanks', 'bye', 'great', 'good', 'nice', 'wonderful', 'awesome'],
              response: 'Thanks for stopping by! You did a great job ordering in English. Have a beautiful day and come back soon! ☕'
            }
          ],
          fallbackResponse: 'It was great serving you today! Your coffee is ready — enjoy! Have a wonderful day! ☕',
          helpPrompts: [
            'Say goodbye: "Thanks, have a great day!"',
            'Try: "Bye! See you next time!"'
          ],
          suggestedUserResponses: [
            'Thanks! See you next time!',
            'Bye! Have a great day!',
            'Thank you, the coffee is great!'
          ]
        }
      ]
    }
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
    pnlTip: 'Responde usando: "Excuse me, could you tell me how to get to the station?"',
    conversationFlow: {
      turns: [
        {
          turnNumber: 1,
          expectedTopics: ['directions', 'station', 'lost', 'help'],
          tutorResponses: [
            {
              keywords: ['station', 'train', 'railway'],
              response: 'The train station? Sure! It\'s about a 10-minute walk from here. Go straight down this street for two blocks, then turn left on Oxford Road. You\'ll see it on your right.'
            },
            {
              keywords: ['yes', 'please', 'help', 'lost', 'looking'],
              response: 'Of course! Where are you trying to go? Are you looking for the train station, a bus stop, or somewhere else?'
            },
            {
              keywords: ['museum', 'park', 'restaurant', 'hotel'],
              response: 'Ah, I know that area! It\'s not far from here. Walk straight ahead for about 5 minutes and turn right at the traffic lights. You can\'t miss it!'
            },
            {
              keywords: ['bus', 'taxi', 'uber'],
              response: 'The nearest bus stop is just around the corner — about 2 minutes that way. Buses come every 10 minutes. Would you like me to show you?'
            }
          ],
          fallbackResponse: 'Of course! I\'m happy to help. Are you looking for the train station? It\'s the most popular destination around here.',
          helpPrompts: [
            'Try: "Yes, I\'m looking for the train station"',
            'Say: "Could you tell me how to get to the station?"',
            'Ask: "Where is the nearest bus stop?"'
          ],
          suggestedUserResponses: [
            'Yes, I\'m looking for the train station.',
            'Could you tell me how to get to the station?',
            'Where is the nearest bus stop?'
          ]
        },
        {
          turnNumber: 2,
          expectedTopics: ['understanding', 'repeat', 'walking', 'far'],
          tutorResponses: [
            {
              keywords: ['far', 'long', 'walk', 'minutes', 'how long'],
              response: 'It\'s about a 10-minute walk. Not too far! Just keep going straight until you see the big clock tower — that\'s right next to the station entrance.'
            },
            {
              keywords: ['repeat', 'again', 'sorry', 'understand', 'slowly'],
              response: 'No problem! So: go straight on this road for two blocks. Then turn left. The station will be on your right side. Simple as that!'
            },
            {
              keywords: ['left', 'right', 'straight', 'turn', 'block'],
              response: 'Exactly! You\'ve got it. After you turn left, you\'ll see a big red building — the station is just past that. You really can\'t miss it.'
            },
            {
              keywords: ['thank', 'thanks', 'got it', 'ok', 'okay'],
              response: 'You\'re welcome! Oh, and one more tip — if you need to buy a ticket, the machines are right at the entrance. Much faster than the queue at the counter!'
            },
            {
              keywords: ['map', 'google', 'phone'],
              response: 'Good idea to check your phone! But honestly, it\'s really easy to find on foot. Just go straight and turn left at the second crossing. You\'ll be there in no time!'
            }
          ],
          fallbackResponse: 'It\'s really close! About a 10-minute walk. Just go straight and turn left at the second block. Would you like me to walk with you part of the way?',
          helpPrompts: [
            'Ask: "Is it far from here?"',
            'Say: "Could you repeat that, please?"',
            'Try: "Turn left at the second block, right?"'
          ],
          suggestedUserResponses: [
            'Is it far from here?',
            'Could you repeat that, please?',
            'So I go straight and turn left?'
          ]
        },
        {
          turnNumber: 3,
          expectedTopics: ['confirm', 'ticket', 'thank'],
          tutorResponses: [
            {
              keywords: ['ticket', 'buy', 'machine', 'counter', 'how much'],
              response: 'You can buy tickets from the machines at the entrance. They accept cards and cash. A single ticket to the city centre is about £4.50.'
            },
            {
              keywords: ['thank', 'thanks', 'helpful', 'kind'],
              response: 'My pleasure! I hope you enjoy London. If you ever get lost again, just ask anyone — Londoners are usually happy to help! Have a lovely trip!'
            },
            {
              keywords: ['time', 'schedule', 'next train', 'when'],
              response: 'Trains run every 15 minutes or so. You should be able to catch one pretty quickly once you get there. Just check the departure board at the station.'
            }
          ],
          fallbackResponse: 'You\'re almost there! When you arrive at the station, look for the departure board for train times. Have a wonderful trip!',
          helpPrompts: [
            'Ask: "Where can I buy a ticket?"',
            'Say: "Thank you so much for your help!"',
            'Try: "What time is the next train?"'
          ],
          suggestedUserResponses: [
            'Where can I buy a ticket?',
            'Thank you so much for your help!',
            'What time is the next train?'
          ]
        },
        {
          turnNumber: 4,
          expectedTopics: ['goodbye', 'final'],
          tutorResponses: [
            {
              keywords: ['thank', 'thanks', 'bye', 'goodbye', 'helpful'],
              response: 'You\'re very welcome! Enjoy your time in London. Cheerio! 🇬🇧'
            }
          ],
          fallbackResponse: 'It was lovely chatting with you! Safe travels and enjoy London! Cheers! 🇬🇧',
          helpPrompts: [
            'Say goodbye: "Thank you! Goodbye!"',
            'Try: "Thanks for everything! Cheers!"'
          ],
          suggestedUserResponses: [
            'Thank you! Goodbye!',
            'Thanks for everything! Cheers!',
            'Have a great day!'
          ]
        }
      ]
    }
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
    suggestedDurationMinutes: 10,
    conversationFlow: {
      turns: [
        {
          turnNumber: 1,
          expectedTopics: ['introduction', 'experience', 'project', 'challenge'],
          tutorResponses: [
            {
              keywords: ['project', 'team', 'manage', 'lead', 'coordinate', 'work'],
              response: 'That sounds like valuable experience! What would you say is your greatest strength when it comes to working in a team environment?'
            },
            {
              keywords: ['name', 'hi', 'hello', 'my name', 'i am', 'i\'m'],
              response: 'Nice to meet you! So tell me, what kind of projects have you worked on recently? What was the most challenging one?'
            },
            {
              keywords: ['challenge', 'difficult', 'problem', 'hard', 'obstacle'],
              response: 'I appreciate you sharing that. How did you handle that challenge specifically? What approach or strategy did you use?'
            }
          ],
          fallbackResponse: 'Thank you for sharing! Could you tell me more about your experience? What type of projects have you been involved in?',
          helpPrompts: [
            'Start with: "Hi, my name is... I have experience in..."',
            'Talk about a project: "In my last job, I worked on a project where..."',
            'Mention a challenge: "The biggest challenge I faced was..."'
          ],
          suggestedUserResponses: [
            'Hi! My name is... I have 3 years of experience in project management.',
            'In my last role, I managed a team project with tight deadlines.',
            'The most challenging project was when we had to deliver in two weeks.'
          ]
        },
        {
          turnNumber: 2,
          expectedTopics: ['strengths', 'skills', 'teamwork'],
          tutorResponses: [
            {
              keywords: ['team', 'people', 'communication', 'collaborate', 'together'],
              response: 'Excellent! Communication and collaboration are key in this role. Now, can you describe a situation where you had to meet a very tight deadline? How did you handle the pressure?'
            },
            {
              keywords: ['organize', 'plan', 'detail', 'efficient', 'productive'],
              response: 'Being organized is so important! Can you give me a specific example where your planning skills made a real difference in a project outcome?'
            },
            {
              keywords: ['learn', 'adapt', 'flexible', 'quick', 'new'],
              response: 'Adaptability is a great asset! In this role, priorities change frequently. Could you give me an example of when you had to adapt quickly to a change?'
            }
          ],
          fallbackResponse: 'That\'s a great perspective. Could you also tell me about your main strengths? What skills do you bring to the table?',
          helpPrompts: [
            'Talk about strengths: "My biggest strength is communication"',
            'Give an example: "For example, in my last project I..."',
            'Mention skills: "I\'m very good at organizing and planning"'
          ],
          suggestedUserResponses: [
            'My greatest strength is communication and teamwork.',
            'I\'m very organized and I always plan ahead.',
            'I learn quickly and adapt to new situations.'
          ]
        },
        {
          turnNumber: 3,
          expectedTopics: ['deadline', 'pressure', 'example'],
          tutorResponses: [
            {
              keywords: ['deadline', 'time', 'pressure', 'fast', 'rush', 'urgent'],
              response: 'That\'s impressive! It shows great resilience. One last question: where do you see yourself in three years, and why does this position interest you?'
            },
            {
              keywords: ['solve', 'solution', 'fix', 'improve', 'result', 'outcome'],
              response: 'What a great outcome! You clearly know how to deliver results under pressure. Final question: why are you interested in this specific role at our company?'
            }
          ],
          fallbackResponse: 'Thank you for that insight. Last question for today: what motivates you about this role, and where do you see your career going?',
          helpPrompts: [
            'Share an example: "Once we had a deadline and I organized the team to..."',
            'Talk about results: "The result was that we delivered on time and..."',
            'Mention pressure: "Under pressure, I prioritize tasks and focus on..."'
          ],
          suggestedUserResponses: [
            'When we had a tight deadline, I organized the team and we delivered on time.',
            'I prioritize the most important tasks first when under pressure.',
            'The outcome was positive — we finished the project successfully.'
          ]
        },
        {
          turnNumber: 4,
          expectedTopics: ['future', 'motivation', 'why this job'],
          tutorResponses: [
            {
              keywords: ['grow', 'learn', 'develop', 'career', 'future', 'company'],
              response: 'That\'s a wonderful answer! I can see you\'re a great fit for this position. Thank you so much for your time today. We\'ll be in touch soon with next steps. Best of luck!'
            },
            {
              keywords: ['interest', 'passion', 'love', 'excited', 'opportunity'],
              response: 'Your enthusiasm really shows! This has been a great conversation. We\'ll review your application and get back to you within the week. Thank you!'
            }
          ],
          fallbackResponse: 'Thank you so much for this interview! You gave some really thoughtful answers. We\'ll be in contact soon. Have a great day!',
          helpPrompts: [
            'Say: "I want to grow my career in project management"',
            'Try: "This position interests me because..."',
            'Share: "In three years, I see myself leading bigger projects"'
          ],
          suggestedUserResponses: [
            'I see myself growing into a leadership role in project management.',
            'This position interests me because I love working with international teams.',
            'I\'m excited about this opportunity to learn and develop my skills.'
          ]
        }
      ]
    }
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
    suggestedDurationMinutes: 15,
    conversationFlow: {
      turns: [
        {
          turnNumber: 1,
          expectedTopics: ['timeline', 'options', 'negotiate'],
          tutorResponses: [
            {
              keywords: ['possible', 'can', 'try', 'maybe', 'feasible', 'option'],
              response: 'I appreciate your willingness to explore options. But I need to be transparent — if we cut corners, do you have a contingency plan in case the quality falls below standard?'
            },
            {
              keywords: ['difficult', 'hard', 'impossible', 'risk', 'quality', 'can\'t', 'cannot'],
              response: 'I understand your concerns about quality. But our board has set a firm date. What if we reduced the scope slightly? Which features could we defer to a phase two?'
            },
            {
              keywords: ['need', 'more time', 'extend', 'delay', 'realistic'],
              response: 'I hear you, but extending isn\'t really an option. Could your team work in parallel streams to speed things up without sacrificing the core features?'
            }
          ],
          fallbackResponse: 'I understand this is a complex situation. Let me put it simply: can your team deliver the core features by the 15th, even if some extras come later?',
          helpPrompts: [
            'Try: "I understand the urgency, but moving the deadline creates risks for quality"',
            'Say: "We could explore reducing the scope of the first delivery"',
            'Suggest: "One option would be to deliver the core features first"'
          ],
          suggestedUserResponses: [
            'I understand the urgency, but we need to discuss the impact on quality.',
            'We could deliver the core features by the 15th and defer some extras.',
            'Moving the timeline is risky. Can we explore alternatives?'
          ]
        },
        {
          turnNumber: 2,
          expectedTopics: ['scope', 'features', 'compromise'],
          tutorResponses: [
            {
              keywords: ['phase', 'two', 'defer', 'later', 'priority', 'core'],
              response: 'A phased approach could work. Which features do you consider essential for the launch, and what can wait? I need specifics to take back to my board.'
            },
            {
              keywords: ['resource', 'people', 'team', 'hire', 'more staff', 'parallel'],
              response: 'Adding more resources could help. Would that affect the budget, though? What would be the additional cost, approximately?'
            },
            {
              keywords: ['test', 'testing', 'QA', 'bug', 'quality'],
              response: 'Good point about testing. What if we did an accelerated testing cycle? We could focus on critical path testing rather than full regression.'
            }
          ],
          fallbackResponse: 'Let me ask you this: what\'s the minimum viable product we need for launch day? What absolutely cannot be delayed?',
          helpPrompts: [
            'Propose: "The essential features are X, Y, and Z. The rest can come in phase two"',
            'Suggest: "We could bring in additional team members, but the cost would increase"',
            'Mention: "We should keep the testing phase — skipping QA would be too risky"'
          ],
          suggestedUserResponses: [
            'The essential features are authentication, dashboard, and reporting.',
            'We could add two more developers, but the budget would increase by 20%.',
            'I recommend keeping full testing — cutting QA creates too much risk.'
          ]
        },
        {
          turnNumber: 3,
          expectedTopics: ['agreement', 'plan', 'next steps'],
          tutorResponses: [
            {
              keywords: ['agree', 'deal', 'plan', 'works', 'sounds good', 'accept'],
              response: 'Excellent! I think we\'ve found a workable solution. Let\'s document this revised plan and share it with both teams by end of day. Thanks for being so collaborative!'
            },
            {
              keywords: ['budget', 'cost', 'money', 'invest', 'price'],
              response: 'The budget consideration is fair. Let me take this back to finance and see what we can approve. Can you send me a detailed breakdown by tomorrow morning?'
            }
          ],
          fallbackResponse: 'I think we\'re making progress. Let\'s summarize what we\'ve agreed on and put together a revised project plan. Can you send that over by end of week?',
          helpPrompts: [
            'Summarize: "So we agreed to deliver core features by the 15th and the rest by..."',
            'Confirm: "I\'ll send you a detailed revised plan by tomorrow"',
            'Close: "This plan works for both sides. Let\'s move forward"'
          ],
          suggestedUserResponses: [
            'Great, so we\'ll deliver core features by the 15th and extras by month-end.',
            'I\'ll prepare a revised timeline and send it to you by tomorrow.',
            'I think this is a fair compromise. Let\'s finalize the details.'
          ]
        }
      ]
    }
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
    suggestedDurationMinutes: 20,
    conversationFlow: {
      turns: [
        {
          turnNumber: 1,
          expectedTopics: ['position', 'opinion', 'AI', 'regulation'],
          tutorResponses: [
            {
              keywords: ['regulate', 'governance', 'rules', 'control', 'limit', 'regulation'],
              response: 'An interesting position in favour of governance. But some would argue that over-regulation stifles innovation and puts companies at a competitive disadvantage. How would you respond to that critique?'
            },
            {
              keywords: ['innovation', 'freedom', 'open', 'progress', 'develop', 'grow'],
              response: 'A compelling case for innovation-first. However, the counterargument is that unchecked AI deployment raises serious ethical concerns — bias, job displacement, privacy. How do you propose we mitigate those risks?'
            },
            {
              keywords: ['balance', 'both', 'middle', 'combine', 'moderate'],
              response: 'A nuanced stance. Could you articulate what that balanced framework would look like in practice? Which specific guardrails would you implement while still fostering innovation?'
            }
          ],
          fallbackResponse: 'That\'s a thoughtful starting point. Could you elaborate on your position? Specifically, where should the line be drawn between enabling AI innovation and protecting against its potential risks?',
          helpPrompts: [
            'Share your view: "I believe we need a balanced approach that combines innovation with responsible governance"',
            'Take a strong position: "In my view, strict regulation is necessary to prevent misuse"',
            'Argue for innovation: "I think excessive regulation would slow down progress and competitiveness"'
          ],
          suggestedUserResponses: [
            'I believe we need a balanced approach with clear ethical guidelines.',
            'In my view, some regulation is necessary to prevent misuse of AI.',
            'Innovation should come first, but with responsible governance frameworks.'
          ]
        },
        {
          turnNumber: 2,
          expectedTopics: ['risks', 'benefits', 'framework', 'ethics'],
          tutorResponses: [
            {
              keywords: ['bias', 'fair', 'discrimination', 'ethical', 'data', 'privacy'],
              response: 'The bias and privacy concerns are indeed paramount. Let me push you further: who should be held accountable when an AI system makes a consequential error — the developer, the deploying company, or the AI itself?'
            },
            {
              keywords: ['job', 'employment', 'replace', 'automate', 'worker', 'displacement'],
              response: 'Workforce displacement is perhaps the most socially charged dimension of this debate. Do you believe AI will create more jobs than it eliminates, or are we heading towards a fundamental restructuring of the labour market?'
            },
            {
              keywords: ['framework', 'policy', 'guideline', 'standard', 'audit'],
              response: 'Establishing frameworks is crucial. But implementation is where things get complex. How would you ensure compliance across different jurisdictions and corporate cultures?'
            }
          ],
          fallbackResponse: 'You raise valid points. Let\'s drill deeper: what are the most significant risks of AI in the workplace, and how would you address them while maintaining a competitive edge?',
          helpPrompts: [
            'Discuss risks: "The main risks include data privacy, algorithmic bias, and job displacement"',
            'Propose solutions: "Companies should implement mandatory AI audits and transparency reports"',
            'Use advanced vocabulary: "It is imperative that we establish robust governance frameworks"'
          ],
          suggestedUserResponses: [
            'The main risks include algorithmic bias, data privacy, and workforce displacement.',
            'Companies should be held accountable through mandatory AI impact assessments.',
            'It is imperative that we establish transparent, auditable AI governance frameworks.'
          ]
        },
        {
          turnNumber: 3,
          expectedTopics: ['accountability', 'future', 'solution'],
          tutorResponses: [
            {
              keywords: ['company', 'responsible', 'accountab', 'liable', 'audit'],
              response: 'Corporate accountability is essential, agreed. As we wrap up, what would be your one key recommendation to business leaders navigating this paradigm shift? What\'s the non-negotiable?'
            },
            {
              keywords: ['education', 'train', 'upskill', 'learn', 'reskill', 'prepare'],
              response: 'Investing in human capital is indeed critical. For our closing, if you had to distill your vision into one actionable imperative for CEOs today, what would it be?'
            }
          ],
          fallbackResponse: 'Excellent perspectives throughout. As we conclude, what single recommendation would you give to corporate leaders preparing for the AI-driven future?',
          helpPrompts: [
            'Conclude with: "My key recommendation would be to invest in both AI capability and human upskilling"',
            'Summarize: "In summary, the imperative is to balance innovation with ethical responsibility"',
            'Give a recommendation: "Leaders must prioritize transparency and establish clear AI governance policies"'
          ],
          suggestedUserResponses: [
            'Leaders must invest equally in AI capability and human upskilling programmes.',
            'The non-negotiable is transparency — every AI decision must be explainable.',
            'My recommendation is to embrace innovation while establishing robust ethical guardrails.'
          ]
        }
      ]
    }
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
