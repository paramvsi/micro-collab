'use client';

/**
 * SessionChat Component
 * Real-time chat interface for collaboration sessions
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'code' | 'system';
  created_at: string;
}

interface SessionChatProps {
  sessionId: string;
  currentUserId: string;
  otherUser: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
  };
}

export function SessionChat({ sessionId, currentUserId, otherUser }: SessionChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender_id: 'system',
      content: 'Session started. Good luck with your collaboration!',
      type: 'system',
      created_at: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender_id: currentUserId,
      content: inputValue,
      type: 'text',
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-brand-purple/20 bg-dark-card/80 backdrop-blur-sm px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Chat</h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender_id === currentUserId}
              otherUser={otherUser}
            />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-steel text-sm"
          >
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.3s]" />
              <div className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.15s]" />
              <div className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce" />
            </div>
            <span>{otherUser.name} is typing...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-brand-purple/20 bg-dark-card/80 backdrop-blur-sm p-4">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 flex-shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full resize-none rounded-lg border border-brand-purple/20 bg-dark-card px-4 py-2.5 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/40 focus:outline-none focus:ring-1 focus:ring-brand-purple/40"
            />
          </div>

          {/* Emoji Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 flex-shrink-0"
          >
            <Smile className="h-4 w-4" />
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="sm"
            className="h-10 w-10 p-0 flex-shrink-0 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  otherUser: {
    name: string;
    avatar_url?: string;
  };
}

function MessageBubble({ message, isOwn, otherUser }: MessageBubbleProps) {
  if (message.type === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center"
      >
        <div className="px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20">
          <p className="text-xs text-steel">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
      className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isOwn && (
        <div className="flex-shrink-0">
          {otherUser.avatar_url ? (
            <Image
              src={otherUser.avatar_url}
              alt={otherUser.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {otherUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwn
              ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white'
              : 'bg-dark-card/80 border border-brand-purple/20 text-white'
          }`}
        >
          <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-steel/60 mt-1 px-1">
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
        </span>
      </div>
    </motion.div>
  );
}
