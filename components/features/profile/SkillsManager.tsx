'use client';

/**
 * SkillsManager Component
 * Add, remove, and manage user skills
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { User as UserType } from '@/lib/services/types';

interface SkillsManagerProps {
  user: UserType;
  isEditing: boolean;
  onUpdate: (data: Partial<UserType>) => void;
}

const SUGGESTED_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'JavaScript',
  'Vue.js',
  'Angular',
  'Next.js',
  'Express',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS',
  'GraphQL',
  'REST API',
  'TailwindCSS',
  'UI/UX',
  'Testing',
  'CI/CD',
];

export function SkillsManager({ user, isEditing, onUpdate }: SkillsManagerProps) {
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      onUpdate({ skills: updatedSkills });
      setNewSkill('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(updatedSkills);
    onUpdate({ skills: updatedSkills });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(newSkill);
    }
  };

  const filteredSuggestions = SUGGESTED_SKILLS.filter(
    (skill) =>
      !skills.includes(skill) &&
      skill.toLowerCase().includes(newSkill.toLowerCase())
  );

  return (
    <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Code className="h-5 w-5 text-brand-purple" />
        Skills & Expertise
      </h3>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-2 mb-4">
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              className="group relative"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 border border-brand-purple/30 transition-all hover:border-brand-purple/50">
                <span className="text-sm font-medium text-white">{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-steel/60 hover:text-error-400 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {skills.length === 0 && !isEditing && (
          <p className="text-sm text-steel/60 py-2">
            No skills added yet. Click edit to add your skills.
          </p>
        )}
      </div>

      {/* Add Skill Input */}
      {isEditing && (
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Add a skill (e.g., React, Python, Design)..."
              className="w-full rounded-lg border border-brand-purple/30 bg-dark-card px-4 py-2.5 pr-10 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none"
            />
            <Button
              onClick={() => handleAddSkill(newSkill)}
              disabled={!newSkill.trim()}
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0 bg-gradient-to-r from-brand-purple to-brand-pink"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && newSkill && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 rounded-lg border border-brand-purple/30 bg-dark-card shadow-xl max-h-48 overflow-y-auto"
            >
              {filteredSuggestions.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleAddSkill(skill)}
                  className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-brand-purple/20 transition-colors border-b border-brand-purple/10 last:border-0"
                >
                  {skill}
                </button>
              ))}
            </motion.div>
          )}

          {/* Quick Add Suggestions */}
          {!newSkill && (
            <div>
              <p className="text-xs text-steel/60 mb-2">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_SKILLS.filter((s) => !skills.includes(s))
                  .slice(0, 6)
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleAddSkill(skill)}
                      className="px-2.5 py-1 rounded-full bg-dark-card/50 border border-brand-purple/20 text-xs text-steel hover:text-white hover:border-brand-purple/40 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
