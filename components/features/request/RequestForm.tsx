'use client';

/**
 * RequestForm Component
 * Complete form for creating help requests with validation
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateRequest } from '@/lib/hooks/queries/use-requests';
import { useAuthStore } from '@/lib/stores/auth-store';
import {
  requestFormSchema,
  type RequestFormData,
  defaultRequestValues,
  POPULAR_SKILLS
} from '@/lib/validations/request-schema';

export function RequestForm() {
  const router = useRouter();
  const { user } = useAuthStore();
  const createRequest = useCreateRequest();
  const [tagInput, setTagInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: defaultRequestValues
  });

  const { watch, setValue, formState: { errors, isSubmitting } } = form;
  const watchedTags = watch('tags') || [];
  const watchedTitle = watch('title') || '';
  const watchedDescription = watch('description') || '';
  const watchedDuration = watch('duration_hours') || 2;

  // Filter skills based on input
  const suggestedSkills = POPULAR_SKILLS.filter(
    skill =>
      skill.toLowerCase().includes(tagInput.toLowerCase()) &&
      !watchedTags.includes(skill)
  ).slice(0, 8);

  const handleAddTag = (tag: string) => {
    if (watchedTags.length < 5 && !watchedTags.includes(tag)) {
      setValue('tags', [...watchedTags, tag], { shouldValidate: true });
      setTagInput('');
      setShowSkillSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(t => t !== tagToRemove), {
      shouldValidate: true
    });
  };

  const onSubmit = async (data: RequestFormData) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      const newRequest = await createRequest.mutateAsync({
        ...data,
        created_by: user.id
      });

      // Redirect to request details
      router.push(`/requests/${newRequest.id}`);
    } catch (error) {
      console.error('Failed to create request:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">
          Request Title <span className="text-error-400">*</span>
        </Label>
        <Input
          id="title"
          placeholder="e.g., Need help debugging React performance issue"
          className="bg-dark-elevated border-brand-purple/20"
          {...form.register('title')}
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-error-400">{errors.title?.message}</span>
          <span className="text-muted-foreground">
            {watchedTitle.length}/100
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">
          Description <span className="text-error-400">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe your problem in detail. What have you tried? What's your expected outcome?"
          className="bg-dark-elevated border-brand-purple/20 min-h-[200px]"
          {...form.register('description')}
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-error-400">{errors.description?.message}</span>
          <span className="text-muted-foreground">
            {watchedDescription.length}/2000
          </span>
        </div>
      </div>

      {/* Skills/Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-white">
          Skills Required <span className="text-error-400">*</span>
        </Label>
        <div className="space-y-3">
          {/* Selected tags */}
          {watchedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {watchedTags.map(tag => (
                <Badge
                  key={tag}
                  className="bg-brand-purple text-white pl-3 pr-1 py-1 flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Tag input */}
          <div className="relative">
            <Input
              id="tags"
              placeholder={
                watchedTags.length >= 5
                  ? 'Maximum 5 skills reached'
                  : 'Type to search skills (e.g., React, TypeScript)...'
              }
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
                setShowSkillSuggestions(true);
              }}
              onFocus={() => setShowSkillSuggestions(true)}
              disabled={watchedTags.length >= 5}
              className="bg-dark-elevated border-brand-purple/20"
            />

            {/* Suggestions dropdown */}
            {showSkillSuggestions && tagInput && suggestedSkills.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-2 z-10 border-brand-purple/30 bg-graphite/95 backdrop-blur-sm p-2 max-h-60 overflow-y-auto shadow-xl">
                {suggestedSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleAddTag(skill)}
                    className="w-full text-left px-3 py-2 hover:bg-brand-purple/30 rounded text-sm text-white transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </Card>
            )}
          </div>
        </div>
        <div className="text-xs text-error-400">{errors.tags?.message}</div>
        <div className="text-xs text-muted-foreground">
          Select 1-5 skills. {watchedTags.length}/5 selected
        </div>
      </div>

      {/* Duration & Urgency Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Duration */}
        <div className="space-y-2">
          <Label className="text-white">
            Estimated Duration: {watchedDuration} hour{watchedDuration > 1 ? 's' : ''}
          </Label>
          <Slider
            min={1}
            max={4}
            step={1}
            value={[watchedDuration]}
            onValueChange={(value) => setValue('duration_hours', value[0])}
            className="[&_[role=slider]]:bg-brand-purple [&_[role=slider]]:border-brand-purple"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 hour</span>
            <span>4 hours</span>
          </div>
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <Label className="text-white">Urgency</Label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setValue('urgency', 'low')}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm
                ${
                  watch('urgency') === 'low'
                    ? 'border-steel-400 bg-steel-400/10 text-steel-400'
                    : 'border-brand-purple/20 bg-dark-elevated text-muted-foreground hover:border-steel-400/40 hover:text-steel-400'
                }
              `}
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => setValue('urgency', 'normal')}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm
                ${
                  watch('urgency') === 'normal'
                    ? 'border-warning-400 bg-warning-400/10 text-warning-400'
                    : 'border-brand-purple/20 bg-dark-elevated text-muted-foreground hover:border-warning-400/40 hover:text-warning-400'
                }
              `}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setValue('urgency', 'critical')}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm
                ${
                  watch('urgency') === 'critical'
                    ? 'border-error-400 bg-error-400/10 text-error-400'
                    : 'border-brand-purple/20 bg-dark-elevated text-muted-foreground hover:border-error-400/40 hover:text-error-400'
                }
              `}
            >
              Critical
            </button>
          </div>
        </div>
      </div>

      {/* Mode */}
      <div className="space-y-2">
        <Label className="text-white">Collaboration Mode</Label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setValue('mode', 'async')}
            className={`
              p-4 rounded-lg border-2 transition-all text-left
              ${
                watch('mode') === 'async'
                  ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                  : 'border-brand-purple/30 bg-graphite/50 hover:border-brand-cyan/50 hover:bg-brand-cyan/5'
              }
            `}
          >
            <div className={`font-semibold mb-1 ${watch('mode') === 'async' ? 'text-brand-cyan' : 'text-white'}`}>
              Async Chat
            </div>
            <div className="text-xs text-steel">Message back and forth at your own pace</div>
          </button>

          <button
            type="button"
            onClick={() => setValue('mode', 'live')}
            className={`
              p-4 rounded-lg border-2 transition-all text-left
              ${
                watch('mode') === 'live'
                  ? 'border-brand-pink bg-brand-pink/10 shadow-[0_0_16px_rgba(236,72,153,0.3)]'
                  : 'border-brand-purple/30 bg-graphite/50 hover:border-brand-pink/50 hover:bg-brand-pink/5'
              }
            `}
          >
            <div className={`font-semibold mb-1 ${watch('mode') === 'live' ? 'text-brand-pink' : 'text-white'}`}>
              Live Session
            </div>
            <div className="text-xs text-steel">Real-time video/screen sharing</div>
          </button>
        </div>
      </div>

      {/* Budget (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="budget" className="text-white">
          Budget (Optional)
        </Label>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              id="budget"
              type="number"
              placeholder="50"
              className="bg-dark-elevated border-brand-purple/20"
              {...form.register('budget', { valueAsNumber: true })}
            />
          </div>
          <Select
            value={watch('budget_type') || 'hourly'}
            onValueChange={(value) => setValue('budget_type', value as any)}
          >
            <SelectTrigger className="w-32 bg-dark-elevated border-brand-purple/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Per Hour</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-xs text-muted-foreground">
          Suggested rate helps helpers decide if they're a good match
        </div>
      </div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="gradient"
          size="lg"
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting Request...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Post Help Request
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
