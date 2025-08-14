import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, Maximize2, Pin } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isHost: boolean;
}

interface VideoPlayerProps {
  participant: Participant;
  isLocal?: boolean;
}

export const VideoPlayer = ({ participant, isLocal = false }: VideoPlayerProps) => {
  return (
    <Card className="relative bg-card border-border/30 overflow-hidden group hover:shadow-video transition-all">
      <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/80 flex items-center justify-center relative">
        {participant.isVideoOn ? (
          // Video placeholder - in real implementation, this would be a video element
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Camera Active</p>
            </div>
          </div>
        ) : (
          // Avatar when video is off
          <div className="flex items-center justify-center">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Video Controls Overlay */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-background/80 hover:bg-background">
            <Pin className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-background/80 hover:bg-background">
            <Maximize2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Participant Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {participant.name} {isLocal && "(You)"}
              </span>
              {participant.isHost && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                  Host
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {participant.isAudioOn ? (
                <div className="p-1 bg-success/20 rounded">
                  <Mic className="w-3 h-3 text-success" />
                </div>
              ) : (
                <div className="p-1 bg-destructive/20 rounded">
                  <MicOff className="w-3 h-3 text-destructive" />
                </div>
              )}
              
              {!participant.isVideoOn && (
                <div className="p-1 bg-muted/50 rounded">
                  <VideoOff className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};