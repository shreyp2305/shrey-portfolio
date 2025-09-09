"use client";

import { H1 } from "@/components/ui/H1";
import Image from "next/image";
import profile_picture from "@/assets/linkedin_photo.jpg";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-20 px-4 py-16">
      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-12 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center sm:text-left"
        >
          <H1 className="text-4xl sm:text-5xl">Hi, I&apos;m Shrey 👋</H1>
          <p className="mx-auto max-w-md text-lg text-muted-foreground sm:mx-0">
            A Software Engineer with an interest in building scalable,
            user-centered applications across the full stack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src={profile_picture}
            alt="A photo of me"
            width={320}
            height={320}
            className="aspect-square rounded-full border-4 border-primary/30 object-cover shadow-xl"
          />
        </motion.div>
      </section>

      {/* Chatbot highlight */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center space-y-5 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-3 flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Bot size={28} className="text-primary" />
          </div>
          <span className="text-lg font-semibold">
            Chat with my AI assistant
          </span>
        </motion.div>

        {/* <h2 className="text-2xl font-semibold">Chat with my AI assistant</h2> */}
        <p className="max-w-lg text-muted-foreground">
          You can ask the chatbot any question about me and it will find the
          relevant info on this website.
        </p>
      </motion.section>
    </main>
  );
}
