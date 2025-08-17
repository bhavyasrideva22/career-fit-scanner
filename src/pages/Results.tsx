import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, AssessmentResult } from "@/types/assessment";
import { calculateAssessmentResults } from "@/utils/scoring";
import { ScoreCard } from "@/components/results/ScoreCard";
import { WiscarRadar } from "@/components/results/WiscarRadar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Results() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answersData = localStorage.getItem('assessmentAnswers');
    if (!answersData) {
      navigate('/');
      return;
    }

    try {
      const answers: Answer[] = JSON.parse(answersData);
      const calculatedResults = calculateAssessmentResults(answers);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error calculating results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const getCareerFitColor = (fit: string) => {
    switch (fit) {
      case 'strong': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'low': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getCareerFitLabel = (fit: string) => {
    switch (fit) {
      case 'strong': return 'Strong Match';
      case 'moderate': return 'Moderate Match';
      case 'low': return 'Limited Match';
      default: return 'Unknown';
    }
  };

  const handleRetakeAssessment = () => {
    localStorage.removeItem('assessmentAnswers');
    navigate('/assessment');
  };

  const handleShareResults = () => {
    toast({
      title: "Results Shared",
      description: "Your assessment results have been copied to clipboard."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error loading results</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-hero p-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleShareResults}
                className="text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="ghost"
                onClick={handleRetakeAssessment}
                className="text-white hover:bg-white/20"
              >
                Retake Assessment
              </Button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Your Assessment Results</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Technical Support Engineer Career Readiness Analysis
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge 
                variant="secondary" 
                className={`text-lg px-4 py-2 ${getCareerFitColor(results.careerFit)} bg-white/20 border-white/30`}
              >
                {getCareerFitLabel(results.careerFit)}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 border-white/30">
                {results.confidence}% Confidence
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Overall Score */}
          <div className="text-center">
            <div className="inline-block">
              <div className={`text-6xl font-bold ${getCareerFitColor(results.careerFit)} mb-2`}>
                {results.overallScore}
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-lg text-muted-foreground">Overall Career Readiness Score</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScoreCard
              title="Psychometric Fit"
              score={results.psychometricScore}
              description="Your personality traits, interests, and motivations align with technical support roles."
              variant="primary"
            />
            <ScoreCard
              title="Technical Readiness"
              score={results.technicalScore}
              description="Your current technical knowledge and problem-solving capabilities."
              variant={results.technicalScore >= 70 ? 'success' : results.technicalScore >= 50 ? 'warning' : 'destructive'}
            />
            <div className="md:col-span-2 lg:col-span-1">
              <WiscarRadar scores={results.wiscarScores} />
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alternative Careers */}
          {results.alternativeCareers.length > 0 && (
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  Alternative Career Paths
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Based on your profile, these roles might also be a good fit
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.alternativeCareers.map((career, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {career}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <div className="text-center bg-gradient-primary rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Take the next step towards your Technical Support Engineer career based on your personalized results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleRetakeAssessment}
                className="bg-white text-primary hover:bg-white/90"
              >
                Retake Assessment
              </Button>
              <Button 
                size="lg" 
                variant="ghost"
                className="text-white border-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}