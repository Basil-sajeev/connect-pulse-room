import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare, 
  ScreenShare,
  Settings,
  MoreHorizontal
} from "lucide-react";

interface MeetingControlsProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  isChatOpen: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleChat: () => void;
  onLeaveMeeting: () => void;
}

export const MeetingControls = ({
  isVideoOn,
  isAudioOn,
  isChatOpen,
  onToggleVideo,
  onToggleAudio,
  onToggleChat,
  onLeaveMeeting
}: MeetingControlsProps) => {
  return (
    <div className="bg-controls-background border-t border-border/30 p-4">
      <div className="flex items-center justify-center gap-3">
        {/* Audio Control */}
        <Button
          onClick={onToggleAudio}
          variant={isAudioOn ? "default" : "destructive"}
          size="lg"
          className={`h-12 w-12 rounded-full p-0 transition-all hover:scale-105 ${
            isAudioOn 
              ? "bg-accent hover:bg-accent/80" 
              : "bg-destructive hover:bg-destructive/90"
          }`}
        >
          {isAudioOn ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </Button>

        {/* Video Control */}
        <Button
          onClick={onToggleVideo}
          variant={isVideoOn ? "default" : "destructive"}
          size="lg"
          className={`h-12 w-12 rounded-full p-0 transition-all hover:scale-105 ${
            isVideoOn 
              ? "bg-accent hover:bg-accent/80" 
              : "bg-destructive hover:bg-destructive/90"
          }`}
        >
          {isVideoOn ? (
            <Video className="w-5 h-5" />
          ) : (
            <VideoOff className="w-5 h-5" />
          )}
        </Button>

        {/* Screen Share */}
        <Button
          variant="secondary"
          size="lg"
          className="h-12 w-12 rounded-full p-0 transition-all hover:scale-105 bg-accent hover:bg-accent/80"
        >
          <ScreenShare className="w-5 h-5" />
        </Button>

        {/* Chat Toggle */}
        <Button
          onClick={onToggleChat}
          variant={isChatOpen ? "default" : "secondary"}
          size="lg"
          className={`h-12 w-12 rounded-full p-0 transition-all hover:scale-105 ${
            isChatOpen 
              ? "bg-primary hover:bg-primary/90" 
              : "bg-accent hover:bg-accent/80"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
        </Button>

        {/* More Options */}
        <Button
          variant="secondary"
          size="lg"
          className="h-12 w-12 rounded-full p-0 transition-all hover:scale-105 bg-accent hover:bg-accent/80"
        >
          <MoreHorizontal className="w-5 h-5" />
        </Button>

        {/* Leave Meeting */}
        <div className="ml-4">
          <Button
            onClick={onLeaveMeeting}
            variant="destructive"
            size="lg"
            className="h-12 px-6 rounded-full transition-all hover:scale-105 bg-destructive hover:bg-destructive/90"
          >
            <Phone className="w-5 h-5 mr-2 rotate-135" />
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
};