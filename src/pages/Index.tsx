import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, GraduationCap, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-3xl bg-gradient-ai-primary shadow-glow animate-ai-pulse">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-ai-primary bg-clip-text text-transparent leading-tight">
                Welcome
              </h1>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="space-y-4 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-gradient-neural">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">For Teachers</h3>
              <p className="text-muted-foreground">
                Create comprehensive courses with AI-generated content, slides, and assessments in minutes
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-gradient-learning">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">For Students</h3>
              <p className="text-muted-foreground">
                Engage with interactive content and personalized learning experiences powered by AI
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <Button 
              onClick={() => navigate("/login")}
              variant="ai"
              size="xl"
              className="gap-3 text-lg px-12 py-6"
            >
              <Sparkles className="h-6 w-6" />
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Experience the future of education with artificial intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
