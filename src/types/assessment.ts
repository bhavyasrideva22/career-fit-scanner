export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple_choice' | 'yes_no';
  options?: string[];
  category: 'psychometric' | 'technical' | 'aptitude' | 'wiscar';
  subcategory?: string;
  construct?: string;
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentScore {
  category: string;
  score: number;
  maxScore: number;
  label: string;
  description: string;
}

export interface WiscarScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  overallScore: number;
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WiscarScore;
  careerFit: 'strong' | 'moderate' | 'low';
  confidence: number;
  recommendations: string[];
  nextSteps: string[];
  alternativeCareers: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  startTime: Date;
  sectionProgress: {
    psychometric: boolean;
    technical: boolean;
    aptitude: boolean;
    wiscar: boolean;
  };
}