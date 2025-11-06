"use client";

import { useState } from "react";
import { Star, ThumbsUp, Award, Zap, Heart, MessageSquare, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  helperName: string;
  onSubmit?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  rating: number;
  tags: string[];
  comment: string;
  isPublic: boolean;
}

const feedbackTags = [
  { id: "helpful", label: "Helpful", icon: ThumbsUp },
  { id: "expert", label: "Expert", icon: Award },
  { id: "patient", label: "Patient", icon: Heart },
  { id: "responsive", label: "Responsive", icon: Zap },
  { id: "clear", label: "Clear Communicator", icon: MessageSquare },
];

export function FeedbackModal({
  open,
  onOpenChange,
  sessionId,
  helperName,
  onSubmit,
}: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      rating,
      tags: selectedTags,
      comment,
      isPublic,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(feedbackData);
    }

    setIsSubmitting(false);
    onOpenChange(false);

    // Reset form
    setRating(0);
    setSelectedTags([]);
    setComment("");
    setIsPublic(true);
  };

  const handleSkip = () => {
    onOpenChange(false);
    // Reset form
    setRating(0);
    setSelectedTags([]);
    setComment("");
    setIsPublic(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            Rate Your Session
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            How was your experience with {helperName}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="space-y-3">
            <Label className="text-slate-300">Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-lg font-medium text-white">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                    ? "Great!"
                    : rating === 3
                    ? "Good"
                    : rating === 2
                    ? "Okay"
                    : "Poor"}
                </span>
              )}
            </div>
            {rating === 0 && (
              <p className="text-xs text-slate-500">
                Please select a rating to continue
              </p>
            )}
          </div>

          {/* Feedback Tags */}
          {rating > 0 && (
            <div className="space-y-3">
              <Label className="text-slate-300">
                What did you like? (Optional)
              </Label>
              <div className="flex flex-wrap gap-2">
                {feedbackTags.map((tag) => {
                  const Icon = tag.icon;
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <Badge
                      key={tag.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-colors py-2 px-3 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "border-slate-700 text-slate-300 hover:bg-slate-700"
                      }`}
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {tag.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comment */}
          {rating > 0 && (
            <div className="space-y-3">
              <Label htmlFor="comment" className="text-slate-300">
                Additional Comments (Optional)
              </Label>
              <textarea
                id="comment"
                rows={4}
                placeholder={
                  rating >= 4
                    ? "Share what made this session great..."
                    : "Help us understand how we can improve..."
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                maxLength={500}
              />
              <p className="text-xs text-slate-500">{comment.length}/500 characters</p>
            </div>
          )}

          {/* Public/Private Toggle */}
          {rating > 0 && (
            <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-md">
              <div className="space-y-1">
                <Label htmlFor="public-toggle" className="text-slate-300">
                  Public Feedback
                </Label>
                <p className="text-xs text-slate-400">
                  Allow others to see your rating and comments
                </p>
              </div>
              <Switch
                id="public-toggle"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-slate-400 hover:text-white"
            disabled={isSubmitting}
          >
            Skip for now
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>

        {/* Thank You Message (shown after submission) */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-slate-800/95 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center">
                <Star className="h-8 w-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Thank You!
              </h3>
              <p className="text-slate-400">
                Your feedback helps us improve
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
