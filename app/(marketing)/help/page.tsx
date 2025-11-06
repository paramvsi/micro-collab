"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, MessageSquare, Mail, Book, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqCategories = [
  { id: "all", label: "All Topics", icon: Book },
  { id: "getting-started", label: "Getting Started", icon: Book },
  { id: "requests", label: "Posting Requests", icon: MessageSquare },
  { id: "offers", label: "Making Offers", icon: Mail },
  { id: "sessions", label: "Sessions", icon: Video },
];

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "getting-started",
    question: "What is MicroCollab?",
    answer: "MicroCollab is a platform that connects people who need help with those who can provide it. Whether you're stuck on a coding problem, need design feedback, or want to learn a new skill, MicroCollab helps you find experts for quick, focused collaboration sessions.",
  },
  {
    id: "2",
    category: "getting-started",
    question: "How do I get started?",
    answer: "Simply sign up for a free account, complete your profile with your skills and expertise, and you're ready to go! You can either post a request for help or browse existing requests to offer your assistance.",
  },
  {
    id: "3",
    category: "getting-started",
    question: "Is MicroCollab free to use?",
    answer: "Yes! Creating an account and browsing requests is completely free. Helpers set their own hourly rates for collaboration sessions, so costs vary depending on the expert you work with.",
  },
  {
    id: "4",
    category: "requests",
    question: "How do I post a request?",
    answer: "Click the 'Post New Request' button from your dashboard. Fill in the details about what you need help with, including the title, description, urgency level, and relevant skills or tags. Once posted, helpers can browse and send offers to assist you.",
  },
  {
    id: "5",
    category: "requests",
    question: "What makes a good request?",
    answer: "A good request is clear, specific, and provides enough context. Include: what you're trying to accomplish, what you've already tried, any error messages or issues you're facing, and your expected outcome. The more detail you provide, the better helpers can understand how to assist you.",
  },
  {
    id: "6",
    category: "requests",
    question: "Can I edit or cancel a request?",
    answer: "Yes! You can edit your request at any time before accepting an offer. If you need to cancel, you can mark it as cancelled from your requests page. However, please be courteous and notify any helpers who have already sent offers.",
  },
  {
    id: "7",
    category: "offers",
    question: "How do I send an offer?",
    answer: "Browse available requests and find one that matches your expertise. Click on the request to view details, then click 'Send Offer'. Include your approach to solving the problem, estimated time, and your hourly rate. The requester will review all offers and choose the best fit.",
  },
  {
    id: "8",
    category: "offers",
    question: "What should I include in my offer?",
    answer: "Your offer should demonstrate your understanding of the problem and explain your approach to solving it. Include: your relevant experience, estimated time to completion, your hourly rate, and any clarifying questions. Be professional and specific.",
  },
  {
    id: "9",
    category: "offers",
    question: "What happens if my offer is accepted?",
    answer: "When your offer is accepted, you'll receive a notification and can schedule a collaboration session with the requester. You'll work together in our video/chat session room to solve the problem. After completion, you'll both provide feedback.",
  },
  {
    id: "10",
    category: "sessions",
    question: "How do collaboration sessions work?",
    answer: "Sessions take place in our built-in video/chat room. You can share screens, use a collaborative code editor, and communicate in real-time. Sessions are time-tracked and you'll be billed based on the agreed hourly rate and actual session duration.",
  },
  {
    id: "11",
    category: "sessions",
    question: "Can I cancel a scheduled session?",
    answer: "Yes, but please provide at least 24 hours notice when possible. Late cancellations may affect your reputation score. Emergency cancellations are understood, but communicate with the other party as soon as possible.",
  },
  {
    id: "12",
    category: "sessions",
    question: "What if I'm not satisfied with a session?",
    answer: "If you have concerns about a session, please reach out to our support team. We take quality seriously and will review disputes on a case-by-case basis. You can also leave honest feedback that helps other users make informed decisions.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Filter FAQs
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle accordion
  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Popular articles
  const popularArticles = faqData.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-slate-400">
            Search our knowledge base or browse categories below
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="search"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 text-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Popular Articles (when no search) */}
        {!searchQuery && selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article) => (
                <Card
                  key={article.id}
                  className="p-4 bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-colors cursor-pointer"
                  onClick={() => toggleItem(article.id)}
                >
                  <h3 className="font-semibold text-white mb-2">
                    {article.question}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {article.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {searchQuery
              ? `Search Results (${filteredFAQs.length})`
              : selectedCategory === "all"
              ? "All Questions"
              : faqCategories.find((c) => c.id === selectedCategory)?.label}
          </h2>

          {filteredFAQs.length === 0 ? (
            <Card className="p-12 bg-slate-800/50 border-slate-700 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-slate-600" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No results found
              </h3>
              <p className="text-slate-400 mb-4">
                Try adjusting your search or browse all topics
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                View All Questions
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq) => {
                const isExpanded = expandedItems.includes(faq.id);
                return (
                  <Card
                    key={faq.id}
                    className="bg-slate-800/50 border-slate-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                    >
                      <span className="font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 text-slate-400 border-t border-slate-700 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="p-8 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Still need help?
            </h2>
            <p className="text-slate-400 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Link href="mailto:support@microcollab.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Link href="/dashboard">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
