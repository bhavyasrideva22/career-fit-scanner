import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  sectionName: string;
  sectionDescription: string;
  currentQuestion: number;
  totalQuestions: number;
  overallProgress: number;
}

export function SectionHeader({ 
  sectionName, 
  sectionDescription, 
  currentQuestion, 
  totalQuestions,
  overallProgress 
}: SectionHeaderProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-6">
      {/* Overall Progress */}
      <div className="bg-gradient-card rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Assessment Progress</h2>
          <Badge variant="secondary" className="text-sm">
            {Math.round(overallProgress)}% Complete
          </Badge>
        </div>
        <ProgressBar value={overallProgress} variant="gradient" />
      </div>

      {/* Section Info */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Badge variant="outline" className="text-sm px-3 py-1">
            Section {Math.floor(overallProgress / 25) + 1} of 4
          </Badge>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {sectionName}
          </h1>
        </div>
        
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {sectionDescription}
        </p>
        
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion} of {totalQuestions} in this section
        </div>
      </div>
    </div>
  );
}