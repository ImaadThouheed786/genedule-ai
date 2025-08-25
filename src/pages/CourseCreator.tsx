import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Brain, Send, Save, FileText, MessageCircle, BookOpen, Sparkles, Plus, Trash2 } from "lucide-react";

interface WeekObjective {
  week: number;
  objective: string;
}

interface CourseData {
  [key: string]: {
    objectives: string;
    slides: Array<{
      title: string;
      explanation: string;
      extra?: string;
    }>;
    quiz: Array<{
      question: string;
      options: string[];
      answer: string;
    }>;
  };
}

const CourseCreator = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseGenerated, setCourseGenerated] = useState(false);
  
  // Course Input Data
  const [title, setTitle] = useState("");
  const [weeks, setWeeks] = useState(4);
  const [weekObjectives, setWeekObjectives] = useState<WeekObjective[]>([
    { week: 1, objective: "" },
    { week: 2, objective: "" },
    { week: 3, objective: "" },
    { week: 4, objective: "" }
  ]);
  const [extraPrompts, setExtraPrompts] = useState("");
  
  // Notes
  const [notes, setNotes] = useState("");
  
  // Generated Course Data
  const [generatedCourse, setGeneratedCourse] = useState<CourseData>({});
  
  // Chat
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [chatInput, setChatInput] = useState("");

  const updateWeekObjectives = (newWeeks: number) => {
    setWeeks(newWeeks);
    const newObjectives = [];
    for (let i = 1; i <= newWeeks; i++) {
      const existing = weekObjectives.find(obj => obj.week === i);
      newObjectives.push({
        week: i,
        objective: existing?.objective || ""
      });
    }
    setWeekObjectives(newObjectives);
  };

  const generateCourse = async () => {
    setIsGenerating(true);
    
    // Simulate AI course generation
    setTimeout(() => {
      const mockCourseData: CourseData = {
        week1: {
          objectives: weekObjectives[0]?.objective || "Introduction to the Roblox Studio, understanding its interface, and learning about basic tools",
          slides: [
            {
              title: "Welcome to Roblox Studio",
              explanation: "Imagine Roblox Studio as a big toolbox. Just like a painter uses brushes and colors to create art, we use Roblox Studio to create amazing games!",
              extra: "https://developer.roblox.com/en-us/learn-roblox/studio-basics"
            },
            {
              title: "Understanding the Interface",
              explanation: "The Roblox Studio interface is like the control room of a spaceship. It has many buttons and switches (menus and tools) that help us navigate through our game creation journey.",
              extra: "https://developer.roblox.com/en-us/articles/Studio-Interface"
            },
            {
              title: "Basic Tools",
              explanation: "In our toolbox, we have many tools. Some of these include the Select, Move, Scale, and Rotate tools. They are like our magic wands that help us shape our game world.",
              extra: "https://developer.roblox.com/en-us/articles/Basic-Object-Manipulation"
            }
          ],
          quiz: [
            {
              question: "What is Roblox Studio?",
              options: ["A game", "A movie", "A toolbox for creating games", "A painting"],
              answer: "A toolbox for creating games"
            },
            {
              question: "What does the interface of Roblox Studio contain?",
              options: ["Menus and tools", "Games and movies", "Paintings and art", "Books and novels"],
              answer: "Menus and tools"
            }
          ]
        },
        week2: {
          objectives: weekObjectives[1]?.objective || "Starting with the basics of game creation in Roblox Studio, including scripting and building",
          slides: [
            {
              title: "Intro to Building",
              explanation: "Building in Roblox Studio is like building with digital Lego blocks. We can use different shapes and colors to create anything we can imagine!",
              extra: "https://developer.roblox.com/en-us/articles/Building"
            },
            {
              title: "Intro to Scripting",
              explanation: "Scripting is like teaching our game characters and objects what to do. We use a language called Lua to write these scripts.",
              extra: "https://developer.roblox.com/en-us/articles/Intro-to-Scripting"
            }
          ],
          quiz: [
            {
              question: "What is building in Roblox Studio similar to?",
              options: ["Building with Lego blocks", "Painting a picture", "Writing a book", "Playing a game"],
              answer: "Building with Lego blocks"
            }
          ]
        }
      };
      
      setGeneratedCourse(mockCourseData);
      setCourseGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: chatInput },
      { role: 'ai' as const, content: "I can help you refine your course content. What specific changes would you like to make?" }
    ];
    
    setChatMessages(newMessages);
    setChatInput("");
  };

  const saveCourse = () => {
    navigate("/teacher/course/templates");
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
                onClick={() => navigate("/teacher/dashboard")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-ai-primary shadow-glow">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">AI Course Builder</h1>
                  <p className="text-sm text-muted-foreground">Create intelligent learning experiences</p>
                </div>
              </div>
            </div>
            {courseGenerated && (
              <Button 
                onClick={saveCourse}
                variant="success"
                size="lg"
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Course
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* Course Generator Panel */}
          {!courseGenerated && (
            <div className="col-span-12 lg:col-span-6">
              <Card className="h-full border-border/50 shadow-ai">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Course Generator
                  </CardTitle>
                  <CardDescription>
                    Define your course parameters and let AI create the content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Course Title</Label>
                          <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title"
                            className="bg-input border-border"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="weeks">Number of Weeks</Label>
                          <Input
                            id="weeks"
                            type="number"
                            min="1"
                            max="24"
                            value={weeks}
                            onChange={(e) => updateWeekObjectives(parseInt(e.target.value) || 1)}
                            className="bg-input border-border"
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Week Objectives */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Weekly Objectives</h3>
                        {weekObjectives.map((weekObj) => (
                          <div key={weekObj.week} className="space-y-2">
                            <Label>Week {weekObj.week} Objective</Label>
                            <Textarea
                              value={weekObj.objective}
                              onChange={(e) => {
                                const updated = weekObjectives.map(obj => 
                                  obj.week === weekObj.week 
                                    ? { ...obj, objective: e.target.value }
                                    : obj
                                );
                                setWeekObjectives(updated);
                              }}
                              placeholder={`What should students learn in week ${weekObj.week}?`}
                              className="bg-input border-border min-h-[80px]"
                            />
                          </div>
                        ))}
                      </div>

                      <Separator />

                      {/* Extra Prompts */}
                      <div className="space-y-2">
                        <Label htmlFor="prompts">Additional Instructions</Label>
                        <Textarea
                          id="prompts"
                          value={extraPrompts}
                          onChange={(e) => setExtraPrompts(e.target.value)}
                          placeholder="Any specific requirements, teaching style, or additional context for the AI..."
                          className="bg-input border-border min-h-[100px]"
                        />
                      </div>

                      <Button 
                        onClick={generateCourse}
                        disabled={isGenerating || !title.trim()}
                        variant="ai"
                        size="lg"
                        className="w-full"
                      >
                        {isGenerating ? (
                          <>
                            <Brain className="h-4 w-4 animate-ai-pulse" />
                            Generating Course...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Generate Course with AI
                          </>
                        )}
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notes Panel */}
          <div className={`${courseGenerated ? 'col-span-12 lg:col-span-4' : 'col-span-12 lg:col-span-6'}`}>
            <Card className="h-full border-border/50 shadow-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Notes
                </CardTitle>
                <CardDescription>
                  Keep track of your ideas and modifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes, ideas, and modifications here..."
                  className="bg-input border-border min-h-[400px] resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Generated Course Panel */}
          {courseGenerated && (
            <div className="col-span-12 lg:col-span-4">
              <Card className="h-full border-border/50 shadow-ai">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Generated Course
                  </CardTitle>
                  <CardDescription>
                    Review and edit your AI-generated content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {Object.entries(generatedCourse).map(([weekKey, weekData]) => (
                        <div key={weekKey} className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="bg-gradient-ai-primary">
                              {weekKey.replace('week', 'Week ')}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Objectives</Label>
                            <Textarea
                              value={weekData.objectives}
                              onChange={(e) => {
                                setGeneratedCourse(prev => ({
                                  ...prev,
                                  [weekKey]: {
                                    ...prev[weekKey],
                                    objectives: e.target.value
                                  }
                                }));
                              }}
                              className="bg-input border-border text-sm"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Slides ({weekData.slides.length})</Label>
                            {weekData.slides.map((slide, index) => (
                              <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                                <Input
                                  value={slide.title}
                                  onChange={(e) => {
                                    const updatedSlides = [...weekData.slides];
                                    updatedSlides[index] = { ...slide, title: e.target.value };
                                    setGeneratedCourse(prev => ({
                                      ...prev,
                                      [weekKey]: {
                                        ...prev[weekKey],
                                        slides: updatedSlides
                                      }
                                    }));
                                  }}
                                  className="text-sm font-medium bg-background"
                                  placeholder="Slide title"
                                />
                                <Textarea
                                  value={slide.explanation}
                                  onChange={(e) => {
                                    const updatedSlides = [...weekData.slides];
                                    updatedSlides[index] = { ...slide, explanation: e.target.value };
                                    setGeneratedCourse(prev => ({
                                      ...prev,
                                      [weekKey]: {
                                        ...prev[weekKey],
                                        slides: updatedSlides
                                      }
                                    }));
                                  }}
                                  className="text-xs bg-background"
                                  placeholder="Slide explanation"
                                  rows={2}
                                />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Quiz Questions ({weekData.quiz.length})</Label>
                            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                              {weekData.quiz.length} questions generated
                            </div>
                          </div>

                          <Separator />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chat Panel */}
          {courseGenerated && (
            <div className="col-span-12 lg:col-span-4">
              <Card className="h-full border-border/50 shadow-ai">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Make changes and get help with your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-[500px]">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {chatMessages.length === 0 && (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          Ask me anything about your course!
                          <br />
                          I can help you modify content, add new sections, or answer questions.
                        </div>
                      )}
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg text-sm ${
                              message.role === 'user'
                                ? 'bg-gradient-ai-primary text-white'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask AI to modify your course..."
                      className="bg-input border-border"
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button 
                      onClick={sendChatMessage}
                      variant="ai"
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;