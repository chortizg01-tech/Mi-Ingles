import { UserProfile, ErrorItem, SkillType, CEFRSubLevel } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculum';

export interface Recommendation {
  type: 'lesson' | 'review' | 'writing' | 'speaking' | 'assessment';
  title: string;
  subtitle: string;
  reason: string;
  skill: SkillType;
  targetId?: string;
  badge: string;
}

class AdaptiveEngine {
  /**
   * Calcula la siguiente fecha de repaso según el desempeño en repetición espaciada.
   */
  public calculateNextReviewDate(correctInARow: number): string {
    const now = new Date();
    // Intervals in days based on consecutive correct recall
    const intervals = [1, 3, 7, 14, 30, 60];
    const daysToAdd = intervals[Math.min(correctInARow, intervals.length - 1)];
    
    now.setDate(now.getDate() + daysToAdd);
    return now.toISOString().split('T')[0];
  }

  /**
   * Actualiza el banco de errores cuando un usuario responde incorrectamente.
   */
  public recordMistake(
    errorBank: ErrorItem[],
    mistakeData: {
      category: string;
      skill: SkillType;
      mistake: string;
      correction: string;
      explanation: string;
    }
  ): ErrorItem[] {
    const existingIndex = errorBank.findIndex(
      e => e.category.toLowerCase() === mistakeData.category.toLowerCase() ||
           e.mistake.toLowerCase() === mistakeData.mistake.toLowerCase()
    );

    const today = new Date().toISOString().split('T')[0];

    if (existingIndex >= 0) {
      const updated = [...errorBank];
      const item = updated[existingIndex];
      updated[existingIndex] = {
        ...item,
        incorrectCount: item.incorrectCount + 1,
        correctInARow: 0, // Reset streak on mistake
        isMastered: false,
        lastReviewedAt: new Date().toISOString(),
        nextReviewDate: today
      };
      return updated;
    } else {
      const newItem: ErrorItem = {
        id: `err-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        category: mistakeData.category,
        skill: mistakeData.skill,
        mistake: mistakeData.mistake,
        correction: mistakeData.correction,
        explanation: mistakeData.explanation,
        incorrectCount: 1,
        correctInARow: 0,
        isMastered: false,
        lastReviewedAt: new Date().toISOString(),
        nextReviewDate: today
      };
      return [newItem, ...errorBank];
    }
  }

  /**
   * Registra un repaso exitoso de un ítem de error en SRS.
   */
  public recordReviewSuccess(errorBank: ErrorItem[], errorId: string): ErrorItem[] {
    return errorBank.map(item => {
      if (item.id === errorId) {
        const nextStreak = item.correctInARow + 1;
        const isNowMastered = nextStreak >= 3; // 3 consecutive correct recalls = Mastered!
        return {
          ...item,
          correctInARow: nextStreak,
          isMastered: isNowMastered,
          lastReviewedAt: new Date().toISOString(),
          nextReviewDate: this.calculateNextReviewDate(nextStreak)
        };
      }
      return item;
    });
  }

  /**
   * Determina las áreas más débiles del usuario.
   */
  public getWeakestSkills(masteryScores: Record<SkillType, number>): { skill: SkillType; score: number }[] {
    return Object.entries(masteryScores)
      .map(([skill, score]) => ({ skill: skill as SkillType, score }))
      .sort((a, b) => a.score - b.score);
  }

  /**
   * Recomienda dinámicamente la actividad de mayor impacto pedagógico para el momento actual.
   */
  public getNextRecommendedActivity(
    user: UserProfile,
    errorBank: ErrorItem[]
  ): Recommendation {
    const today = new Date().toISOString().split('T')[0];
    const pendingReviews = errorBank.filter(e => !e.isMastered && e.nextReviewDate <= today);

    // 1. High Priority: Pending Errors due for Spaced Repetition
    if (pendingReviews.length >= 3) {
      return {
        type: 'review',
        title: `Repaso Adaptativo (${pendingReviews.length} pendientes)`,
        subtitle: 'Refuerza los errores detectados para fijar las estructuras en memoria a largo plazo.',
        reason: 'El algoritmo de repetición espaciada ha detectado conceptos listos para revisión hoy.',
        skill: pendingReviews[0].skill,
        badge: 'Prioridad Alta'
      };
    }

    // 2. Identify lowest mastery skill
    const weakest = this.getWeakestSkills(user.masteryScores)[0];
    if (weakest && weakest.score < 50) {
      if (weakest.skill === 'speaking') {
        return {
          type: 'speaking',
          title: 'Sesión de Fluidez Verbal con Tutor IA',
          subtitle: 'Practica escenarios de conversación con retroalimentación inmediata.',
          reason: `Tu puntuación en Speaking (${weakest.score}%) requiere mayor práctica activa.`,
          skill: 'speaking',
          badge: 'Refuerzo Clave'
        };
      }
      if (weakest.skill === 'writing') {
        return {
          type: 'writing',
          title: 'Taller de Escritura y Cohesión',
          subtitle: 'Envía un texto para recibir corrección gramatical y sugerencias C1.',
          reason: `Tu puntuación en Writing (${weakest.score}%) tiene alto potencial de mejora.`,
          skill: 'writing',
          badge: 'Refuerzo Clave'
        };
      }
    }

    // 3. Next uncompleted lesson in the progressive curriculum roadmap
    for (const unit of CURRICULUM_UNITS) {
      for (const lesson of unit.lessons) {
        if (!user.completedLessonIds.includes(lesson.id)) {
          return {
            type: 'lesson',
            targetId: lesson.id,
            title: lesson.title,
            subtitle: `${unit.level} • Unidad ${unit.number}: ${unit.title}`,
            reason: 'Siguiente paso en tu ruta pedagógica hacia el nivel C1.',
            skill: lesson.focusSkill,
            badge: `${lesson.durationMinutes} min`
          };
        }
      }
    }

    // Default fallback: Advanced C1 Practice
    return {
      type: 'speaking',
      title: 'Debate Ejecutivo de Nivel C1',
      subtitle: 'Pon a prueba tu fluidez y pragmática avanzada.',
      reason: 'Has completado todas las lecciones del bloque actual.',
      skill: 'speaking',
      badge: 'C1 Mastery'
    };
  }

  /**
   * Calcula el porcentaje global de progreso hacia C1 (0% a 100%).
   */
  public calculateProgressToC1(user: UserProfile): number {
    const totalLessons = CURRICULUM_UNITS.reduce((acc, u) => acc + u.lessons.length, 0);
    const completed = user.completedLessonIds.length;
    const lessonWeight = (completed / Math.max(1, totalLessons)) * 60; // 60% weight on roadmap

    // Average skill mastery (40% weight)
    const scores = Object.values(user.masteryScores);
    const avgScore = scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length);
    const masteryWeight = (avgScore / 100) * 40;

    return Math.min(100, Math.round(lessonWeight + masteryWeight));
  }
}

export const adaptiveEngine = new AdaptiveEngine();
