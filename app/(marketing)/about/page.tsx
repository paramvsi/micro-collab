import Link from "next/link";
import { Users, Target, Heart, Zap, TrendingUp, Award, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  { label: "Active Users", value: "10,000+", icon: Users },
  { label: "Sessions Completed", value: "50,000+", icon: Target },
  { label: "Countries", value: "85+", icon: Globe },
  { label: "Avg Rating", value: "4.9", icon: Award },
];

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Co-Founder & CEO",
    bio: "Former tech lead at Google. Passionate about democratizing access to expertise.",
    avatar: "/team/sarah.jpg",
    initials: "SC",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer with 15 years experience. Loves building tools that help people learn.",
    avatar: "/team/michael.jpg",
    initials: "MR",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emily Watson",
    role: "Head of Product",
    bio: "Product designer from Airbnb. Focused on creating delightful user experiences.",
    avatar: "/team/emily.jpg",
    initials: "EW",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "David Kim",
    role: "Engineering Lead",
    bio: "Backend architect passionate about scalable systems and clean code.",
    avatar: "/team/david.jpg",
    initials: "DK",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of human connection and collaborative learning.",
  },
  {
    icon: Zap,
    title: "Speed & Quality",
    description: "Fast access to expert help without compromising on quality or depth.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "Everyone has something to learn and something to teach.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we build and every interaction.",
  },
];

const timeline = [
  {
    year: "2023",
    title: "The Beginning",
    description: "MicroCollab was founded with a simple idea: connect people who need help with those who can provide it.",
  },
  {
    year: "2023",
    title: "First 1,000 Users",
    description: "Reached our first milestone with 1,000 active users and over 5,000 successful collaboration sessions.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with support for multiple languages and timezones.",
  },
  {
    year: "2025",
    title: "Today",
    description: "Serving 10,000+ users across 85 countries with 50,000+ completed sessions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            About MicroCollab
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Connecting Expertise,
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Empowering Growth
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            We're building a platform where knowledge flows freely, problems get solved quickly,
            and everyone can both learn and teach.
          </p>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/signup">Join Our Community</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-emerald-400" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-slate-400">
              We believe that everyone has valuable knowledge to share and challenges where they
              need help.
            </p>
          </div>
          <Card className="p-8 bg-slate-800/50 border-slate-700">
            <p className="text-slate-300 leading-relaxed text-lg">
              MicroCollab was born from a simple observation: talented people get stuck on problems
              every day, and somewhere in the world, there's someone who can help solve that problem
              in minutes. Traditional mentorship and consulting are often expensive, slow, or
              inaccessible. We're changing that by making it easy to find expert help on-demand,
              for focused, time-efficient collaboration sessions.
            </p>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-lg text-slate-400">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="p-6 bg-slate-800/50 border-slate-700"
                >
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-400">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-400">
              The people building the future of collaboration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                className="p-6 bg-slate-800/50 border-slate-700 text-center"
              >
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-xl">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-emerald-400 mb-3">{member.role}</p>
                <p className="text-sm text-slate-400 mb-4">{member.bio}</p>
                <div className="flex justify-center gap-2">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-lg text-slate-400">
              From idea to global platform
            </p>
          </div>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20">
                    <span className="text-sm font-bold text-emerald-400">
                      {event.year}
                    </span>
                  </div>
                </div>
                <Card className="flex-1 p-6 bg-slate-800/50 border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-slate-400">{event.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Us on This Journey
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Whether you're looking for help or want to share your expertise,
              there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Link href="/dashboard/browse">Browse Requests</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
