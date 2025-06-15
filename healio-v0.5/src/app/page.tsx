"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Stethoscope, Users, Clock } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Healio</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with Oslo&#39;s best healthcare specialists through
            AI-guided consultations
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>AI-Guided Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our AI asks the right questions to understand your health
                concerns better
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Expert Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get connected with the most suitable specialists in Oslo for
                your condition
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Quick Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Book consultations instantly with transparent pricing and
                availability
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Healio</CardTitle>
            <CardDescription>
              Let&#39;s start by getting to know you better
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What&#39;s your first name?
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your first name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleStart}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!patientName.trim()}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>
            © 2024 Healio - Connecting you with Oslo&#39;s healthcare
            specialists
          </p>
        </div>
      </div>
    </div>
  );
}
