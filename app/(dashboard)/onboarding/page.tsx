"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  { id: 1, title: "Profile Setup", description: "Tell us about yourself" },
  { id: 2, title: "Add Skills", description: "What are you good at?" },
  { id: 3, title: "Preferences", description: "Set your preferences" },
  { id: 4, title: "Complete", description: "You're all set!" },
];

const popularSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "JavaScript",
  "AWS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Next.js",
  "Vue.js",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [canProgress, setCanProgress] = useState(false);

  // Step 1: Profile
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  // Step 2: Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");

  // Step 3: Preferences
  const [timezone, setTimezone] = useState("utc-5");
  const [availability, setAvailability] = useState("available");
  const [hourlyRate, setHourlyRate] = useState("");

  // Validate current step
  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return fullName.trim() !== "" && bio.trim() !== "";
      case 2:
        return selectedSkills.length >= 3;
      case 3:
        return timezone !== "" && availability !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() !== "" && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleComplete = () => {
    // TODO: Save onboarding data
    router.push("/dashboard");
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to MicroCollab!
          </h1>
          <p className="text-slate-400">
            Let's get your profile set up in just a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center relative">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      currentStep > step.id
                        ? "bg-emerald-500 text-white"
                        : currentStep === step.id
                        ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      currentStep > step.id ? "bg-emerald-500" : "bg-slate-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 bg-slate-800/50 border-slate-700 mb-6">
          {/* Step 1: Profile Setup */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Profile Setup
                </h2>
                <p className="text-slate-400">
                  Tell us a bit about yourself so others can get to know you
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-300">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-300">
                    Bio *
                  </Label>
                  <textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about your experience, interests, and what you're looking to collaborate on..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-slate-500">
                    {bio.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-300">
                    Location (Optional)
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Profile Picture (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                      {fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "?"}
                    </div>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Add Skills */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Add Skills</h2>
                <p className="text-slate-400">
                  Select at least 3 skills that you're proficient in
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300 mb-3 block">
                    Popular Skills
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={
                          selectedSkills.includes(skill) ? "default" : "outline"
                        }
                        className={`cursor-pointer transition-colors ${
                          selectedSkills.includes(skill)
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                        {selectedSkills.includes(skill) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customSkill" className="text-slate-300">
                    Add Custom Skill
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="customSkill"
                      type="text"
                      placeholder="Enter a skill..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomSkill();
                        }
                      }}
                      className="flex-1 bg-slate-900/50 border-slate-700 text-white"
                    />
                    <Button
                      onClick={handleAddCustomSkill}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Label className="text-slate-300 mb-2 block">
                    Your Skills ({selectedSkills.length})
                  </Label>
                  {selectedSkills.length === 0 ? (
                    <p className="text-slate-500 text-sm">
                      No skills selected yet. Select at least 3 to continue.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="default"
                          className="bg-emerald-500 text-white"
                        >
                          {skill}
                          <button
                            onClick={() => handleSkillToggle(skill)}
                            className="ml-1 hover:text-emerald-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Set Your Preferences
                </h2>
                <p className="text-slate-400">
                  Help us personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-slate-300">
                    Timezone *
                  </Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger
                      id="timezone"
                      className="bg-slate-900/50 border-slate-700 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability" className="text-slate-300">
                    Availability Status *
                  </Label>
                  <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger
                      id="availability"
                      className="bg-slate-900/50 border-slate-700 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="available">
                        Available for collaboration
                      </SelectItem>
                      <SelectItem value="busy">
                        Busy - Limited availability
                      </SelectItem>
                      <SelectItem value="offline">Not available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-slate-300">
                    Hourly Rate (Optional)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="75"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="pl-8 bg-slate-900/50 border-slate-700 text-white"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      /hour
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Set your preferred hourly rate for collaboration sessions
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center py-8">
              <div className="h-20 w-20 mx-auto rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  You're All Set!
                </h2>
                <p className="text-slate-400">
                  Your profile is ready. Start exploring and collaborating!
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Profile Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name:</span>
                    <span className="text-white font-medium">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Skills:</span>
                    <span className="text-white font-medium">
                      {selectedSkills.length} selected
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="text-white font-medium">
                      {timezone.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Availability:</span>
                    <span className="text-white font-medium capitalize">
                      {availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-slate-400 hover:text-white"
          >
            Skip for now
          </Button>

          <div className="flex gap-3">
            {currentStep > 1 && currentStep < steps.length && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                disabled={!validateStep()}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
