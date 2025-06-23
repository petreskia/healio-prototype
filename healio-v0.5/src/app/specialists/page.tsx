"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Specialist {
  id: string;
  name: string;
  title: string;
  expertise: string;
  rating: number;
  distance: string;
  availability: string;
  price: number;
}

interface ChatSummary {
  patientName: string;
  condition: string;
  conditionName?: string;
  symptoms: string[];
  aiAssessment: string;
  specialistType: string;
}

const specialistsByCondition: Record<string, Specialist[]> = {
  shoulder: [
    {
      id: "1",
      name: "Dr. Erik",
      title: "Orthopedic Surgeon",
      expertise:
        "Shoulder & rotator cuff specialist with 15+ years experience. Expert in minimally invasive procedures.",
      rating: 4.9,
      distance: "1.2 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "2",
      name: "Dr. Ingrid",
      title: "Sports Medicine Physician",
      expertise:
        "Specializes in shoulder injuries and rehabilitation. Former team doctor for Norwegian Olympic team.",
      rating: 4.8,
      distance: "2.1 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "3",
      name: "Dr. Lars",
      title: "Physiotherapy Specialist",
      expertise:
        "Expert in shoulder impingement treatment and recovery. Focus on non-surgical solutions.",
      rating: 4.7,
      distance: "0.8 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  abdomen: [
    {
      id: "4",
      name: "Dr. Maria",
      title: "Gastroenterologist",
      expertise:
        "Specialist in digestive disorders and abdominal pain. Expert in endoscopic procedures.",
      rating: 4.9,
      distance: "1.5 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "5",
      name: "Dr. Thomas",
      title: "Internal Medicine",
      expertise:
        "Comprehensive abdominal health specialist. Focus on gastritis and ulcer treatment.",
      rating: 4.8,
      distance: "2.3 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "6",
      name: "Dr. Anna",
      title: "General Surgeon",
      expertise:
        "Abdominal surgery specialist with focus on minimally invasive techniques.",
      rating: 4.7,
      distance: "1.8 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  knee: [
    {
      id: "7",
      name: "Dr. Olav",
      title: "Orthopedic Surgeon",
      expertise:
        "Knee specialist with focus on sports injuries and joint replacement. 20+ years experience.",
      rating: 4.9,
      distance: "1.1 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "8",
      name: "Dr. Kari",
      title: "Sports Medicine",
      expertise:
        "Knee injury rehabilitation specialist. Expert in non-surgical treatment options.",
      rating: 4.8,
      distance: "1.9 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "9",
      name: "Dr. Henrik",
      title: "Physiotherapist",
      expertise:
        "Knee pain and mobility specialist. Focus on patellofemoral syndrome treatment.",
      rating: 4.7,
      distance: "1.4 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  foot: [
    {
      id: "10",
      name: "Dr. Sofie",
      title: "Podiatrist",
      expertise:
        "Foot and ankle specialist. Expert in plantar fasciitis and heel pain treatment.",
      rating: 4.9,
      distance: "1.3 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "11",
      name: "Dr. Magnus",
      title: "Orthopedic Surgeon",
      expertise:
        "Foot and ankle surgery specialist. Focus on sports-related foot injuries.",
      rating: 4.8,
      distance: "2.0 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "12",
      name: "Dr. Lise",
      title: "Physical Therapist",
      expertise:
        "Foot biomechanics specialist. Expert in gait analysis and corrective therapy.",
      rating: 4.7,
      distance: "1.6 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  "lower back": [
    {
      id: "13",
      name: "Dr. Bjørn",
      title: "Spine Specialist",
      expertise:
        "Lower back and spine specialist. Expert in sciatica and disc herniation treatment.",
      rating: 4.9,
      distance: "1.4 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "14",
      name: "Dr. Astrid",
      title: "Neurologist",
      expertise:
        "Nerve pain specialist focusing on sciatica and lower back nerve issues.",
      rating: 4.8,
      distance: "1.7 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "15",
      name: "Dr. Petter",
      title: "Chiropractor",
      expertise:
        "Spinal alignment specialist. Focus on non-invasive lower back pain treatment.",
      rating: 4.7,
      distance: "1.2 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  "head and nerves": [
    {
      id: "16",
      name: "Dr. Camilla",
      title: "Neurologist",
      expertise:
        "Headache and migraine specialist with 18+ years experience. Expert in chronic pain management and neurological disorders.",
      rating: 4.9,
      distance: "1.0 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "17",
      name: "Dr. Fredrik",
      title: "Pain Management Specialist",
      expertise:
        "Specializes in nerve pain and neuropathy treatment. Focus on non-invasive pain relief techniques.",
      rating: 4.8,
      distance: "1.8 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "18",
      name: "Dr. Silje",
      title: "Headache Specialist",
      expertise:
        "Dedicated headache clinic specialist. Expert in migraine prevention and trigger identification.",
      rating: 4.7,
      distance: "2.2 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
};

export default function SpecialistsPage() {
  const [chatSummary, setChatSummary] = useState<ChatSummary | null>(null);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("patientName");
    const summary = localStorage.getItem("chatSummary");

    if (name && summary) {
      const parsedSummary: ChatSummary = JSON.parse(summary);
      setChatSummary(parsedSummary);

      // Get specialists based on condition
      const conditionSpecialists =
        specialistsByCondition[parsedSummary.condition] ||
        specialistsByCondition.shoulder;
      setSpecialists(conditionSpecialists);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleBookSpecialist = (specialistId: string) => {
    router.push(`/booking/${specialistId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/chat")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chat
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Available Specialists
          </h1>
        </div>

        {/* AI Assessment Summary */}
        {chatSummary && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">
                AI Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Condition:</strong>{" "}
                  {chatSummary.conditionName || chatSummary.condition}
                </p>
                <p>
                  <strong>Assessment:</strong> Based on your symptoms, you
                  likely have {chatSummary.condition} issues. The specialists
                  below are specifically chosen for their expertise in treating
                  this condition.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specialists List */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Recommended Specialists in Oslo
            </h2>
            <p className="text-gray-600">
              Based on your AI assessment, here are the best matches for your{" "}
              {chatSummary?.condition} condition:
            </p>
          </div>

          <div className="space-y-6">
            {specialists.map((specialist) => (
              <Card
                key={specialist.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {specialist.name}
                          </h3>
                          <Badge variant="secondary">{specialist.title}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {specialist.expertise}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{specialist.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{specialist.distance} away</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{specialist.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-right">
                      <div className="mb-3">
                        <p className="text-2xl font-bold text-gray-900">
                          {specialist.price} NOK
                        </p>
                        <p className="text-sm text-gray-500">
                          per consultation
                        </p>
                      </div>
                      <Button
                        onClick={() => handleBookSpecialist(specialist.id)}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                      >
                        Book Consultation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                What happens next?
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>
                  • Your AI assessment report will be shared with the specialist
                  before your appointment
                </li>
                <li>
                  • This saves time during consultation and ensures focused
                  treatment
                </li>
                <li>• All specialists are verified and licensed in Norway</li>
                <li>
                  • Consultations include follow-up recommendations and
                  treatment plans
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
