"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [patientName, setPatientName] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (patientName.trim()) {
      localStorage.setItem("patientName", patientName);
      router.push("/describe");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && patientName.trim()) {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Main Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-2xl mr-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">Healio</h1>
          </div>

          {/* Main Value Proposition */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Find the Right Healthcare Specialist
              <br />
              <span className="text-blue-600">in Minutes, Not Days</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our AI understands your symptoms and connects you directly with
              Oslo&#39;s best specialists. Skip the waiting rooms, get expert
              care faster.
            </p>
          </div>

          {/* Key Benefits - Simplified */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
              AI-Powered Matching
            </div>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-green-500 mr-2" />
              Verified Specialists
            </div>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
              Instant Booking
            </div>
          </div>
        </div>

        {/* Main Welcome Card - Centered and Prominent */}
        <div className="max-w-lg mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Get Started
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Tell us your name and describe your health concern
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  What&#39;s your first name?
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your first name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 text-lg border-2 border-gray-200 rounded-xl"
                />
              </div>

              <Button
                onClick={handleStart}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                disabled={!patientName.trim()}
              >
                Start Your Health Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Trust Indicators */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">
                  Trusted by patients across Oslo
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <span>✓ GDPR Compliant</span>
                  <span>✓ Licensed Specialists</span>
                  <span>✓ Secure Platform</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works - Simplified */}
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            How Healio Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900">
                Describe Your Symptoms
              </h4>
              <p className="text-gray-600 text-sm">
                Our AI asks targeted questions to understand your condition
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900">Get Matched</h4>
              <p className="text-gray-600 text-sm">
                We connect you with the best specialists for your needs
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900">Book & Meet</h4>
              <p className="text-gray-600 text-sm">
                Schedule your appointment and get the care you need
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Minimal */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            © 2025 Healio • Connecting you with Oslo&#39;s healthcare
            specialists
          </p>
        </div>
      </div>
    </div>
  );
}
