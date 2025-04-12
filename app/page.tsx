"use client"

import { useState } from "react"
import { Heart, Mail, Github, Facebook, Instagram, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className={darkMode ? "text-white" : "text-gray-900"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Profile section */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-48 h-48 mb-4">
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-lg"></div>
          <div className="absolute inset-0 rounded-full border-2 border-purple-500"></div>
          <Image
            src="/profile-image.png"
            alt="Profile"
            width={192}
            height={192}
            className="rounded-full object-cover object-[center_30%] z-10 relative" /* Adjusted to focus on face */
            priority
          />
        </div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Heart className="h-4 w-4 text-purple-500" />
          Ew'r ShAn's
          <Heart className="h-4 w-4 text-purple-500" />
        </h1>
        <p className="text-sm text-gray-400 mt-1">Web Developer</p>

        {/* Social links */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => (window.location.href = "mailto:sirana5097@gmail.com")}
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => window.open("https://www.facebook.com/sirana252", "_blank")}
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => window.open ("https://www.instagram.com/sirana252","_blank")}
          >
            <Instagram className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Personal Information */}
      <div className={`w-full max-w-lg p-6 rounded-lg mb-6 ${darkMode ? "bg-gray-900/50" : "bg-white shadow-sm"}`}>
        <h2 className="text-lg font-medium mb-4">Personal Information</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <span className="text-sm"> 19 Years</span>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <span className="text-sm">Bangladesh Dhaka</span>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <span className="text-sm">Single</span>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className={`w-full max-w-lg p-6 rounded-lg mb-6 ${darkMode ? "bg-gray-900/50" : "bg-white shadow-sm"}`}>
        <h2 className="text-lg font-medium mb-4">Note!</h2>
        <div className="flex justify-center">
          <div className={`px-4 py-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <span className="text-sm">Do Something New The old has no value!</span>
          </div>
        </div>
      </div>

      {/* About me */}
      <div className={`w-full max-w-lg p-6 rounded-lg mb-6 ${darkMode ? "bg-gray-900/50" : "bg-white shadow-sm"}`}>
        <h2 className="text-lg font-medium mb-4">About me</h2>
        <p className="text-sm leading-relaxed">
          A passionate developer & musician who loves building efficient applications and playing guitar. I specialize
          in creating web solutions and automation tools while continuously exploring new technologies. With a strong
          problem-solving mindset and creative approach, I strive to develop innovative solutions that make an impact.
        </p>
      </div>

      {/* Skills */}
      <div className={`w-full max-w-lg p-6 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-white shadow-sm"}`}>
        <h2 className="text-lg font-medium mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "React",
            "Node.js",
            "TypeScript",
            "Next.js",
            "Tailwind CSS",
            "Guitar",
            "Music Production",
          ].map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs ${
                darkMode ? "bg-purple-900/40 text-purple-200" : "bg-purple-100 text-purple-800"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
