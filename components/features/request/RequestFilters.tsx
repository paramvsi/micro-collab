'use client';

/**
 * RequestFilters Component
 * Sidebar filter controls for browsing requests
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RequestFilters as FilterType } from '@/types/request';
import { POPULAR_SKILLS } from '@/lib/validations/request-schema';

interface RequestFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

export function RequestFilters({ filters, onChange }: RequestFiltersProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const displayedSkills = showAllSkills ? POPULAR_SKILLS : POPULAR_SKILLS.slice(0, 12);

  const hasActiveFilters =
    (filters.tags && filters.tags.length > 0) ||
    filters.urgency ||
    filters.mode ||
    filters.duration_min !== undefined ||
    filters.duration_max !== undefined;

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];

    onChange({ ...filters, tags: newTags.length > 0 ? newTags : undefined });
  };

  const handleUrgencyToggle = (urgency: 'low' | 'normal' | 'critical') => {
    const currentUrgency = filters.urgency || [];
    const newUrgency = currentUrgency.includes(urgency)
      ? currentUrgency.filter(u => u !== urgency)
      : [...currentUrgency, urgency];

    onChange({ ...filters, urgency: newUrgency.length > 0 ? newUrgency : undefined });
  };

  const handleDurationChange = (value: number[]) => {
    onChange({
      ...filters,
      duration_min: value[0],
      duration_max: value[1]
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="sticky top-6 border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-brand-purple/20 to-brand-pink/20">
              <Filter className="h-5 w-5 text-brand-purple" />
            </div>
            <h2 className="text-lg font-semibold gradient-text">Filters</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-brand-pink hover:text-white hover:bg-brand-pink/10"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Skills/Tags Filter */}
          <div>
            <Label className="text-brand-cyan font-medium mb-3 block">Skills</Label>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {displayedSkills.map((skill, idx) => {
                  const isSelected = filters.tags?.includes(skill);
                  const colorIndex = idx % 4;

                  // Define gradient classes for each color
                  let gradientClass = '';
                  let glowClass = '';
                  let textClass = '';
                  let borderClass = '';

                  if (colorIndex === 0) {
                    gradientClass = 'bg-gradient-to-r from-brand-cyan to-brand-sky';
                    glowClass = 'bg-gradient-to-r from-brand-cyan to-brand-sky';
                    textClass = 'text-brand-cyan';
                    borderClass = 'border-brand-cyan/40';
                  } else if (colorIndex === 1) {
                    gradientClass = 'bg-gradient-to-r from-brand-purple to-brand-pink';
                    glowClass = 'bg-gradient-to-r from-brand-purple to-brand-pink';
                    textClass = 'text-brand-pink';
                    borderClass = 'border-brand-pink/40';
                  } else if (colorIndex === 2) {
                    gradientClass = 'bg-gradient-to-r from-brand-emerald to-success-400';
                    glowClass = 'bg-gradient-to-r from-brand-emerald to-success-400';
                    textClass = 'text-brand-emerald';
                    borderClass = 'border-brand-emerald/40';
                  } else {
                    gradientClass = 'bg-gradient-to-r from-brand-orange to-warning-400';
                    glowClass = 'bg-gradient-to-r from-brand-orange to-warning-400';
                    textClass = 'text-brand-orange';
                    borderClass = 'border-brand-orange/40';
                  }

                  return (
                    <motion.button
                      key={skill}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagToggle(skill)}
                      className={`
                        group relative rounded-full border px-3 py-1.5 text-xs font-medium transition-all
                        ${
                          isSelected
                            ? `border-transparent text-white shadow-lg ${borderClass}`
                            : 'border-brand-purple/30 text-steel hover:border-brand-purple/60 hover:text-white'
                        }
                      `}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId={`skill-bg-${skill}`}
                          className={`absolute inset-0 rounded-full opacity-90 ${gradientClass}`}
                          initial={false}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <span className="relative z-10">{skill}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.2 }}
                          className={`absolute inset-0 -z-10 rounded-full blur-lg ${glowClass}`}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
            {POPULAR_SKILLS.length > 12 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="mt-3 text-brand-purple hover:text-brand-cyan transition-colors"
              >
                {showAllSkills ? 'Show Less' : `Show ${POPULAR_SKILLS.length - 12} More`}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    showAllSkills ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            )}
          </div>

          {/* Duration Filter */}
          <div>
            <Label className="text-brand-sky font-medium mb-3 block">
              Duration: <span className="text-brand-cyan">{filters.duration_min || 1}h - {filters.duration_max || 4}h</span>
            </Label>
            <Slider
              min={1}
              max={4}
              step={1}
              value={[filters.duration_min || 1, filters.duration_max || 4]}
              onValueChange={handleDurationChange}
              className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-brand-cyan [&_[role=slider]]:to-brand-purple [&_[role=slider]]:border-brand-purple"
            />
            <div className="flex justify-between text-xs text-steel mt-2">
              <span>1 hour</span>
              <span>4 hours</span>
            </div>
          </div>

          {/* Urgency Filter */}
          <div>
            <Label className="text-brand-orange font-medium mb-3 block">Urgency</Label>
            <div className="space-y-3">
              {[
                { value: 'low', label: 'Low', color: 'text-steel-400', checkColor: 'data-[state=checked]:bg-steel-400 data-[state=checked]:border-steel-400' },
                { value: 'normal', label: 'Normal', color: 'text-warning-400', checkColor: 'data-[state=checked]:bg-warning-400 data-[state=checked]:border-warning-400' },
                { value: 'critical', label: 'Critical', color: 'text-error-400', checkColor: 'data-[state=checked]:bg-error-400 data-[state=checked]:border-error-400' }
              ].map(({ value, label, color, checkColor }) => (
                <div key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={`urgency-${value}`}
                    checked={filters.urgency?.includes(value as any) || false}
                    onCheckedChange={() => handleUrgencyToggle(value as any)}
                    className={`border-brand-purple/30 ${checkColor}`}
                  />
                  <Label
                    htmlFor={`urgency-${value}`}
                    className={`text-sm cursor-pointer font-medium ${color}`}
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Mode Filter */}
          <div>
            <Label className="text-brand-pink font-medium mb-3 block">Collaboration Mode</Label>
            <Select
              value={filters.mode || 'all'}
              onValueChange={(value) =>
                onChange({
                  ...filters,
                  mode: value === 'all' ? undefined : (value as 'async' | 'live')
                })
              }
            >
              <SelectTrigger className="bg-dark-elevated border-brand-pink/30 hover:border-brand-pink/50 transition-colors">
                <SelectValue placeholder="All modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="async">Async Chat</SelectItem>
                <SelectItem value="live">Live Session</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div>
            <Label className="text-brand-emerald font-medium mb-3 block">Sort By</Label>
            <Select
              value={filters.sort || 'newest'}
              onValueChange={(value) =>
                onChange({
                  ...filters,
                  sort: value as FilterType['sort']
                })
              }
            >
              <SelectTrigger className="bg-dark-elevated border-brand-emerald/30 hover:border-brand-emerald/50 transition-colors">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="urgent">Most Urgent</SelectItem>
                <SelectItem value="budget">Highest Budget</SelectItem>
                <SelectItem value="best_match">Best Match</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filters count */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-brand-purple/20"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {(filters.tags?.length || 0) + (filters.urgency?.length || 0) + (filters.mode ? 1 : 0)} active filter(s)
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-error-500/20 text-error-400 hover:bg-error-500/10"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
