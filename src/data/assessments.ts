import { AssessmentQuestion } from '../types';

export const PLACEMENT_TEST_QUESTIONS: AssessmentQuestion[] = [
  // A2 / B1 Filter
  {
    id: 'pt-1',
    levelTarget: 'B1.1',
    skill: 'grammar',
    prompt: 'She didn\'t hear the doorbell because she _____ a shower at that moment.',
    options: [
      { id: 'a', text: 'has taken' },
      { id: 'b', text: 'was taking' },
      { id: 'c', text: 'took' },
      { id: 'd', text: 'had take' }
    ],
    correctOptionId: 'b',
    explanation: 'Past Continuous ("was taking") is used for an ongoing background action interrupted by a shorter action.'
  },
  {
    id: 'pt-2',
    levelTarget: 'B1.1',
    skill: 'vocabulary',
    prompt: 'We need to _____ this issue before it causes major delays for the client.',
    options: [
      { id: 'a', text: 'address' },
      { id: 'b', text: 'remind' },
      { id: 'c', text: 'attend' },
      { id: 'd', text: 'pretend' }
    ],
    correctOptionId: 'a',
    explanation: '"To address an issue" means to deal with or solve a problem.'
  },
  // B1.2 Filter
  {
    id: 'pt-3',
    levelTarget: 'B1.2',
    skill: 'grammar',
    prompt: 'If you _____ the instruction manual, you wouldn\'t have assembled the desk backwards.',
    options: [
      { id: 'a', text: 'read' },
      { id: 'b', text: 'had read' },
      { id: 'c', text: 'would read' },
      { id: 'd', text: 'have read' }
    ],
    correctOptionId: 'b',
    explanation: 'Third conditional uses "had + past participle" in the if-clause for past hypotheticals.'
  },
  {
    id: 'pt-4',
    levelTarget: 'B1.2',
    skill: 'listening',
    context: 'Speaker audio cue: "I couldn\'t make head or tail of what the auditor was saying."',
    prompt: 'What does the speaker mean by "couldn\'t make head or tail of"?',
    options: [
      { id: 'a', text: 'Could not understand it at all' },
      { id: 'b', text: 'Did not agree with the conclusion' },
      { id: 'c', text: 'Was very angry' },
      { id: 'd', text: 'Arrived too late to listen' }
    ],
    correctOptionId: 'a',
    explanation: '"Cannot make head or tail of something" is an idiom meaning to completely fail to comprehend.'
  },
  // B2.1 Filter
  {
    id: 'pt-5',
    levelTarget: 'B2.1',
    skill: 'grammar',
    prompt: 'The new smartphone is reported _____ over two million units in its debut weekend.',
    options: [
      { id: 'a', text: 'to sell' },
      { id: 'b', text: 'to have sold' },
      { id: 'c', text: 'selling' },
      { id: 'd', text: 'that it sold' }
    ],
    correctOptionId: 'b',
    explanation: 'Passive reporting with perfect infinitive ("to have sold") refers to an action completed prior to the reporting.'
  },
  {
    id: 'pt-6',
    levelTarget: 'B2.2',
    skill: 'grammar',
    prompt: 'Seldom _____ such an enthusiastic response to a corporate change initiative.',
    options: [
      { id: 'a', text: 'we have seen' },
      { id: 'b', text: 'have we seen' },
      { id: 'c', text: 'did we saw' },
      { id: 'd', text: 'we saw' }
    ],
    correctOptionId: 'b',
    explanation: 'Inversion after the negative adverb "Seldom" requires auxiliary verb "have" before the subject "we".'
  },
  // C1 Filter
  {
    id: 'pt-7',
    levelTarget: 'C1.1',
    skill: 'vocabulary',
    prompt: 'Her arguments were so _____ that even the most stubborn critics were swayed.',
    options: [
      { id: 'a', text: 'cogent' },
      { id: 'b', text: 'cumbersome' },
      { id: 'c', text: 'inadvertent' },
      { id: 'd', text: 'cursory' }
    ],
    correctOptionId: 'a',
    explanation: '"Cogent" (C1) means clear, logical, and powerfully convincing.'
  },
  {
    id: 'pt-8',
    levelTarget: 'C1.2',
    skill: 'grammar',
    prompt: '_____ the board approved the budget, the engineering department had already initiated phase one.',
    options: [
      { id: 'a', text: 'By the time' },
      { id: 'b', text: 'Hardly had' },
      { id: 'c', text: 'No sooner had' },
      { id: 'd', text: 'Whereas' }
    ],
    correctOptionId: 'a',
    explanation: '"By the time" introduces the simple past clause preceding the past perfect result.'
  }
];

export const LEVEL_CERTIFICATES = {
  B1: {
    title: 'Independent Communicator (CEFR B1)',
    description: 'You can navigate most everyday situations, write connected text on topics of personal interest, and describe experiences, events, dreams, and ambitions.',
    badgeColor: 'from-amber-500 to-orange-500'
  },
  B2: {
    title: 'Vantage Professional (CEFR B2)',
    description: 'You can interact with a degree of fluency and spontaneity with native speakers, produce clear, detailed text on a wide range of subjects, and explain a viewpoint on a topical issue.',
    badgeColor: 'from-blue-500 to-indigo-600'
  },
  C1: {
    title: 'Effective Operational Proficiency (CEFR C1)',
    description: 'You can express ideas fluently and spontaneously without much obvious searching for expressions, use language flexibly and effectively for social, academic, and professional purposes.',
    badgeColor: 'from-emerald-500 to-teal-600'
  }
};
