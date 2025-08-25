import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Users, Brain, Sparkles } from "lucide-react";

const Login = () => {
  const [userType, setUserType] = useState<"teacher" | "student" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === "teacher") {
      navigate("/teacher/dashboard");
    } else if (userType === "student") {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-gradient-ai-primary shadow-glow">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-ai-primary bg-clip-text text-transparent">
                Welcome
              </h1>
            </div>
          </div>

          {!userType ? (
            /* User Type Selection */
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center text-foreground">
                Choose Your Role
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-ai hover:scale-105 border-border/50"
                  onClick={() => setUserType("teacher")}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-xl bg-gradient-neural">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Teacher</h3>
                      <p className="text-sm text-muted-foreground">Create and manage courses</p>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-ai hover:scale-105 border-border/50"
                  onClick={() => setUserType("student")}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-xl bg-gradient-learning">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Student</h3>
                      <p className="text-sm text-muted-foreground">Learn and engage</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Login Form */
            <Card className="border-border/50 shadow-ai">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {userType === "teacher" ? (
                    <>
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Teacher Login
                    </>
                  ) : (
                    <>
                      <Users className="h-5 w-5 text-primary" />
                      Student Login
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access the AI learning platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-3 pt-2">
                  <Button 
                    onClick={handleLogin}
                    variant="ai"
                    size="lg"
                    className="w-full"
                  >
                    <Sparkles className="h-4 w-4" />
                    Enter AI Platform
                  </Button>
                  <Button 
                    onClick={() => setUserType(null)}
                    variant="ghost"
                    className="w-full"
                  >
                    Back to Role Selection
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

export default Login;