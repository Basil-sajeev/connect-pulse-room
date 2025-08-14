import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, X, Smile } from "lucide-react";

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface ChatPanelProps {
  meetingId: string;
  onClose: () => void;
}

export const ChatPanel = ({ meetingId, onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      userId: "system",
      userName: "System",
      message: "Welcome to the meeting! Feel free to chat with other participants.",
      timestamp: new Date(Date.now() - 300000),
      isSystem: true
    },
    {
      id: "2",
      userId: "2",
      userName: "Alice Johnson",
      message: "Hey everyone! Looking forward to our discussion today.",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: "3",
      userId: "3",
      userName: "Bob Smith",
      message: "Good morning! The presentation looks great so far.",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: "1",
        userName: "You",
        message: newMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="fixed right-0 top-0 h-full w-80 bg-chat-background border-l border-border/30 shadow-meeting">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/30">
        <CardTitle className="text-lg">Meeting Chat</CardTitle>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isSystem ? 'justify-center' : ''}`}>
                {message.isSystem ? (
                  <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    {message.message}
                  </div>
                ) : (
                  <>
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {message.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {message.userName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground break-words">
                        {message.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border/30 bg-controls-background">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-background border-border pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-accent"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              size="sm"
              className="h-10 w-10 p-0 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};