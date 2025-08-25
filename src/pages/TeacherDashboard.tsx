import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Users, TrendingUp, Brain, Sparkles, Calendar, Clock } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [courses] = useState([
    {
      id: 1,
      title: "Roblox Game Development for Kids",
      description: "Learn the basics of creating games in Roblox Studio",
      students: 24,
      weeks: 8,
      status: "active",
      progress: 75,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Introduction to Python Programming",
      description: "Start your coding journey with Python",
      students: 18,
      weeks: 12,
      status: "active",
      progress: 45,
      createdAt: "2024-02-01"
    },
    {
      id: 3,
      title: "Web Development Fundamentals",
      description: "HTML, CSS, and JavaScript basics",
      students: 32,
      weeks: 10,
      status: "completed",
      progress: 100,
      createdAt: "2023-12-10"
    }
  ]);

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const activeCourses = courses.filter(course => course.status === "active").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-ai-primary shadow-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI TeachLearn</h1>
                <p className="text-sm text-muted-foreground">Teacher Dashboard</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/teacher/course/create")}
              variant="ai"
              size="lg"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Generate New Course
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/50 shadow-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold text-foreground">{courses.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-neural">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-learning">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-3xl font-bold text-foreground">{activeCourses}</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-ai-secondary">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
            <Button variant="outline" size="sm">
              View Analytics
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="border-border/50 shadow-ai hover:shadow-neural transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={course.status === "active" ? "default" : "secondary"}
                      className={course.status === "active" ? "bg-success" : ""}
                    >
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {course.weeks} weeks
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-ai-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Created {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Create New Course Card */}
            <Card 
              className="border-dashed border-2 border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-ai"
              onClick={() => navigate("/teacher/course/create")}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-ai-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Create New Course</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use AI to generate a new learning experience
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;