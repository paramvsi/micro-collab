"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { PricingModal } from "@/components/landing/PricingModal";

const navLinks = [
  { href: "#features", label: "Features", type: "anchor" as const },
  { href: "#", label: "Pricing", type: "modal" as const },
  { href: "/about", label: "About", type: "link" as const },
  { href: "/help", label: "FAQ", type: "link" as const },
];

export function MarketingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.type === "modal") {
      e.preventDefault();
      setPricingModalOpen(true);
      setMobileMenuOpen(false);
    } else if (link.type === "anchor" && link.href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-white">
              MicroCollab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Buttons (Desktop) */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Button
              asChild
              variant="gradient"
              size="default"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">Log In</Link>
              </motion.div>
            </Button>
            <Button
              asChild
              variant="gradient-accent"
              size="default"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">Sign Up</Link>
              </motion.div>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-300 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-slate-900 border-slate-700"
            >
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col gap-3 pt-6 border-t border-slate-700">
                  <Button
                    asChild
                    variant="gradient"
                    className="w-full"
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="gradient-accent"
                    className="w-full"
                  >
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal open={pricingModalOpen} onOpenChange={setPricingModalOpen} />
    </header>
  );
}
