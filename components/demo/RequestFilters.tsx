"use client";

import { motion } from "framer-motion";
import { useDemoStore } from "@/lib/stores/demo-store";
import { Code2, Zap, Clock, AlertCircle, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Color-coded skills with icons and gradients
const SKILLS = [
  { name: "React", color: "from-cyan-500 to-blue-600", textColor: "text-cyan-400", borderColor: "border-cyan-500/30" },
  { name: "TypeScript", color: "from-blue-500 to-indigo-600", textColor: "text-blue-400", borderColor: "border-blue-500/30" },
  { name: "Node.js", color: "from-green-500 to-emerald-600", textColor: "text-green-400", borderColor: "border-green-500/30" },
  { name: "Python", color: "from-yellow-500 to-amber-600", textColor: "text-yellow-400", borderColor: "border-yellow-500/30" },
  { name: "UI/UX", color: "from-pink-500 to-rose-600", textColor: "text-pink-400", borderColor: "border-pink-500/30" },
  { name: "Testing", color: "from-purple-500 to-violet-600", textColor: "text-purple-400", borderColor: "border-purple-500/30" },
  { name: "DevOps", color: "from-orange-500 to-red-600", textColor: "text-orange-400", borderColor: "border-orange-500/30" },
  { name: "GraphQL", color: "from-fuchsia-500 to-pink-600", textColor: "text-fuchsia-400", borderColor: "border-fuchsia-500/30" },
  { name: "Next.js", color: "from-slate-500 to-zinc-600", textColor: "text-slate-300", borderColor: "border-slate-500/30" },
  { name: "Tailwind", color: "from-teal-500 to-cyan-600", textColor: "text-teal-400", borderColor: "border-teal-500/30" },
];

const URGENCY_LEVELS = [
  {
    level: "low",
    icon: Clock,
    color: "from-steel to-slate-600",
    textColor: "text-steel",
    bgColor: "bg-steel/20",
    borderColor: "border-steel/30"
  },
  {
    level: "normal",
    icon: AlertCircle,
    color: "from-warning to-amber-600",
    textColor: "text-warning",
    bgColor: "bg-warning/20",
    borderColor: "border-warning/30"
  },
  {
    level: "critical",
    icon: Zap,
    color: "from-error to-rose-600",
    textColor: "text-error",
    bgColor: "bg-error/20",
    borderColor: "border-error/30"
  },
];

export function RequestFilters() {
  const { filters, updateFilters } = useDemoStore();

  return (
    <Card variant="surface" className="relative overflow-hidden p-6">
      {/* Background gradient glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-indigo/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-emerald/10 blur-3xl" />

      {/* Header with gradient icon */}
      <div className="relative mb-6 flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          className="rounded-xl bg-gradient-to-br from-brand-indigo to-indigo-600 p-2.5"
        >
          <Filter className="h-5 w-5 text-white" />
        </motion.div>
        <h3 className="text-lg font-semibold">
          <span className="gradient-text">Filter</span> Requests
        </h3>
      </div>

      <div className="relative space-y-6">
        {/* Skills & Technologies */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-brand-sky" />
            <label className="text-sm font-medium text-steel">
              Skills & Technologies
            </label>
            {filters.tags.length > 0 && (
              <Badge variant="secondary" className="ml-auto bg-brand-sky/20 text-brand-sky">
                {filters.tags.length}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => {
              const isSelected = filters.tags.includes(skill.name);
              return (
                <motion.button
                  key={skill.name}
                  onClick={() => {
                    const newTags = isSelected
                      ? filters.tags.filter((t) => t !== skill.name)
                      : [...filters.tags, skill.name];
                    updateFilters({ tags: newTags });
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "group relative rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    isSelected
                      ? cn("border-transparent text-white shadow-lg", skill.borderColor)
                      : "border-smoky/50 text-steel hover:border-smoky hover:text-white"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`skill-bg-${skill.name}`}
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-r opacity-90",
                        skill.color
                      )}
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{skill.name}</span>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      className={cn(
                        "absolute inset-0 -z-10 rounded-full bg-gradient-to-r blur-lg",
                        skill.color
                      )}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Urgency Level */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-orange" />
            <label className="text-sm font-medium text-steel">
              Urgency Level
            </label>
            {filters.urgency.length > 0 && (
              <Badge variant="secondary" className="ml-auto bg-brand-orange/20 text-brand-orange">
                {filters.urgency.length}
              </Badge>
            )}
          </div>
          <div className="space-y-2">
            {URGENCY_LEVELS.map(({ level, icon: Icon, color, textColor, bgColor, borderColor }) => {
              const isSelected = filters.urgency.includes(level);
              return (
                <motion.button
                  key={level}
                  onClick={() => {
                    const newUrgency = isSelected
                      ? filters.urgency.filter((u) => u !== level)
                      : [...filters.urgency, level];
                    updateFilters({ urgency: newUrgency });
                  }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 transition-all",
                    isSelected
                      ? cn("border-transparent shadow-lg", borderColor)
                      : "border-smoky/50 hover:border-smoky"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`urgency-bg-${level}`}
                      className={cn("absolute inset-0 rounded-lg bg-gradient-to-r opacity-20", color)}
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <div
                    className={cn(
                      "relative rounded-lg p-2 transition-all",
                      isSelected ? bgColor : "bg-smoky/20"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isSelected ? textColor : "text-steel")} />
                  </div>
                  <span
                    className={cn(
                      "relative text-sm font-medium capitalize transition-colors",
                      isSelected ? textColor : "text-white group-hover:text-white"
                    )}
                  >
                    {level}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Duration Slider */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-pink" />
              <label className="text-sm font-medium text-steel">Duration</label>
            </div>
            <Badge variant="secondary" className="bg-brand-pink/20 text-brand-pink">
              {filters.duration[0]}-{filters.duration[1]}h
            </Badge>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={filters.duration[1]}
              onChange={(e) => {
                updateFilters({ duration: [1, parseInt(e.target.value)] });
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-smoky/50 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-brand-pink [&::-webkit-slider-thumb]:to-brand-orange [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110"
            />
            <div className="flex justify-between text-xs text-steel">
              <span>1h</span>
              <span>2h</span>
              <span>3h</span>
              <span>4h</span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            updateFilters({
              tags: [],
              urgency: [],
              mode: [],
              duration: [1, 4],
            })
          }
          className="group relative w-full overflow-hidden border-smoky/50 bg-graphite/50 hover:border-brand-pink hover:bg-graphite"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-brand-pink to-brand-orange"
          />
          <Sparkles className="relative h-4 w-4" />
          <span className="relative">Reset Filters</span>
        </Button>
      </div>
    </Card>
  );
}
