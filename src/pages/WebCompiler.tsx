import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, RotateCcw, Save, Globe } from "lucide-react";

const WebCompiler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectData = location.state?.projectData;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const [html, setHtml] = useState(
    projectData?.code?.html || 
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Amazing Website</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first web page. Let's make it awesome!</p>
    
    <button onclick="sayHello()">Click Me!</button>
    
    <div id="output"></div>
</body>
</html>`
  );
  
  const [css, setCss] = useState(
    projectData?.code?.css ||
    `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 50px;
    margin: 0;
}

h1 {
    font-size: 3em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 20px;
}

p {
    font-size: 1.2em;
    margin-bottom: 30px;
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #ff5252;
    transform: scale(1.05);
}

#output {
    margin-top: 20px;
    font-size: 1.5em;
}`
  );
  
  const [js, setJs] = useState(
    projectData?.code?.js ||
    `function sayHello() {
    const output = document.getElementById('output');
    const messages = [
        'Hello there! 👋',
        'You clicked the button! 🎉',
        'Awesome job! ⭐',
        'Keep coding! 💻',
        'You are amazing! ✨'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    output.innerHTML = randomMessage;
    
    // Add some fun colors
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    output.style.color = randomColor;
}`
  );

  // Update preview when code changes
  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  const updatePreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        const fullHtml = html.replace(
          '</head>',
          `<style>${css}</style></head>`
        ).replace(
          '</body>',
          `<script>${js}</script></body>`
        );
        
        iframeDoc.open();
        iframeDoc.write(fullHtml);
        iframeDoc.close();
      }
    }
  };

  const runCode = () => {
    updatePreview();
  };

  const resetCode = () => {
    setHtml(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Amazing Website</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first web page. Let's make it awesome!</p>
    
    <button onclick="sayHello()">Click Me!</button>
    
    <div id="output"></div>
</body>
</html>`);
    
    setCss(`body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 50px;
    margin: 0;
}

h1 {
    font-size: 3em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 20px;
}

p {
    font-size: 1.2em;
    margin-bottom: 30px;
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #ff5252;
    transform: scale(1.05);
}

#output {
    margin-top: 20px;
    font-size: 1.5em;
}`);
    
    setJs(`function sayHello() {
    const output = document.getElementById('output');
    const messages = [
        'Hello there! 👋',
        'You clicked the button! 🎉',
        'Awesome job! ⭐',
        'Keep coding! 💻',
        'You are amazing! ✨'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    output.innerHTML = randomMessage;
    
    // Add some fun colors
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    output.style.color = randomColor;
}`);
  };

  const saveProject = () => {
    // In a real app, this would save to the backend
    console.log("Saving project:", { html, css, js, projectData });
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
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Web Development Studio</h1>
                <p className="text-sm text-muted-foreground">
                  {projectData?.name || "New Web Project"}
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
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </Button>
          </div>
        </div>

        {/* Code Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editors */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="html" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                </TabsList>
                
                <TabsContent value="html" className="mt-4">
                  <Textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    placeholder="Write your HTML here..."
                    className="min-h-[400px] font-mono text-sm resize-none"
                  />
                </TabsContent>
                
                <TabsContent value="css" className="mt-4">
                  <Textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    placeholder="Write your CSS here..."
                    className="min-h-[400px] font-mono text-sm resize-none"
                  />
                </TabsContent>
                
                <TabsContent value="js" className="mt-4">
                  <Textarea
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    placeholder="Write your JavaScript here..."
                    className="min-h-[400px] font-mono text-sm resize-none"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                ref={iframeRef}
                className="w-full h-[500px] border rounded-md bg-white"
                title="Website Preview"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebCompiler;