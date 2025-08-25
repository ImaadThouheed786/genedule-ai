import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Download, ExternalLink, Presentation, CheckCircle } from "lucide-react";

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    {
      id: 1,
      name: "Modern Education",
      description: "Clean, professional design perfect for academic content",
      preview: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop",
      color: "Blue & White",
      slides: 25,
      popular: true
    },
    {
      id: 2,
      name: "Creative Learning",
      description: "Vibrant, colorful template for engaging younger audiences",
      preview: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop",
      color: "Multicolor",
      slides: 30,
      popular: true
    },
    {
      id: 3,
      name: "Tech Innovation",
      description: "Modern tech-focused design with gradients and icons",
      preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
      color: "Purple & Cyan",
      slides: 20,
      popular: false
    },
    {
      id: 4,
      name: "Minimalist",
      description: "Simple, clean design that focuses on content",
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=225&fit=crop",
      color: "Black & White",
      slides: 15,
      popular: false
    },
    {
      id: 5,
      name: "Nature Learning",
      description: "Earth-toned template perfect for science courses",
      preview: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop",
      color: "Green & Brown",
      slides: 28,
      popular: false
    },
    {
      id: 6,
      name: "Interactive Gaming",
      description: "Perfect for game development and coding courses",
      preview: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
      color: "Neon Colors",
      slides: 35,
      popular: true
    }
  ];

  const generateSlides = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate Google Slides generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would open the generated Google Slides
      alert("Google Slides presentation generated successfully! Opening in new tab...");
      navigate("/teacher/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/teacher/course/create")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-ai-primary shadow-glow">
                  <Presentation className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Google Slides Templates</h1>
                  <p className="text-sm text-muted-foreground">Choose a template for your course presentation</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={generateSlides}
              disabled={!selectedTemplate || isGenerating}
              variant="ai"
              size="lg"
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Brain className="h-4 w-4 animate-ai-pulse" />
                  Generating Slides...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Generate Google Slides
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Select Your Presentation Template
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of professionally designed Google Slides templates. 
              Your course content will be automatically populated into the selected template.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-ai ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-primary shadow-glow border-primary/50' 
                    : 'border-border/50 hover:border-primary/30'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="relative">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {template.popular && (
                    <Badge className="absolute top-3 right-3 bg-gradient-learning">
                      Popular
                    </Badge>
                  )}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 left-3 p-1 rounded-full bg-success">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Color Scheme:</span>
                    <span className="font-medium text-foreground">{template.color}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Slide Layouts:</span>
                    <span className="font-medium text-foreground">{template.slides}</span>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant={selectedTemplate === template.id ? "ai" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {selectedTemplate === template.id ? "Selected" : "Select Template"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Template Info */}
          {selectedTemplate && (
            <Card className="border-border/50 shadow-ai bg-gradient-to-r from-card to-muted/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Template Selected: {templates.find(t => t.id === selectedTemplate)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your course content will be generated into Google Slides using this template. 
                      This process will create a complete presentation with all your weeks, slides, and quiz questions.
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Preview Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;