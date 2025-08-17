import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
}

export function ScoreCard({ 
  title, 
  score, 
  maxScore = 100, 
  description, 
  variant = 'default' 
}: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary/20 bg-gradient-primary/5';
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'destructive':
        return 'border-destructive/20 bg-destructive/5';
      default:
        return 'bg-gradient-card';
    }
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = () => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <Card className={`${getVariantStyles()} shadow-card hover:shadow-primary transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={getScoreColor()}>
            {getScoreLabel()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}
            <span className="text-lg text-muted-foreground">/{maxScore}</span>
          </div>
        </div>
        
        <ProgressBar 
          value={percentage} 
          variant="gradient"
          className="mb-3"
        />
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}