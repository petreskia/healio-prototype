"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DescribePage() {
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("patientName");
    if (name) {
      setPatientName(name);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleContinue = () => {
    if (description.trim()) {
      localStorage.setItem("problemDescription", description);
      router.push("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Healio</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">
                Hello {patientName}! 👋
              </CardTitle>
              <CardDescription className="text-lg">
                We&#39;re here to help you find the right healthcare specialist.
                Let&#39;s start by understanding what&#39;s bothering you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Please describe your health concern or symptoms:
                </label>
                <Textarea
                  id="description"
                  placeholder="For example: I've been having pain in my shoulder for the past week. It hurts when I lift my arm or reach overhead..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 w-full"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> The more details you provide, the better
                  our AI can understand your situation and ask relevant
                  follow-up questions.
                </p>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!description.trim()}
              >
                Continue to AI Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
