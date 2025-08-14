import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Crown, 
  MoreVertical,
  UserMinus,
  Volume2,
  VolumeX
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isHost: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
  onClose: () => void;
}

export const ParticipantsList = ({ participants, onClose }: ParticipantsListProps) => {
  const handleMuteParticipant = (participantId: string) => {
    console.log("Mute participant:", participantId);
  };

  const handleRemoveParticipant = (participantId: string) => {
    console.log("Remove participant:", participantId);
  };

  return (
    <Card className="fixed left-0 top-0 h-full w-80 bg-chat-background border-r border-border/30 shadow-meeting">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/30">
        <CardTitle className="text-lg">
          Participants ({participants.length})
        </CardTitle>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground truncate">
                  {participant.name}
                </span>
                {participant.isHost && (
                  <Crown className="w-4 h-4 text-warning" />
                )}
                {participant.id === "1" && (
                  <Badge variant="secondary" className="text-xs">
                    You
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                {participant.isAudioOn ? (
                  <div className="flex items-center gap-1 text-success">
                    <Mic className="w-3 h-3" />
                    <span className="text-xs">Audio on</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MicOff className="w-3 h-3" />
                    <span className="text-xs">Muted</span>
                  </div>
                )}
                
                {participant.isVideoOn ? (
                  <div className="flex items-center gap-1 text-primary">
                    <Video className="w-3 h-3" />
                    <span className="text-xs">Video on</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <VideoOff className="w-3 h-3" />
                    <span className="text-xs">Video off</span>
                  </div>
                )}
              </div>
            </div>

            {/* Participant Actions (only show for others if you're host) */}
            {participant.id !== "1" && participants.find(p => p.id === "1")?.isHost && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-accent"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleMuteParticipant(participant.id)}
                    className="text-warning"
                  >
                    {participant.isAudioOn ? (
                      <>
                        <VolumeX className="w-4 h-4 mr-2" />
                        Mute participant
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Unmute participant
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className="text-destructive"
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Remove from meeting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};