import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, Globe, ArrowLeft, Sparkles } from "lucide-react";

const ProjectTypeSelect = () => {
  const navigate = useNavigate();

  const handlePythonSelect = () => {
    navigate("/compiler/python");
  };

  const handleWebDevSelect = () => {
    navigate("/compiler/web");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Adventure!
          </h1>
          <p className="text-xl text-muted-foreground">
            What type of project would you like to create today?
          </p>
        </div>

        {/* Project Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card 
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-border/50 relative overflow-hidden"
            onClick={handlePythonSelect}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10" />
            <CardHeader className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
                  <FileCode className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Python Playground</CardTitle>
              <CardDescription className="text-center text-base">
                Create games, solve problems, and learn programming with Python
              </CardDescription>
            </CardHeader>
            <CardContent className="relative text-center space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Perfect for beginners</span>
                </div>
                <div>Build calculators, games, and more!</div>
              </div>
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Start Python Project
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-border/50 relative overflow-hidden"
            onClick={handleWebDevSelect}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
            <CardHeader className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                  <Globe className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Web Development</CardTitle>
              <CardDescription className="text-center text-base">
                Build amazing websites with HTML, CSS, and JavaScript
              </CardDescription>
            </CardHeader>
            <CardContent className="relative text-center space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Create interactive websites</span>
                </div>
                <div>HTML, CSS & JavaScript all in one!</div>
              </div>
              <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Start Web Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeSelect;