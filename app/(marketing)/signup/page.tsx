'use client';

/**
 * Signup Page
 * Alias for Register page - same functionality
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Github,
  Chrome,
  UserPlus,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'requester' | 'helper' | 'both'>('both');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the Terms and Privacy Policy');
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration - creates user and logs in
      await login(email, name);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: 'requester' as const,
      label: 'Requester',
      description: 'I need help with my projects',
    },
    {
      value: 'helper' as const,
      label: 'Helper',
      description: 'I want to help others',
    },
    {
      value: 'both' as const,
      label: 'Both',
      description: 'I want to do both',
    },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-dark overflow-hidden py-12">
      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-80 w-80"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      {/* Content */}
      <div className="relative w-full max-w-md px-4">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-display font-bold gradient-text mb-2">
              MicroCollab
            </h1>
          </Link>
          <p className="text-steel text-sm">
            Create your account and start collaborating
          </p>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6 sm:p-8">
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel/60" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-brand-purple/30 bg-dark-card pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none focus:ring-1 focus:ring-brand-purple/60"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-brand-purple/30 bg-dark-card pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none focus:ring-1 focus:ring-brand-purple/60"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  I want to be a
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      className={`relative p-3 rounded-lg border transition-all text-center ${
                        role === option.value
                          ? 'border-brand-purple bg-brand-purple/20'
                          : 'border-brand-purple/30 bg-dark-card hover:border-brand-purple/50'
                      }`}
                    >
                      <p className="text-xs font-semibold text-white mb-1">
                        {option.label}
                      </p>
                      <p className="text-[10px] text-steel/60 line-clamp-2">
                        {option.description}
                      </p>
                      {role === option.value && (
                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-emerald flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-lg border border-brand-purple/30 bg-dark-card pl-10 pr-12 py-3 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none focus:ring-1 focus:ring-brand-purple/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel/60 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel/60" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full rounded-lg border border-brand-purple/30 bg-dark-card pl-10 pr-12 py-3 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none focus:ring-1 focus:ring-brand-purple/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-brand-purple/30 bg-dark-card text-brand-purple focus:ring-brand-purple/60"
                />
                <span className="text-xs text-steel">
                  I agree to the{' '}
                  <Link href="/terms" className="text-brand-cyan hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-brand-cyan hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-purple/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-dark-card px-3 text-steel">Or sign up with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full border-brand-purple/30 hover:bg-brand-purple/10"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-brand-purple/30 hover:bg-brand-purple/10"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm text-steel">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-brand-cyan hover:text-brand-sky transition-colors"
              >
                Sign in
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
