import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Video, Users, MessageSquare, Shield, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-meeting.jpg";

const Index = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const navigate = useNavigate();

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      navigate(`/meeting/${meetingCode}`);
    }
  };

  const handleCreateMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(2, 15);
    navigate(`/meeting/${newMeetingId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
                <Video className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Connect. Collaborate. Create.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Professional video meetings with real-time chat and seamless collaboration. 
              Join or host meetings in seconds with enterprise-grade security.
            </p>

            {/* Meeting Controls */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
              <div className="flex-1">
                <Input
                  placeholder="Enter meeting code"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                  className="bg-card border-border text-center text-lg h-12"
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinMeeting()}
                />
              </div>
              <Button 
                onClick={handleJoinMeeting} 
                size="lg"
                className="h-12 px-8 bg-gradient-primary hover:shadow-glow transition-all"
                disabled={!meetingCode.trim()}
              >
                Join
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px bg-border flex-1" />
              <span className="text-muted-foreground">or</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <Button 
              onClick={handleCreateMeeting}
              size="lg"
              variant="outline"
              className="h-12 px-8 border-primary/20 bg-gradient-glass backdrop-blur-sm hover:bg-primary/5 transition-all"
            >
              Start New Meeting
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for productive meetings
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for teams who value simplicity, security, and seamless collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-card border-border/50 shadow-meeting hover:shadow-glow transition-all group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">HD Video & Audio</CardTitle>
                <CardDescription>
                  Crystal clear video calls with adaptive quality and noise cancellation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-meeting hover:shadow-glow transition-all group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-success/10 w-fit mb-4 group-hover:bg-success/20 transition-colors">
                  <MessageSquare className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-xl">Real-time Chat</CardTitle>
                <CardDescription>
                  Instant messaging during meetings with file sharing and reactions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-meeting hover:shadow-glow transition-all group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-warning/10 w-fit mb-4 group-hover:bg-warning/20 transition-colors">
                  <Shield className="w-8 h-8 text-warning" />
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
                <CardDescription>
                  End-to-end encryption with enterprise-grade security standards
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">&lt; 200ms</div>
              <div className="text-muted-foreground">Latency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">50+</div>
              <div className="text-muted-foreground">Participants</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;