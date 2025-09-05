import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, RotateCcw, Save, FileCode } from "lucide-react";

const PythonCompiler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectData = location.state?.projectData;
  
  const [code, setCode] = useState(
    projectData?.code?.python || 
    `# Welcome to Python Playground!
# Write your Python code here and click Run to see the output

print("Hello, World!")
print("Let's start coding!")

# Try some basic Python:
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")

# Simple math
x = 5
y = 3
print(f"{x} + {y} = {x + y}")
`
  );
  
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [inputs, setInputs] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Simulate Python execution (in a real app, this would call a backend service)
  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setInputs([]);
    setCurrentInputIndex(0);
    setWaitingForInput(false);
    
    try {
      // This is a simulation - in a real app, you'd send code to a Python execution service
      await simulatePythonExecution(code);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const simulatePythonExecution = async (pythonCode: string): Promise<void> => {
    const lines = pythonCode.split('\n');
    let simulatedOutput = "";
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip comments and empty lines
      if (trimmedLine.startsWith('#') || trimmedLine === '') continue;
      
      // Simulate print statements
      if (trimmedLine.startsWith('print(')) {
        const printContent = trimmedLine.match(/print\((.*)\)/)?.[1];
        if (printContent) {
          // Handle f-strings and variables (very basic simulation)
          if (printContent.includes('f"') || printContent.includes("f'")) {
            // Simple f-string handling
            let output = printContent.replace(/f["'](.*)["']/, '$1');
            output = output.replace(/\{name\}/g, 'Student'); // Simulate variable
            output = output.replace(/\{x\}/g, '5');
            output = output.replace(/\{y\}/g, '3');
            output = output.replace(/\{x \+ y\}/g, '8');
            simulatedOutput += output.replace(/['"]/g, '') + '\n';
          } else {
            // Regular string
            simulatedOutput += printContent.replace(/['"]/g, '') + '\n';
          }
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate execution time
      }
      
      // Simulate input statements
      if (trimmedLine.includes('input(')) {
        const promptMatch = trimmedLine.match(/input\(["'](.*?)["']\)/);
        if (promptMatch) {
          simulatedOutput += promptMatch[1];
          setOutput(simulatedOutput);
          setWaitingForInput(true);
          
          // Wait for user input
          await new Promise<void>((resolve) => {
            const checkForInput = () => {
              if (!waitingForInput) {
                resolve();
              } else {
                setTimeout(checkForInput, 100);
              }
            };
            checkForInput();
          });
        }
      }
    }
    
    setOutput(simulatedOutput);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      setInputs([...inputs, inputValue]);
      setOutput(prev => prev + inputValue + '\n');
      setInputValue("");
      setWaitingForInput(false);
      setCurrentInputIndex(prev => prev + 1);
    }
  };

  const resetCode = () => {
    setCode(`# Welcome to Python Playground!
# Write your Python code here and click Run to see the output

print("Hello, World!")
print("Let's start coding!")
`);
    setOutput("");
  };

  const saveProject = () => {
    // In a real app, this would save to the backend
    console.log("Saving project:", { code, projectData });
    // Show success message
    alert("Project saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500">
                <FileCode className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Python Playground</h1>
                <p className="text-sm text-muted-foreground">
                  {projectData?.name || "New Python Project"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetCode}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" onClick={saveProject}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button 
              onClick={runCode} 
              disabled={isRunning}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>

        {/* Code Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Python Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your Python code here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[500px] bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-auto">
                {output && (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                )}
                {waitingForInput && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                      className="bg-transparent border border-green-400 rounded px-2 py-1 text-green-400"
                      placeholder="Enter your input..."
                      autoFocus
                    />
                    <Button size="sm" onClick={handleInputSubmit}>
                      Submit
                    </Button>
                  </div>
                )}
                {!output && !isRunning && (
                  <div className="text-gray-500">
                    Click "Run Code" to see output here...
                  </div>
                )}
                {isRunning && (
                  <div className="text-yellow-400 animate-pulse">
                    Running your code...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PythonCompiler;