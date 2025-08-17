import { Answer, AssessmentResult, WiscarScore } from "@/types/assessment";
import { psychometricQuestions, technicalQuestions, aptitudeQuestions, wiscarQuestions } from "@/data/questions";

export function calculateAssessmentResults(answers: Answer[]): AssessmentResult {
  const answerMap = new Map(answers.map(a => [a.questionId, a]));
  
  // Calculate psychometric score (0-100)
  const psychometricScore = calculatePsychometricScore(answerMap);
  
  // Calculate technical score (0-100)  
  const technicalScore = calculateTechnicalScore(answerMap);
  
  // Calculate WISCAR scores (0-100 each)
  const wiscarScores = calculateWiscarScores(answerMap);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (psychometricScore * 0.3) + 
    (technicalScore * 0.3) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.4)
  );
  
  // Determine career fit
  const careerFit = overallScore >= 80 ? 'strong' : overallScore >= 60 ? 'moderate' : 'low';
  
  // Calculate confidence (based on answer consistency and completeness)
  const confidence = calculateConfidence(answers, overallScore);
  
  // Generate recommendations
  const recommendations = generateRecommendations(overallScore, psychometricScore, technicalScore, wiscarScores);
  
  // Generate next steps
  const nextSteps = generateNextSteps(careerFit, technicalScore, wiscarScores);
  
  // Generate alternative careers
  const alternativeCareers = generateAlternatives(careerFit, psychometricScore, technicalScore);

  return {
    overallScore,
    psychometricScore,
    technicalScore,
    wiscarScores,
    careerFit,
    confidence,
    recommendations,
    nextSteps,
    alternativeCareers
  };
}

function calculatePsychometricScore(answerMap: Map<string, Answer>): number {
  const psychScores = psychometricQuestions.map(q => {
    const answer = answerMap.get(q.id);
    if (!answer || typeof answer.value !== 'number') return 0;
    return (answer.value / 4) * 100; // Convert 0-4 likert to 0-100
  });
  
  return Math.round(psychScores.reduce((sum, score) => sum + score, 0) / psychScores.length);
}

function calculateTechnicalScore(answerMap: Map<string, Answer>): number {
  const correctAnswers = [
    "Domain Name System", // tech_1
    "ping",              // tech_2  
    "The server received an invalid response from upstream server", // tech_3
    "NTFS",              // tech_4
    "80",                // tech_5
    "Track and manage support requests" // tech_6
  ];
  
  let correct = 0;
  technicalQuestions.forEach((q, index) => {
    const answer = answerMap.get(q.id);
    if (answer && answer.value === correctAnswers[index]) {
      correct++;
    }
  });
  
  // Add aptitude questions (correct answers)
  const aptitudeCorrect = [
    "Check if Wi-Fi is enabled on their device", // apt_1
    "Acknowledge their frustration and assure them you'll help resolve it", // apt_2
    "Research the error and consult documentation", // apt_3
    "A > C", // apt_4
    "When did the slowness start and what were they doing" // apt_5
  ];
  
  aptitudeQuestions.forEach((q, index) => {
    const answer = answerMap.get(q.id);
    if (answer && answer.value === aptitudeCorrect[index]) {
      correct++;
    }
  });
  
  return Math.round((correct / (technicalQuestions.length + aptitudeQuestions.length)) * 100);
}

function calculateWiscarScores(answerMap: Map<string, Answer>): WiscarScore {
  const wiscarByCategory = wiscarQuestions.reduce((acc, q) => {
    const answer = answerMap.get(q.id);
    if (answer && typeof answer.value === 'number' && q.subcategory) {
      if (!acc[q.subcategory]) acc[q.subcategory] = [];
      acc[q.subcategory].push((answer.value / 4) * 100);
    }
    return acc;
  }, {} as Record<string, number[]>);
  
  return {
    will: Math.round(wiscarByCategory.will?.[0] || 0),
    interest: Math.round(wiscarByCategory.interest?.[0] || 0),
    skill: Math.round(wiscarByCategory.skill?.[0] || 0), 
    cognitive: Math.round(wiscarByCategory.cognitive?.[0] || 0),
    ability: Math.round(wiscarByCategory.ability?.[0] || 0),
    realWorld: Math.round(wiscarByCategory.realWorld?.[0] || 0)
  };
}

function calculateConfidence(answers: Answer[], overallScore: number): number {
  const completeness = answers.length / (psychometricQuestions.length + technicalQuestions.length + aptitudeQuestions.length + wiscarQuestions.length);
  const scoreConsistency = Math.max(0, 100 - Math.abs(overallScore - 75)); // Closer to 75 = more confident
  return Math.round((completeness * 60) + (scoreConsistency * 0.4));
}

function generateRecommendations(overall: number, psych: number, tech: number, wiscar: WiscarScore): string[] {
  const recommendations = [];
  
  if (overall >= 80) {
    recommendations.push("You show strong potential for a Technical Support Engineer role!");
  } else if (overall >= 60) {
    recommendations.push("You have good foundational traits for technical support with room for development.");
  } else {
    recommendations.push("Consider exploring related roles or building foundational skills first.");
  }
  
  if (tech < 60) {
    recommendations.push("Focus on building technical fundamentals - consider CompTIA A+ or Google IT Support certification.");
  }
  
  if (psych >= 80) {
    recommendations.push("Your strong interpersonal skills are a major asset for customer-facing technical roles.");
  }
  
  if (wiscar.interest >= 80) {
    recommendations.push("Your genuine interest in technology will drive continuous learning and career growth.");
  }
  
  return recommendations;
}

function generateNextSteps(fit: string, tech: number, wiscar: WiscarScore): string[] {
  const steps = [];
  
  if (fit === 'strong') {
    steps.push("Start applying for junior Technical Support Engineer positions");
    steps.push("Build a portfolio showcasing your problem-solving approach");
    steps.push("Join technical communities and forums to expand your network");
  } else if (fit === 'moderate') {
    steps.push("Complete a technical certification program (CompTIA A+, Google IT Support)");
    steps.push("Practice troubleshooting scenarios through online labs");
    steps.push("Consider entry-level IT roles to gain experience");
  } else {
    steps.push("Explore foundational IT courses to build technical knowledge");
    steps.push("Consider related roles like Customer Success or QA Testing");
    steps.push("Volunteer for tech support opportunities to test your interest");
  }
  
  if (tech < 50) {
    steps.push("Take basic networking and operating systems courses");
  }
  
  return steps;
}

function generateAlternatives(fit: string, psych: number, tech: number): string[] {
  const alternatives = [];
  
  if (psych >= 70 && tech < 50) {
    alternatives.push("Customer Success Manager");
    alternatives.push("Technical Writer");
    alternatives.push("Product Training Specialist");
  }
  
  if (tech >= 70 && psych < 50) {
    alternatives.push("QA Tester");
    alternatives.push("DevOps Engineer");
    alternatives.push("System Administrator");
  }
  
  if (fit === 'low') {
    alternatives.push("IT Project Coordinator");
    alternatives.push("Technical Sales");
    alternatives.push("Business Analyst");
  }
  
  return alternatives;
}