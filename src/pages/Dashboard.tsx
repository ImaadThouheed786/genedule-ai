import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, FileCode, Globe, Plus, Play, Calendar } from "lucide-react";

interface Project {
  id: string;
  name: string;
  type: "python" | "web";
  lastModified: string;
  code?: {
    python?: string;
    html?: string;
    css?: string;
    js?: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Sample projects data - this will help understand backend storage structure
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "My First Python Game",
      type: "python",
      lastModified: "2024-01-15",
      code: {
        python: `# Simple number guessing game
import random

number = random.randint(1, 10)
guess = int(input("Guess a number between 1 and 10: "))

if guess == number:
    print("Congratulations! You guessed it right!")
else:
    print(f"Sorry! The number was {number}")
`
      }
    },
    {
      id: "2", 
      name: "Colorful Website",
      type: "web",
      lastModified: "2024-01-14",
      code: {
        html: `<!DOCTYPE html>
<html>
<head>
    <title>My Colorful Page</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my awesome colorful website.</p>
    <button onclick="changeColor()">Change Background</button>
</body>
</html>`,
        css: `body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 50px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background: white;
    cursor: pointer;
}`,
        js: `function changeColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}`
      }
    },
    {
      id: "3",
      name: "Calculator App",
      type: "python", 
      lastModified: "2024-01-13",
      code: {
        python: `# Simple calculator
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    return x / y

print("Simple Calculator")
print("1. Add")
print("2. Subtract") 
print("3. Multiply")
print("4. Divide")

choice = input("Enter choice (1/2/3/4): ")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if choice == '1':
    print(f"{num1} + {num2} = {add(num1, num2)}")
elif choice == '2':
    print(f"{num1} - {num2} = {subtract(num1, num2)}")
elif choice == '3':
    print(f"{num1} * {num2} = {multiply(num1, num2)}")
elif choice == '4':
    print(f"{num1} / {num2} = {divide(num1, num2)}")
else:
    print("Invalid input")
`
      }
    }
  ]);

  const handleProjectClick = (project: Project) => {
    if (project.type === "python") {
      navigate("/compiler/python", { state: { projectData: project } });
    } else {
      navigate("/compiler/web", { state: { projectData: project } });
    }
  };

  const handleNewProject = () => {
    navigate("/project/select-type");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-muted-foreground mt-2">Create amazing things with code!</p>
          </div>
          <Button onClick={handleNewProject} size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-border/50"
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.type === "python" ? (
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500">
                        <FileCode className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <Globe className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <Badge variant={project.type === "python" ? "default" : "secondary"}>
                      {project.type === "python" ? "Python" : "Web Dev"}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last modified: {project.lastModified}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {project.type === "python" ? (
                    <div className="flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      Python Project
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      HTML, CSS & JavaScript
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Code className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">Create your first project to get started!</p>
            <Button onClick={handleNewProject}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;