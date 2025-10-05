"use client";

import { Lightbulb, MessageSquare, Users } from "lucide-react";
import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();
  // Animation variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-20 md:py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left Content */}
        <motion.div
          className="space-y-8 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Share Ideas Anonymously</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
          >
            Share ideas,
            <br />
            get feedback,
            <br />
            <span className="text-blue-600">grow together.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0"
          >
            A collaborative platform where creativity meets community. Post your
            ideas anonymously and receive valuable feedback through community
            upvotes.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/idea-board')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Start Sharing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border border-slate-200"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 justify-center lg:justify-start pt-8"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">10k+ Contributors</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">50k+ Ideas</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Idea Card Mockup */}
        <motion.div
          className="relative"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 max-w-md mx-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Top Idea</div>
                <div className="font-semibold text-slate-900">
                  Community Favorite
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-xl text-slate-900">
                AI-Powered Learning Platform
              </h3>
              <p className="text-slate-600 text-sm">
                An adaptive learning system that personalizes education based on
                individual learning patterns...
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  ↑ 1,234
                </button>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                  💬 89
                </button>
              </div>
              <span className="text-xs text-slate-500">2 days ago</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button onClick={() => router.push('/idea-board')} className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                View Full Idea
              </button>
              <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                Share Feedback
              </button>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
