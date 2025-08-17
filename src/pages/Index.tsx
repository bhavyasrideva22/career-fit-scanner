import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Target, Users, Brain, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = () => {
    setIsStarting(true);
    // Small delay for better UX
    setTimeout(() => {
      navigate('/assessment');
    }, 500);
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Assess personality traits and motivations"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Technical Aptitude",
      description: "Test your current technical knowledge"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Evaluate readiness across 6 key dimensions"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Get personalized recommendations"
    }
  ];

  const traits = [
    "Empathy & Patience",
    "Analytical Thinking", 
    "Technical Curiosity",
    "Strong Communication",
    "Structured Problem-Solving",
    "High Emotional Intelligence"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
            Career Assessment Tool
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Should I Become a <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Technical Support Engineer?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Discover if a Technical Support Engineer career aligns with your interests, skills, and goals through our comprehensive AI-powered assessment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              onClick={handleStartAssessment}
              disabled={isStarting}
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-glow transform hover:scale-105 transition-all duration-300"
            >
              {isStarting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin mr-2"></div>
                  Starting Assessment...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Start Assessment
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4" />
              <span>~25 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* What is TSE Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What is a Technical Support Engineer?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A Technical Support Engineer helps users troubleshoot hardware, software, or network issues, 
              offering guidance, escalation support, and product education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Diagnose and resolve technical issues",
                  "Provide customer support via multiple channels",
                  "Document solutions and create knowledge base articles",
                  "Escalate complex issues to specialized teams",
                  "Train users on product features and best practices"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Career Progression</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "L1/L2/L3 Support Engineer",
                  "IT Helpdesk Engineer", 
                  "Customer Success Engineer",
                  "Technical Account Manager",
                  "Product Support Specialist"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Traits Section */}
          <Card className="bg-gradient-card shadow-card mb-12">
            <CardHeader className="text-center">
              <CardTitle>Traits That Succeed in This Role</CardTitle>
              <p className="text-muted-foreground">
                Our assessment evaluates how well you align with these key characteristics
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {traits.map((trait, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assessment Features */}
      <div className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our multi-dimensional approach evaluates your readiness across psychology, technical skills, and career alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Discover Your Career Fit?</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Take our comprehensive assessment to get personalized insights, recommendations, and a clear path forward.
          </p>
          
          <Button 
            size="lg" 
            onClick={handleStartAssessment}
            disabled={isStarting}
            className="bg-gradient-primary hover:shadow-glow px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            {isStarting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                Starting Assessment...
              </>
            ) : (
              <>
                <Target className="w-5 h-5 mr-2" />
                Begin Your Assessment
              </>
            )}
          </Button>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Free Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>25 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
