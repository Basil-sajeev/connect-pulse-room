import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoPlayer } from "@/components/meeting/VideoPlayer";
import { ChatPanel } from "@/components/meeting/ChatPanel";
import { MeetingControls } from "@/components/meeting/MeetingControls";
import { ParticipantsList } from "@/components/meeting/ParticipantsList";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare, 
  Users,
  Settings,
  MoreVertical,
  Copy,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isHost: boolean;
}

const Meeting = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "You",
      isVideoOn: true,
      isAudioOn: true,
      isHost: true
    },
    {
      id: "2",
      name: "Alice Johnson",
      isVideoOn: true,
      isAudioOn: true,
      isHost: false
    },
    {
      id: "3",
      name: "Bob Smith",
      isVideoOn: false,
      isAudioOn: true,
      isHost: false
    }
  ]);

  const copyMeetingLink = () => {
    const meetingLink = `${window.location.origin}/meeting/${meetingId}`;
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "Meeting link copied!",
      description: "Share this link with participants to join the meeting.",
    });
  };

  const leaveMeeting = () => {
    navigate("/");
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);

  return (
    <div className="h-screen bg-video-background flex flex-col">
      {/* Meeting Header */}
      <header className="flex items-center justify-between p-4 bg-controls-background border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">
              Meeting: {meetingId}
            </span>
          </div>
          <Button
            onClick={copyMeetingLink}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
            variant="ghost"
            size="sm"
            className={`${isParticipantsOpen ? 'bg-accent' : ''}`}
          >
            <Users className="w-4 h-4 mr-2" />
            {participants.length}
          </Button>
          
          <Button
            onClick={leaveMeeting}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Leave
          </Button>
        </div>
      </header>

      {/* Main Meeting Area */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className={`flex-1 transition-all ${isChatOpen ? 'mr-80' : ''} ${isParticipantsOpen ? 'ml-80' : ''}`}>
          <div className="h-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
              {participants.map((participant) => (
                <VideoPlayer
                  key={participant.id}
                  participant={participant}
                  isLocal={participant.id === "1"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <ChatPanel
            meetingId={meetingId || ""}
            onClose={() => setIsChatOpen(false)}
          />
        )}

        {/* Participants Panel */}
        {isParticipantsOpen && (
          <ParticipantsList
            participants={participants}
            onClose={() => setIsParticipantsOpen(false)}
          />
        )}
      </div>

      {/* Meeting Controls */}
      <MeetingControls
        isVideoOn={isVideoOn}
        isAudioOn={isAudioOn}
        isChatOpen={isChatOpen}
        onToggleVideo={toggleVideo}
        onToggleAudio={toggleAudio}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onLeaveMeeting={leaveMeeting}
      />
    </div>
  );
};

export default Meeting;