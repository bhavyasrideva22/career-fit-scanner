import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, AssessmentState } from "@/types/assessment";
import { psychometricQuestions, technicalQuestions, aptitudeQuestions, wiscarQuestions } from "@/data/questions";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { SectionHeader } from "@/components/assessment/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    name: "Psychometric Assessment",
    description: "We'll evaluate your personality traits, interests, and motivations that align with technical support roles.",
    questions: psychometricQuestions
  },
  {
    name: "Technical Knowledge",
    description: "Test your current understanding of basic technical concepts and troubleshooting approaches.",
    questions: technicalQuestions
  },
  {
    name: "Aptitude & Problem Solving", 
    description: "Assess your logical reasoning and approach to common technical support scenarios.",
    questions: aptitudeQuestions
  },
  {
    name: "WISCAR Framework",
    description: "Evaluate your readiness across six key dimensions for technical support success.",
    questions: wiscarQuestions
  }
];

export default function Assessment() {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    startTime: new Date(),
    sectionProgress: {
      psychometric: false,
      technical: false,
      aptitude: false,
      wiscar: false
    }
  });

  const currentSection = sections[assessmentState.currentSection];
  const currentQuestion = currentSection.questions[assessmentState.currentQuestion];
  const totalQuestions = sections.reduce((total, section) => total + section.questions.length, 0);
  const completedQuestions = assessmentState.answers.length;
  const overallProgress = (completedQuestions / totalQuestions) * 100;

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...assessmentState.answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === answer.questionId);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = answer;
    } else {
      newAnswers.push(answer);
    }

    // Check if this is the last question in current section
    if (assessmentState.currentQuestion === currentSection.questions.length - 1) {
      // Move to next section or finish
      if (assessmentState.currentSection === sections.length - 1) {
        // Assessment complete - navigate to results
        localStorage.setItem('assessmentAnswers', JSON.stringify(newAnswers));
        navigate('/results');
        return;
      } else {
        // Move to next section
        setAssessmentState(prev => ({
          ...prev,
          answers: newAnswers,
          currentSection: prev.currentSection + 1,
          currentQuestion: 0,
          sectionProgress: {
            ...prev.sectionProgress,
            [Object.keys(prev.sectionProgress)[prev.currentSection]]: true
          }
        }));
      }
    } else {
      // Move to next question in current section
      setAssessmentState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const handleBack = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (assessmentState.currentSection > 0) {
      const prevSection = sections[assessmentState.currentSection - 1];
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSection.questions.length - 1
      }));
    } else {
      navigate('/');
    }
  };

  const getCurrentAnswer = () => {
    return assessmentState.answers.find(a => a.questionId === currentQuestion.id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero p-6 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Technical Support Engineer Assessment</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4">
        <SectionHeader
          sectionName={currentSection.name}
          sectionDescription={currentSection.description}
          currentQuestion={assessmentState.currentQuestion + 1}
          totalQuestions={currentSection.questions.length}
          overallProgress={overallProgress}
        />

        <div className="max-w-4xl mx-auto">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={getCurrentAnswer()}
          />
        </div>
      </div>
    </div>
  );
}