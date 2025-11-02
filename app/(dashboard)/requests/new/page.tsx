'use client';

/**
 * Post Request Page
 * Page for creating new help requests
 */

import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RequestForm } from '@/components/features/request/RequestForm';

export default function NewRequestPage() {
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-base/80 backdrop-blur-lg border-b border-brand-purple/20 px-6 py-4"
      >
        <div className="max-w-5xl mx-auto">
          <Link href="/browse">
            <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent">
            Post a Help Request
          </h1>
          <p className="text-steel mt-2">
            Describe your problem and connect with experienced developers
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-8">
              <RequestForm />
            </Card>
          </motion.div>

          {/* Tips Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-6 space-y-4">
              {/* Tips Card */}
              <Card className="border-brand-purple/30 bg-gradient-to-br from-graphite/80 to-dark-card/50 backdrop-blur-sm p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-warning-400/20 to-brand-orange/20">
                    <Lightbulb className="h-5 w-5 text-warning-400" />
                  </div>
                  <h3 className="font-semibold gradient-text">Tips for Success</h3>
                </div>
                <ul className="space-y-3 text-sm text-steel">
                  <li className="flex gap-2">
                    <span className="text-brand-cyan text-lg leading-none">•</span>
                    <span>
                      Be specific about your problem and what you've already tried
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-brand-pink text-lg leading-none">•</span>
                    <span>
                      Include relevant error messages or screenshots if applicable
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-brand-emerald text-lg leading-none">•</span>
                    <span>
                      Mention your tech stack and environment details
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-brand-orange text-lg leading-none">•</span>
                    <span>
                      Set realistic time estimates - most sessions are 1-2 hours
                    </span>
                  </li>
                </ul>
              </Card>

              {/* Response Time Card */}
              <Card className="border-brand-purple/30 bg-gradient-to-br from-graphite/80 to-dark-card/50 backdrop-blur-sm p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20">
                    <Clock className="h-5 w-5 text-brand-cyan" />
                  </div>
                  <h3 className="font-semibold gradient-text">Expected Timeline</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-warning-400/10 border border-warning-400/20">
                    <div className="text-warning-400 font-medium mb-1">Normal</div>
                    <div className="text-steel">
                      Typically receives offers within 2-4 hours
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-error-400/10 border border-error-400/20">
                    <div className="text-error-400 font-medium mb-1">Critical</div>
                    <div className="text-steel">
                      Priority listing - faster response time
                    </div>
                  </div>
                </div>
              </Card>

              {/* Budget Card */}
              <Card className="border-brand-purple/30 bg-gradient-to-br from-graphite/80 to-dark-card/50 backdrop-blur-sm p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-brand-emerald/20 to-success-400/20">
                    <DollarSign className="h-5 w-5 text-brand-emerald" />
                  </div>
                  <h3 className="font-semibold gradient-text">Budget Guidelines</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-brand-sky/5 transition-colors">
                    <span className="text-steel">Junior Help</span>
                    <span className="text-brand-sky font-medium">$25-50/hr</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-brand-purple/5 transition-colors">
                    <span className="text-steel">Mid-Level</span>
                    <span className="text-brand-purple font-medium">$50-100/hr</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-brand-emerald/5 transition-colors">
                    <span className="text-steel">Senior Expert</span>
                    <span className="text-brand-emerald font-medium">$100-150/hr</span>
                  </div>
                  <p className="text-xs pt-2 border-t border-brand-purple/30 text-steel">
                    Budget is optional and helps attract the right helpers
                  </p>
                </div>
              </Card>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
