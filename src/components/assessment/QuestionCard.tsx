import { Question, Answer } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { likertOptions } from "@/data/questions";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  currentAnswer?: Answer;
}

export function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentAnswer?.value?.toString() || ""
  );

  const handleSubmit = () => {
    if (!selectedValue) return;
    
    const answer: Answer = {
      questionId: question.id,
      value: question.type === 'likert' ? parseInt(selectedValue) : selectedValue,
      timestamp: new Date()
    };
    
    onAnswer(answer);
  };

  const getOptions = () => {
    if (question.type === 'likert') {
      return likertOptions;
    }
    if (question.type === 'yes_no') {
      return ['Yes', 'No'];
    }
    return question.options || [];
  };

  const options = getOptions();

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-xl font-semibold text-foreground leading-relaxed">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedValue}
          onValueChange={setSelectedValue}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem 
                value={question.type === 'likert' ? index.toString() : option}
                id={`option-${index}`}
                className="text-primary"
              />
              <Label 
                htmlFor={`option-${index}`}
                className="flex-1 text-sm font-medium leading-relaxed cursor-pointer hover:text-primary transition-colors"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!selectedValue}
            className="px-8 py-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Next Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}