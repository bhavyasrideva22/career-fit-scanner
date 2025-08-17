import { WiscarScore } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WiscarRadarProps {
  scores: WiscarScore;
}

export function WiscarRadar({ scores }: WiscarRadarProps) {
  const dimensions = [
    { key: 'will', label: 'Will (Persistence)', value: scores.will },
    { key: 'interest', label: 'Interest (Curiosity)', value: scores.interest },
    { key: 'skill', label: 'Skill (Current)', value: scores.skill },
    { key: 'cognitive', label: 'Cognitive (Reasoning)', value: scores.cognitive },
    { key: 'ability', label: 'Ability (Learning)', value: scores.ability },
    { key: 'realWorld', label: 'Real-World Fit', value: scores.realWorld }
  ];

  const getColorForScore = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';  
    return 'bg-destructive';
  };

  return (
    <Card className="w-full bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          WISCAR Framework Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Your readiness across six key dimensions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {dimensions.map((dim) => (
          <div key={dim.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{dim.label}</span>
              <span className={`font-bold text-sm ${getColorForScore(dim.value)}`}>
                {dim.value}/100
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out rounded-full ${getBarColor(dim.value)}`}
                style={{ width: `${dim.value}%` }}
              />
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Score Interpretation:</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>80-100: Strong (Ready)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>60-79: Developing (Potential)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>0-59: Needs Development</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}