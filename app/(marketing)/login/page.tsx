'use client';

/**
 * Login Page
 * Mock authentication for demo purposes
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Chrome, LogIn, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      // Mock login - in real app, this would call an API
      await login(email, email.split('@')[0]);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('demo@microcollab.com', 'Demo User');
      toast.success('Logged in as Demo User');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-dark overflow-hidden">
      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-purple h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-80 w-80"
      >
        <div className="glow-cyan h-full w-full" />
      </motion.div>

      {/* Content */}
      <div className="relative w-full max-w-md px-4 py-8">
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
            Welcome back! Sign in to continue.
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
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
                    placeholder="Enter your password"
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-brand-purple/30 bg-dark-card text-brand-purple focus:ring-brand-purple/60"
                  />
                  <span className="text-steel">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-brand-cyan hover:text-brand-sky transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>

              {/* Demo Login */}
              <Button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10"
                size="lg"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Try Demo Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-purple/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-dark-card px-3 text-steel">Or continue with</span>
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

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-steel">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-brand-cyan hover:text-brand-sky transition-colors"
              >
                Sign up
              </Link>
            </p>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-steel/60">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-brand-cyan hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-cyan hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
